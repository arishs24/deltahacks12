"""
MODULE 3: SURFACE RECONSTRUCTION

Converts segmentation masks into clean, watertight surface meshes using
marching cubes algorithm. Includes mesh smoothing and remeshing for quality.
"""

import numpy as np
from typing import Dict, Tuple, Optional
import pyvista as pv
from skimage import measure
import logging

logger = logging.getLogger(__name__)


def mask_to_surface(
    mask: np.ndarray,
    spacing: np.ndarray,
    smoothing_iterations: int = 50,
    decimation_target: Optional[float] = None
) -> pv.PolyData:
    """
    Convert binary mask to surface mesh using marching cubes.
    
    Args:
        mask: 3D binary mask
        spacing: Voxel spacing (x, y, z) in mm
        smoothing_iterations: Number of Laplacian smoothing iterations
        decimation_target: Target reduction ratio (0-1) for mesh decimation
    
    Returns:
        PyVista PolyData mesh with vertices in physical coordinates (mm)
    """
    logger.info(f"Converting mask to surface: shape={mask.shape}, spacing={spacing}")
    
    # Marching cubes
    verts, faces, normals, values = measure.marching_cubes(
        mask.astype(float),
        level=0.5,
        spacing=spacing,
        allow_degenerate=False
    )
    
    # Create PyVista mesh
    # Faces are stored as (n, 3) array where each row is [n_verts, i, j, k]
    # PyVista expects faces as flat array: [n_verts, i, j, k, n_verts, i, j, k, ...]
    n_faces = faces.shape[0]
    faces_pv = np.column_stack([np.full(n_faces, 3), faces]).flatten()
    
    mesh = pv.PolyData(verts, faces_pv)
    
    logger.info(f"Generated mesh: {mesh.n_points} points, {mesh.n_cells} faces")
    
    # Clean and smooth
    mesh = clean_surface(mesh, smoothing_iterations, decimation_target)
    
    return mesh


def clean_surface(
    mesh: pv.PolyData,
    smoothing_iterations: int = 50,
    decimation_target: Optional[float] = None
) -> pv.PolyData:
    """
    Clean and improve mesh quality: remove degenerate faces, smooth, remesh.
    
    Args:
        mesh: Input PyVista PolyData mesh
        smoothing_iterations: Number of Laplacian smoothing iterations
        decimation_target: Target reduction ratio for decimation (None = no decimation)
    
    Returns:
        Cleaned mesh
    """
    # Remove degenerate faces and clean
    mesh = mesh.clean(tolerance=1e-6)
    
    # Fill holes (if any)
    mesh = mesh.fill_holes(hole_size=1000)  # Large hole size to fill most gaps
    
    # Smooth mesh
    if smoothing_iterations > 0:
        mesh = mesh.smooth(n_iter=smoothing_iterations, relaxation_factor=0.1)
        logger.info(f"Applied {smoothing_iterations} smoothing iterations")
    
    # Decimate if requested
    if decimation_target is not None and 0 < decimation_target < 1:
        target_n_faces = int(mesh.n_cells * decimation_target)
        reduction = 1 - decimation_target
        mesh = mesh.decimate_pro(reduction)
        logger.info(f"Decimated to {mesh.n_cells} faces (target: {target_n_faces})")
    
    # Ensure watertight (manifold)
    if not mesh.is_manifold:
        logger.warning("Mesh is not manifold - may cause issues in FEA")
        # Attempt to fix by removing non-manifold edges
        mesh = mesh.extract_surface()
    
    return mesh


def generate_surfaces_from_segmentation(
    masks: Dict[str, np.ndarray],
    spacing: np.ndarray,
    structures: Optional[list] = None,
    decimation_target: Optional[float] = None
) -> Dict[str, pv.PolyData]:
    """
    Generate surface meshes for all segmented structures.
    
    Args:
        masks: Dictionary of binary masks (from segmentation module)
        spacing: Voxel spacing (x, y, z) in mm
        structures: List of structure names to process (None = all)
    
    Returns:
        Dictionary mapping structure names to PyVista meshes
    """
    if structures is None:
        structures = list(masks.keys())
    
    surfaces = {}
    
    for struct_name in structures:
        if struct_name not in masks:
            logger.warning(f"Mask not found for {struct_name}, skipping")
            continue
        
        mask = masks[struct_name]
        
        try:
            mesh = mask_to_surface(mask, spacing)
            surfaces[struct_name] = mesh
            logger.info(f"Generated surface for {struct_name}: {mesh.n_points} points")
        except Exception as e:
            logger.error(f"Failed to generate surface for {struct_name}: {e}")
            continue
    
    return surfaces


