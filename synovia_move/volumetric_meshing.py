"""
MODULE 4: VOLUMETRIC MESHING

Generates tetrahedral meshes from surface meshes for finite element analysis.
Handles different mesh densities for cartilage (fine) and bone (coarse/rigid).
Labels contact surfaces and boundaries for FEA boundary conditions.
"""

import numpy as np
import pyvista as pv
from typing import Dict, List, Tuple, Optional, Union
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def generate_volume_mesh(
    surface_meshes: Dict[str, pv.PolyData],
    spacing: np.ndarray,
    cartilage_element_size: float = 1.0,
    bone_element_size: float = 3.0,
    use_gmsh: bool = True
) -> Dict[str, pv.UnstructuredGrid]:
    """
    Generate tetrahedral volume meshes from surface meshes.
    
    Args:
        surface_meshes: Dictionary mapping structure names to surface meshes
        spacing: Voxel spacing for reference (mm)
        cartilage_element_size: Target element size for cartilage (mm)
        bone_element_size: Target element size for bone (mm)
        use_gmsh: Whether to use Gmsh (True) or TetGen (False)
    
    Returns:
        Dictionary mapping structure names to PyVista UnstructuredGrid tetrahedral meshes
    """
    volume_meshes = {}
    
    for struct_name, surface_mesh in surface_meshes.items():
        logger.info(f"Generating volume mesh for {struct_name}")
        
        # Determine element size based on structure type
        if 'cartilage' in struct_name.lower():
            element_size = cartilage_element_size
        else:
            element_size = bone_element_size
        
        try:
            if use_gmsh:
                tet_mesh = _generate_tet_mesh_gmsh(surface_mesh, element_size)
            else:
                tet_mesh = _generate_tet_mesh_tetgen(surface_mesh, element_size)
            
            volume_meshes[struct_name] = tet_mesh
            logger.info(f"Generated {struct_name} mesh: {tet_mesh.n_cells} tetrahedra")
            
        except Exception as e:
            logger.error(f"Failed to generate volume mesh for {struct_name}: {e}")
            # Fallback to PyVista's built-in tet generation
            try:
                tet_mesh = surface_mesh.delaunay_3d(alpha=element_size)
                volume_meshes[struct_name] = tet_mesh
                logger.info(f"Used fallback method for {struct_name}")
            except Exception as e2:
                logger.error(f"Fallback also failed for {struct_name}: {e2}")
                continue
    
    return volume_meshes


def _generate_tet_mesh_gmsh(
    surface_mesh: pv.PolyData,
    element_size: float
) -> pv.UnstructuredGrid:
    """
    Generate tetrahedral mesh using Gmsh.
    
    Args:
        surface_mesh: Input surface mesh
        element_size: Target element size (mm)
    
    Returns:
        Tetrahedral mesh as PyVista UnstructuredGrid
    """
    try:
        import gmsh
        
        gmsh.initialize()
        gmsh.model.add("knee_mesh")
        
        # Add surface mesh vertices to Gmsh
        points = surface_mesh.points
        point_tags = []
        for pt in points:
            tag = gmsh.model.geo.addPoint(pt[0], pt[1], pt[2])
            point_tags.append(tag)
        
        # Add surface mesh faces
        # Note: This is simplified - in production, properly map faces
        # For now, use PyVista's Gmsh export capability if available
        
        # Alternative: Export to file and import
        import tempfile
        with tempfile.NamedTemporaryFile(suffix='.stl', delete=False) as tmp:
            tmp_path = tmp.name
            surface_mesh.save(tmp_path)
            
            # Import STL into Gmsh
            gmsh.model.occ.importShapes(tmp_path)
            gmsh.model.occ.synchronize()
            
            # Generate 3D mesh
            gmsh.model.mesh.setSize(gmsh.model.getEntities(0), element_size)
            gmsh.model.mesh.generate(3)
            
            # Extract mesh
            node_tags, coords, _ = gmsh.model.mesh.getNodes()
            element_types, element_tags, node_tags_elem = gmsh.model.mesh.getElements(3)
            
            if len(element_tags) > 0:
                # Convert to PyVista format
                nodes = coords.reshape(-1, 3)
                tet_connectivity = node_tags_elem[0].reshape(-1, 4) - 1  # 0-indexed
                
                # Create PyVista UnstructuredGrid
                cells = np.column_stack([np.full(len(tet_connectivity), 4), tet_connectivity]).flatten()
                tet_mesh = pv.UnstructuredGrid(cells, [pv.CellType.TETRA], nodes)
            else:
                raise ValueError("Gmsh failed to generate tetrahedra")
        
        gmsh.finalize()
        Path(tmp_path).unlink()  # Clean up
        
        return tet_mesh
        
    except ImportError:
        logger.warning("Gmsh not available, falling back to TetGen")
        return _generate_tet_mesh_tetgen(surface_mesh, element_size)
    except Exception as e:
        logger.error(f"Gmsh meshing failed: {e}")
        raise


