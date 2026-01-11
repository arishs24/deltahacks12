"""
MODULE 10: VISUALIZATION

Renders patient-specific anatomy, stress heatmaps, scenario comparisons,
and time-series trends using PyVista for 3D visualization.
"""

import numpy as np
import pyvista as pv
from typing import Dict, List, Optional, Tuple, Union
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


def render_anatomy(
    surface_meshes: Dict[str, pv.PolyData],
    output_path: Optional[Union[str, Path]] = None,
    show: bool = True,
    opacity: Optional[Dict[str, float]] = None
) -> pv.Plotter:
    """
    Render patient-specific knee anatomy.
    
    Args:
        surface_meshes: Dictionary mapping structure names to surface meshes
        output_path: Path to save screenshot (None = don't save)
        show: Whether to display interactively
        opacity: Dictionary mapping structure names to opacity (0-1)
    
    Returns:
        PyVista Plotter object
    """
    plotter = pv.Plotter()
    
    # Color scheme
    colors = {
        'femur': 'lightgray',
        'tibia': 'lightgray',
        'femoral_cartilage': 'lightblue',
        'tibial_cartilage': 'lightgreen',
        'patella': 'lightyellow'
    }
    
    if opacity is None:
        opacity = {
            'femur': 0.8,
            'tibia': 0.8,
            'femoral_cartilage': 0.6,
            'tibial_cartilage': 0.6
        }
    
    # Add each structure
    if surface_meshes:
        for struct_name, mesh in surface_meshes.items():
            color = colors.get(struct_name, 'white')
            opac = opacity.get(struct_name, 1.0)
            
            plotter.add_mesh(
                mesh,
                color=color,
                opacity=opac,
                label=struct_name
            )
        
        plotter.add_legend()
    plotter.add_axes()
    plotter.camera_position = 'iso'
    
    if output_path:
        plotter.screenshot(str(output_path))
        logger.info(f"Saved anatomy visualization to {output_path}")
    
    if show:
        plotter.show()
    
    return plotter


def render_stress_heatmap(
    mesh: pv.PolyData,
    stress_field: np.ndarray,
    title: str = "Stress Distribution",
    colormap: str = 'hot',
    output_path: Optional[Union[str, Path]] = None,
    show: bool = True,
    clim: Optional[Tuple[float, float]] = None
) -> pv.Plotter:
    """
    Render stress heatmap on mesh surface.
    
    Args:
        mesh: Surface or volume mesh
        stress_field: Stress values (nodal or elemental)
        title: Plot title
        colormap: PyVista colormap name
        output_path: Path to save screenshot
        show: Whether to display interactively
        clim: Color limits (min, max) - auto if None
    
    Returns:
        PyVista Plotter object
    """
    plotter = pv.Plotter()
    
    # Map stress to mesh
    if len(stress_field) == mesh.n_points:
        mesh['stress'] = stress_field
    elif len(stress_field) == mesh.n_cells:
        # Convert cell data to point data
        mesh['stress'] = mesh.cell_data_to_point_data()['stress']
    else:
        raise ValueError(f"Stress field size ({len(stress_field)}) doesn't match mesh (points: {mesh.n_points}, cells: {mesh.n_cells})")
    
    # Set color limits
    if clim is None:
        clim = (stress_field.min(), stress_field.max())
    
    plotter.add_mesh(
        mesh,
        scalars='stress',
        cmap=colormap,
        clim=clim,
        scalar_bar_args={'title': 'Stress (MPa)'}
    )
    
    plotter.add_text(title, font_size=12)
    plotter.add_axes()
    plotter.camera_position = 'iso'
    
    if output_path:
        plotter.screenshot(str(output_path))
        logger.info(f"Saved stress heatmap to {output_path}")
    
    if show:
        plotter.show()
    
    return plotter