def check_mesh_quality(mesh: pv.PolyData, validate: bool = False) -> dict:
    """
    Assess mesh quality metrics for FEA suitability.
    
    Args:
        mesh: PyVista PolyData mesh
        validate: If True, raises ValueError on quality failures
    
    Returns:
        Dictionary with quality metrics
    
    Raises:
        ValueError: If validate=True and quality checks fail
    """
    # Check if mesh is manifold
    is_manifold = getattr(mesh, 'is_manifold', False)
    
    # Check if mesh is watertight (try different API versions)
    try:
        is_watertight = mesh.is_watertight() if callable(getattr(mesh, 'is_watertight', None)) else False
    except:
        try:
            is_watertight = mesh.is_watertight
        except:
            is_watertight = False
    
    metrics = {
        'is_manifold': is_manifold,
        'is_watertight': is_watertight,
        'n_points': mesh.n_points,
        'n_faces': mesh.n_cells
    }
    
    # Compute edge lengths
    edges = mesh.extract_all_edges()
    if edges.n_points > 0:
        edge_lengths = []
        for i in range(edges.n_cells):
            cell = edges.get_cell(i)
            pts = cell.points
            if len(pts) == 2:
                length = np.linalg.norm(pts[1] - pts[0])
                edge_lengths.append(length)
        
        if edge_lengths:
            metrics['min_edge_length'] = np.min(edge_lengths)
            metrics['max_edge_length'] = np.max(edge_lengths)
            metrics['mean_edge_length'] = np.mean(edge_lengths)
    
    # Compute triangle quality (aspect ratio approximation)
    if mesh.n_cells > 0:
        aspect_ratios = []
        for i in range(mesh.n_cells):
            cell = mesh.get_cell(i)
            pts = cell.points
            if len(pts) == 3:
                # Compute triangle side lengths
                a = np.linalg.norm(pts[1] - pts[0])
                b = np.linalg.norm(pts[2] - pts[1])
                c = np.linalg.norm(pts[0] - pts[2])
                # Aspect ratio = longest / shortest
                sides = [a, b, c]
                if min(sides) > 0:
                    aspect_ratio = max(sides) / min(sides)
                    aspect_ratios.append(aspect_ratio)
        
        if aspect_ratios:
            metrics['aspect_ratio_mean'] = np.mean(aspect_ratios)
            metrics['aspect_ratio_max'] = np.max(aspect_ratios)
    
    # Validate if requested
    if validate:
        errors = []
        
        # Check manifold
        if not metrics.get('is_manifold', False):
            errors.append("Mesh is not manifold (required for FEA)")
        
        # Check minimum points
        if metrics.get('n_points', 0) < 10:
            errors.append(f"Mesh has too few points: {metrics.get('n_points', 0)} (minimum: 10)")
        
        # Check minimum faces
        if metrics.get('n_faces', 0) < 10:
            errors.append(f"Mesh has too few faces: {metrics.get('n_faces', 0)} (minimum: 10)")
        
        # Check aspect ratio (should be reasonable for FEA)
        if metrics.get('aspect_ratio_max', 0) > 10.0:
            errors.append(f"Mesh has poor aspect ratio: {metrics.get('aspect_ratio_max', 0):.2f} (maximum: 10.0)")
        
        # Check edge lengths (should be reasonable)
        if 'min_edge_length' in metrics and metrics['min_edge_length'] < 1e-6:
            errors.append(f"Mesh has degenerate edges: min length = {metrics['min_edge_length']:.2e} mm")
        
        if errors:
            error_msg = "Mesh quality validation failed:\n" + "\n".join(f"  - {e}" for e in errors)
            logger.error(error_msg)
            raise ValueError(error_msg)
    
    return metrics