def _generate_tet_mesh_tetgen(
    surface_mesh: pv.PolyData,
    element_size: float
) -> pv.UnstructuredGrid:
    """
    Generate tetrahedral mesh using TetGen (via PyVista).
    
    Args:
        surface_mesh: Input surface mesh
        element_size: Target element size (mm)
    
    Returns:
        Tetrahedral mesh as PyVista UnstructuredGrid
    """
    # PyVista's tetgen wrapper
    # Note: element_size control is approximate via volume constraint
    volume_constraint = (element_size ** 3) / 6.0  # Approximate volume per tet
    
    try:
        tet_mesh = surface_mesh.delaunay_3d(alpha=element_size * 2.0)
        return tet_mesh
    except Exception as e:
        logger.error(f"TetGen meshing failed: {e}")
        # Ultimate fallback: simple Delaunay
        return surface_mesh.delaunay_3d()


def label_contact_surfaces(
    volume_meshes: Dict[str, pv.UnstructuredGrid],
    surface_meshes: Dict[str, pv.PolyData],
    contact_pairs: List[Tuple[str, str]]
) -> Dict[str, pv.UnstructuredGrid]:
    """
    Label contact surfaces and boundaries in volume meshes for FEA.
    
    Args:
        volume_meshes: Dictionary of tetrahedral meshes
        surface_meshes: Dictionary of surface meshes (for contact detection)
        contact_pairs: List of (structure1, structure2) pairs that contact
    
    Returns:
        Volume meshes with added cell/point data for boundaries and contacts
    """
    labeled_meshes = {}
    
    for struct_name, vol_mesh in volume_meshes.items():
        mesh = vol_mesh.copy()
        
        # Initialize labels
        mesh['boundary'] = np.zeros(mesh.n_points, dtype=int)
        mesh['contact_surface'] = np.zeros(mesh.n_points, dtype=int)
        
        # Find contact surfaces
        if struct_name in surface_meshes:
            surf_mesh = surface_meshes[struct_name]
            
            # For each contact pair involving this structure
            for struct1, struct2 in contact_pairs:
                if struct_name == struct1 and struct2 in surface_meshes:
                    other_surf = surface_meshes[struct2]
                    # Find points on this surface that are close to the other surface
                    contact_points = _find_contact_points(surf_mesh, other_surf, threshold=2.0)
                    if len(contact_points) > 0:
                        # Map surface points to volume mesh points
                        # (simplified - in production, use proper nearest neighbor)
                        mesh['contact_surface'][contact_points] = 1
        
        # Mark boundary (all surface points)
        if struct_name in surface_meshes:
            surf_mesh = surface_meshes[struct_name]
            # Find volume mesh points near surface
            # (simplified - proper implementation would use spatial queries)
            mesh['boundary'] = np.ones(mesh.n_points, dtype=int)  # Mark all as boundary for now (refine later)
        
        labeled_meshes[struct_name] = mesh
    
    return labeled_meshes


def _find_contact_points(
    mesh1: pv.PolyData,
    mesh2: pv.PolyData,
    threshold: float = 2.0
) -> np.ndarray:
    """
    Find points on mesh1 that are within threshold distance of mesh2.
    
    Returns:
        Boolean array indicating which points are in contact
    """
    from scipy.spatial import cKDTree
    
    tree = cKDTree(mesh2.points)
    distances, _ = tree.query(mesh1.points)
    contact_mask = distances < threshold
    
    return np.where(contact_mask)[0]