def compare_scenarios(
    meshes: Dict[str, pv.PolyData],
    scenario_results: Dict[str, Dict],
    output_path: Optional[Union[str, Path]] = None,
    show: bool = True
) -> pv.Plotter:
    """
    Create side-by-side comparison of multiple scenarios.
    
    Args:
        meshes: Dictionary of meshes (one per structure, or combined)
        scenario_results: Dictionary mapping scenario names to results with stress fields
        output_path: Path to save screenshot
        show: Whether to display interactively
    
    Returns:
        PyVista Plotter object
    """
    n_scenarios = len(scenario_results)
    
    # Create subplot grid
    plotter = pv.Plotter(shape=(1, n_scenarios))
    
    for idx, (scenario_name, results) in enumerate(scenario_results.items()):
        plotter.subplot(0, idx)
        
        # Get stress field (assuming first mesh in dictionary)
        if meshes:
            mesh_key = list(meshes.keys())[0]
            mesh = meshes[mesh_key].copy()
            
            # Get stress from results
            stress = results.get('stresses', {}).get('von_mises', None)
            if stress is not None:
                if len(stress) == mesh.n_cells:
                    mesh['stress'] = stress
                    mesh = mesh.cell_data_to_point_data()
                elif len(stress) == mesh.n_points:
                    mesh['stress'] = stress
                
                plotter.add_mesh(
                    mesh,
                    scalars='stress',
                    cmap='hot',
                    scalar_bar_args={'title': 'Stress (MPa)'}
                )
        
        plotter.add_text(scenario_name, font_size=10)
        plotter.add_axes()
    
    if output_path:
        plotter.screenshot(str(output_path))
        logger.info(f"Saved scenario comparison to {output_path}")
    
    if show:
        plotter.show()
    
    return plotter


def plot_stress_trends(
    trends: Dict,
    output_path: Optional[Union[str, Path]] = None,
    show: bool = True
):
    """
    Plot time-series stress trends.
    
    Args:
        trends: Trends dictionary from MechanicalDoseTracker.get_stress_trends
        output_path: Path to save plot
        show: Whether to display interactively
    
    Note:
        This uses matplotlib for 2D plotting (time series).
    """
    try:
        import matplotlib.pyplot as plt
        from datetime import datetime
    except ImportError:
        logger.warning("Matplotlib not available for trend plotting")
        return
    
    dates = [datetime.fromisoformat(d) for d in trends['dates']]
    peak_stress = trends['peak_stress']
    mean_stress = trends['mean_stress']
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(dates, peak_stress, 'r-o', label='Peak Stress', linewidth=2)
    ax.plot(dates, mean_stress, 'b-s', label='Mean Stress', linewidth=2)
    
    ax.set_xlabel('Date', fontsize=12)
    ax.set_ylabel('Stress (MPa)', fontsize=12)
    ax.set_title('Stress Trends Over Time', fontsize=14)
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    # Add trend annotation
    if trends['trend_direction'] != 'no_data':
        ax.text(0.02, 0.98, f"Trend: {trends['trend_direction']} ({trends['trend_slope']:.4f} MPa/day)",
                transform=ax.transAxes, verticalalignment='top',
                bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=300)
        logger.info(f"Saved stress trends plot to {output_path}")
    
    if show:
        plt.show()
    else:
        plt.close()


def create_interactive_dashboard(
    surface_meshes: Dict[str, pv.PolyData],
    scenario_results: Dict[str, Dict],
    trends: Optional[Dict] = None
) -> pv.Plotter:
    """
    Create an interactive dashboard with multiple views.
    
    Args:
        surface_meshes: Dictionary of surface meshes
        scenario_results: Dictionary of scenario results
        trends: Optional trends data
    
    Returns:
        PyVista Plotter with interactive controls
    """
    plotter = pv.Plotter(shape=(2, 2))
    
    # Top-left: Anatomy
    plotter.subplot(0, 0)
    for struct_name, mesh in surface_meshes.items():
        plotter.add_mesh(mesh, opacity=0.7)
    plotter.add_text("Anatomy", font_size=12)
    
    # Top-right: Stress heatmap (first scenario)
    if scenario_results:
        scenario_name = list(scenario_results.keys())[0]
        results = scenario_results[scenario_name]
        plotter.subplot(0, 1)
        # Add stress visualization here
        plotter.add_text(f"Stress: {scenario_name}", font_size=12)
    
    # Bottom: Comparison or trends
    if trends:
        plotter.subplot(1, 0)
        plotter.add_text("Stress Trends", font_size=12)
        # Note: PyVista doesn't directly support matplotlib plots
        # Would need to render as image and add as texture
    
    plotter.show()
    return plotter
