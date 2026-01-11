"""
EXAMPLE PIPELINE: End-to-End Workflow

This script demonstrates the complete Synovia Move pipeline:
MRI → Segmentation → Meshing → FEA → Risk Assessment → Comparison
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from synovia_move import (
    mri_ingestion,
    segmentation,
    surface_reconstruction,
    volumetric_meshing,
    injury_modeling,
    movement_scenarios,
    fea_solver,
    risk_scoring,
    longitudinal_tracking,
    visualization
)
import numpy as np
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    """
    Main pipeline execution.
    
    This example assumes:
    - MRI data is available (DICOM or NIfTI)
    - Segmentation model is trained/available
    - FEA solver (FEBio) is installed (or will use stub results)
    """
    
    logger.info("=" * 80)
    logger.info("SYNOVIA MOVE: Patient-Specific Knee Digital Twin Pipeline")
    logger.info("=" * 80)
    
    # ========================================================================
    # STEP 1: MRI INGESTION
    # ========================================================================
    logger.info("\n[STEP 1] Loading and preprocessing MRI...")
    
    # Load MRI from KMAR dataset
    # Try to use organized dataset first, then fall back to direct loading
    organized_path = Path("data/kmar_knee")
    if organized_path.exists():
        # Find first subject
        subject_dirs = [d for d in organized_path.iterdir() if d.is_dir() and d.name.startswith("subject_")]
        if subject_dirs:
            mri_path = subject_dirs[0] / "knee_mri.nii.gz"
            logger.info(f"Using organized KMAR dataset: {mri_path}")
        else:
            # Try direct KMAR loading
            mri_path = Path("data/KMAR-50K")
            logger.info(f"Using KMAR dataset directly: {mri_path}")
    else:
        # Try direct KMAR loading
        mri_path = Path("data/KMAR-50K")
        logger.info(f"Using KMAR dataset directly: {mri_path}")
    
    try:
        volume, spacing, metadata = mri_ingestion.load_mri(mri_path)
        logger.info(f"Loaded MRI: shape={volume.shape}, spacing={spacing}mm")
        logger.info(f"Source: {metadata.get('source', 'unknown')}, Patient: {metadata.get('patient_id', 'unknown')}")
    except (FileNotFoundError, ValueError) as e:
        logger.warning(f"MRI file not found at {mri_path}, using synthetic data for demo")
        logger.warning(f"Error: {e}")
        # Generate synthetic volume for demonstration
        volume = np.random.rand(256, 256, 100).astype(np.float32)
        spacing = np.array([0.5, 0.5, 1.0])  # mm
        metadata = {'format': 'synthetic', 'shape': volume.shape}
    
    # Preprocess
    processed_volume, final_spacing = mri_ingestion.preprocess_volume(
        volume, spacing, normalize=True
    )
    logger.info(f"Preprocessed volume: shape={processed_volume.shape}, spacing={final_spacing}mm")
    
    # ========================================================================
    # STEP 2: SEGMENTATION
    # ========================================================================
    logger.info("\n[STEP 2] Segmenting knee anatomy...")
    
    masks = segmentation.segment_knee(
        processed_volume,
        spacing=final_spacing,
        postprocess=True,
        validate=True  # Fail pipeline if segmentation is invalid
    )
    
    logger.info("Segmentation complete:")
    for struct_name, mask in masks.items():
        if isinstance(mask, np.ndarray):
            volume_fraction = np.sum(mask) / mask.size
            logger.info(f"  {struct_name}: {volume_fraction*100:.2f}% of volume")
    
    # ========================================================================
    # STEP 3: SURFACE RECONSTRUCTION
    # ========================================================================
    logger.info("\n[STEP 3] Generating surface meshes...")
    
    # Generate surfaces with decimation for faster processing
    surface_meshes = surface_reconstruction.generate_surfaces_from_segmentation(
        masks,
        final_spacing,
        structures=['femur', 'tibia', 'femoral_cartilage', 'tibial_cartilage']
    )
    
    # Decimate surfaces for faster volumetric meshing (optional - remove for higher quality)
    logger.info("Decimating surfaces for faster volumetric meshing...")
    decimated_meshes = {}
    for struct_name, mesh in surface_meshes.items():
        if mesh.n_cells > 50000:  # Only decimate large meshes
            original_faces = mesh.n_cells
            decimated = surface_reconstruction.clean_surface(
                mesh,
                smoothing_iterations=0,  # Skip smoothing on decimated mesh
                decimation_target=0.3  # Reduce to 30% of faces
            )
            decimated_meshes[struct_name] = decimated
            logger.info(f"  {struct_name}: {original_faces} -> {decimated.n_cells} faces")
        else:
            decimated_meshes[struct_name] = mesh
    
    surface_meshes = decimated_meshes
    
    logger.info("Surface meshes generated:")
    for struct_name, mesh in surface_meshes.items():
        logger.info(f"  {struct_name}: {mesh.n_points} points, {mesh.n_cells} faces")
        
        # Check mesh quality with validation (fails pipeline if invalid)
        quality = surface_reconstruction.check_mesh_quality(mesh, validate=True)
        logger.info(f"    Quality: manifold={quality['is_manifold']}, watertight={quality.get('is_watertight', False)}")
    
    # ========================================================================
    # STEP 4: VOLUMETRIC MESHING
    # ========================================================================
    logger.info("\n[STEP 4] Generating volumetric meshes...")
    
    # Use larger element sizes for faster meshing (can be refined later)
    # For production, use smaller sizes: cartilage=1.0, bone=3.0
    volume_meshes = volumetric_meshing.generate_volume_mesh(
        surface_meshes,
        final_spacing,
        cartilage_element_size=2.0,  # mm (larger = faster, coarser mesh)
        bone_element_size=5.0  # mm (larger = faster, coarser mesh)
    )
    
    logger.info("Volume meshes generated:")
    for struct_name, mesh in volume_meshes.items():
        logger.info(f"  {struct_name}: {mesh.n_cells} tetrahedra")
    
    # Label contact surfaces
    contact_pairs = [
        ('femoral_cartilage', 'tibial_cartilage')
    ]
    labeled_meshes = volumetric_meshing.label_contact_surfaces(
        volume_meshes,
        surface_meshes,
        contact_pairs
    )
    
    # ========================================================================
    # STEP 5: INJURY MODELING
    # ========================================================================
    logger.info("\n[STEP 5] Applying injury model (ACL deficiency)...")
    
    # Build model dictionary
    model = {
        'volume_meshes': labeled_meshes,
        'surface_meshes': surface_meshes,
        'materials': None  # Will use defaults
    }
    
    # Apply ACL deficiency (severity: 0.0 = intact, 1.0 = complete tear)
    acl_severity = 0.8  # 80% tear
    model = injury_modeling.apply_acl_deficiency(
        model,
        severity=acl_severity,
        constraint_stiffness_reduction=0.1
    )
    
    logger.info(f"Applied ACL deficiency: severity={acl_severity:.2f}")
    injury_params = injury_modeling.get_injury_parameters(model)
    logger.info(f"Injury parameters: {injury_params}")
    
    # ========================================================================
    # STEP 6: DEFINE MOVEMENT SCENARIOS
    # ========================================================================
    logger.info("\n[STEP 6] Defining movement scenarios...")
    
    # Generate standard scenarios
    scenarios = movement_scenarios.generate_standard_scenarios()
    
    logger.info(f"Generated {len(scenarios)} scenarios:")
    for name, scenario in scenarios.items():
        logger.info(f"  {name}: angle={scenario['angle']}°, load={scenario['load']}N")
    
    # ========================================================================
    # STEP 7: RUN FEA FOR EACH SCENARIO
    # ========================================================================
    logger.info("\n[STEP 7] Running finite element analysis...")
    
    scenario_results = {}
    fea_results = {}
    
    # Run FEA for baseline scenario only (real FEA is computationally expensive)
    # In production, you would run for all scenarios, but for now we'll do one
    baseline_scenario_name = 'light_squat'
    baseline_scenario = scenarios.get(baseline_scenario_name, list(scenarios.values())[0])
    
    logger.info(f"\n  Running FEA: {baseline_scenario_name}")
    results = fea_solver.run_fea(
        model,
        baseline_scenario,
        solver='fenics',  # Use real FEniCS solver
        output_dir=f"fea_output/{baseline_scenario_name}",
        validate=True  # Fail pipeline if FEA results are invalid
    )
    fea_results = {baseline_scenario_name: results}
    
    # Extract stress metrics
    metrics = fea_solver.extract_stress_metrics(results)
    scenario_results[baseline_scenario_name] = metrics
    
    logger.info(f"    Peak stress: {metrics['peak_stress']:.2f} MPa")
    logger.info(f"    Mean stress: {metrics['mean_stress']:.2f} MPa")
    logger.info(f"    High-stress fraction: {metrics['high_stress_fraction']*100:.1f}%")
    
    # ========================================================================
    # STEP 8: RISK SCORING
    # ========================================================================
    logger.info("\n[STEP 8] Computing risk scores...")
    
    risk_scores = {}
    injury_context = model.get('injury', {})
    
    for scenario_name, metrics in scenario_results.items():
        risk = risk_scoring.compute_risk_score(
            metrics,
            injury_context=injury_context
        )
        risk_scores[scenario_name] = risk
        
        logger.info(f"\n  {scenario_name}:")
        logger.info(f"    Risk score: {risk['overall_risk_score']:.1f}/100 ({risk['risk_category']})")
        logger.info(f"    Recommendations:")
        for rec in risk['recommendations']:
            logger.info(f"      - {rec}")
    
    # Rank scenarios
    ranked = risk_scoring.rank_scenarios(risk_scores)
    logger.info("\n  Scenario ranking (lowest risk first):")
    for i, (name, score, category) in enumerate(ranked, 1):
        logger.info(f"    {i}. {name}: {score:.1f} ({category})")
    
    # Compare scenarios
    if len(ranked) >= 2:
        baseline_name = ranked[0][0]
        comparison_name = ranked[1][0]
        comparison = risk_scoring.compare_scenarios(
            risk_scores[baseline_name],
            risk_scores[comparison_name]
        )
        logger.info(f"\n  Comparison ({baseline_name} vs {comparison_name}):")
        logger.info(f"    Risk difference: {comparison['risk_difference']:.1f}")
        logger.info(f"    {comparison['recommendation']}")
    
    # ========================================================================
    # STEP 9: LONGITUDINAL TRACKING
    # ========================================================================
    logger.info("\n[STEP 9] Setting up longitudinal tracking...")
    
    patient_id = "patient_001"
    tracker = longitudinal_tracking.MechanicalDoseTracker(
        patient_id,
        storage_path="tracking_data"
    )
    
    # Log example workout sessions
    today = datetime.now()
    for i, (scenario_name, metrics) in enumerate(scenario_results.items()):
        session_date = today.replace(day=today.day - (len(scenario_results) - i))
        longitudinal_tracking.log_workout(
            tracker,
            session_date,
            scenario_name,
            duration_minutes=30.0,
            stress_metrics=metrics,
            notes=f"Rehabilitation session {i+1}"
        )
    
    # Get cumulative dose
    dose = tracker.get_cumulative_dose()
    logger.info(f"\n  Cumulative mechanical dose:")
    logger.info(f"    Total dose: {dose['total_dose']:.2f} MPa-hours")
    logger.info(f"    Total time: {dose['total_time_hours']:.2f} hours")
    logger.info(f"    Sessions: {dose['sessions']}")
    
    # Get trends
    trends = tracker.get_stress_trends(days=30)
    logger.info(f"\n  Stress trends:")
    logger.info(f"    Direction: {trends['trend_direction']}")
    logger.info(f"    Slope: {trends['trend_slope']:.4f} MPa/day")
    
    # ========================================================================
    # STEP 10: VISUALIZATION
    # ========================================================================
    logger.info("\n[STEP 10] Generating visualizations...")
    
    # Render anatomy
    output_dir = Path("output_visualizations")
    output_dir.mkdir(exist_ok=True)
    
    logger.info("  Rendering anatomy...")
    if surface_meshes:
        try:
            visualization.render_anatomy(
                surface_meshes,
                output_path=output_dir / "anatomy.png",
                show=False
            )
        except Exception as e:
            logger.warning(f"    Failed to render anatomy: {e}")
    else:
        logger.warning("    No surface meshes available for visualization")
    
    # Render stress heatmaps for each scenario
    for scenario_name, results in fea_results.items():
        logger.info(f"  Rendering stress heatmap: {scenario_name}")
        
        # Get cartilage mesh for stress visualization
        if 'femoral_cartilage' in surface_meshes:
            mesh = surface_meshes['femoral_cartilage']
            stress = results['stresses']['von_mises']
            
            # Map stress to mesh (simplified - in production, properly map from volume mesh)
            if len(stress) > mesh.n_points:
                # Downsample or interpolate
                stress = stress[:mesh.n_points]
            
            try:
                visualization.render_stress_heatmap(
                    mesh,
                    stress,
                    title=f"Stress: {scenario_name}",
                    output_path=output_dir / f"stress_{scenario_name}.png",
                    show=False
                )
            except Exception as e:
                logger.warning(f"    Failed to render stress for {scenario_name}: {e}")
    
    # Compare scenarios
    logger.info("  Creating scenario comparison...")
    try:
        # Prepare meshes and results for comparison
        comparison_data = {}
        for scenario_name, results in fea_results.items():
            if 'femoral_cartilage' in surface_meshes:
                comparison_data[scenario_name] = {
                    'stresses': results['stresses'],
                    'mesh': surface_meshes['femoral_cartilage']
                }
        
        if comparison_data:
            visualization.compare_scenarios(
                {'cartilage': surface_meshes.get('femoral_cartilage')},
                {name: data for name, data in comparison_data.items()},
                output_path=output_dir / "scenario_comparison.png",
                show=False
            )
    except Exception as e:
        logger.warning(f"    Failed to create comparison: {e}")
    
    # Plot trends
    logger.info("  Plotting stress trends...")
    try:
        visualization.plot_stress_trends(
            trends,
            output_path=output_dir / "stress_trends.png",
            show=False
        )
    except Exception as e:
        logger.warning(f"    Failed to plot trends: {e}")
    
    # ========================================================================
    # SUMMARY
    # ========================================================================
    logger.info("\n" + "=" * 80)
    logger.info("PIPELINE COMPLETE")
    logger.info("=" * 80)
    logger.info(f"\nOutputs saved to:")
    logger.info(f"  - FEA results: fea_output/")
    logger.info(f"  - Visualizations: {output_dir}/")
    logger.info(f"  - Tracking data: tracking_data/")
    logger.info(f"\nRecommendations:")
    logger.info(f"  Safest scenario: {ranked[0][0]} (risk: {ranked[0][1]:.1f})")
    logger.info(f"  Highest risk scenario: {ranked[-1][0]} (risk: {ranked[-1][1]:.1f})")
    logger.info("\n" + "=" * 80)


if __name__ == "__main__":
    main()