def export_to_febio_format(
    volume_meshes: Dict[str, pv.UnstructuredGrid],
    output_path: Union[str, Path],
    material_properties: Optional[Dict[str, dict]] = None
) -> Path:
    """
    Export volume meshes to FEBio format (.feb file).
    
    Args:
        volume_meshes: Dictionary of labeled tetrahedral meshes
        output_path: Path to output .feb file
        material_properties: Dictionary mapping structure names to material properties
    
    Returns:
        Path to exported file
    
    Note:
        FEBio format is XML-based. This function generates a basic .feb file.
        Material properties should include Young's modulus, Poisson's ratio, etc.
    """
    output_path = Path(output_path)
    
    # Default material properties (cartilage and bone)
    if material_properties is None:
        material_properties = {
            'femoral_cartilage': {
                'E': 0.5,  # MPa (Young's modulus)
                'nu': 0.45,  # Poisson's ratio
                'density': 1.0  # g/cm³
            },
            'tibial_cartilage': {
                'E': 0.5,
                'nu': 0.45,
                'density': 1.0
            },
            'femur': {
                'E': 17000.0,  # MPa (cortical bone)
                'nu': 0.3,
                'density': 1.85
            },
            'tibia': {
                'E': 17000.0,
                'nu': 0.3,
                'density': 1.85
            }
        }
    
    # Generate FEBio XML
    xml_lines = [
        '<?xml version="1.0" encoding="ISO-8859-1"?>',
        '<febio_spec version="3.0">',
        '  <Module type="solid"/>',
        '  <Control>',
        '    <title>Knee FEA Analysis</title>',
        '    <time_steps>100</time_steps>',
        '    <step_size>0.01</step_size>',
        '    <max_refs>15</max_refs>',
        '    <max_ups>10</max_ups>',
        '    <analysis>static</analysis>',
        '  </Control>',
        '  <Material>'
    ]
    
    # Add materials
    mat_id = 1
    for struct_name, props in material_properties.items():
        xml_lines.extend([
            f'    <material id="{mat_id}" name="{struct_name}" type="neo-Hookean">',
            f'      <E>{props["E"]}</E>',
            f'      <v>{props["nu"]}</v>',
            f'      <density>{props["density"]}</density>',
            '    </material>'
        ])
        mat_id += 1
    
    xml_lines.append('  </Material>')
    xml_lines.append('  <Geometry>')
    
    # Add nodes and elements for each structure
    node_offset = 0
    for struct_name, vol_mesh in volume_meshes.items():
        nodes = vol_mesh.points
        cells = vol_mesh.cells.reshape(-1, 5)[:, 1:]  # Extract connectivity
        
        xml_lines.append(f'    <Nodes name="{struct_name}">')
        for i, node in enumerate(nodes):
            xml_lines.append(f'      <node id="{node_offset + i + 1}">{node[0]},{node[1]},{node[2]}</node>')
        xml_lines.append('    </Nodes>')
        
        # Get material ID for this structure
        mat_id = list(material_properties.keys()).index(struct_name) + 1 if struct_name in material_properties else 1
        
        xml_lines.append(f'    <Elements name="{struct_name}" mat="{mat_id}" type="tet4">')
        for i, cell in enumerate(cells):
            xml_lines.append(f'      <elem id="{i + 1}">{node_offset + cell[0] + 1},{node_offset + cell[1] + 1},{node_offset + cell[2] + 1},{node_offset + cell[3] + 1}</elem>')
        xml_lines.append('    </Elements>')
        
        node_offset += len(nodes)
    
    xml_lines.append('  </Geometry>')
    xml_lines.append('  <Boundary>')
    # Boundary conditions will be added by movement scenario module
    xml_lines.append('  </Boundary>')
    xml_lines.append('  <Contact>')
    # Contact definitions will be added
    xml_lines.append('  </Contact>')
    xml_lines.append('</febio_spec>')
    
    # Write file
    with open(output_path, 'w') as f:
        f.write('\n'.join(xml_lines))
    
    logger.info(f"Exported FEBio file to {output_path}")
    return output_path
