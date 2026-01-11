"""
EXAMPLE PIPELINE: End-to-End Workflow (Without FEniCS)

This version runs Steps 1-6 without requiring FEniCS.
Use this if you can't install FEniCS but want to test the rest of the pipeline.
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
    Main pipeline execution (without FEA step).
    
    This version runs Steps 1-6, then skips FEA and uses placeholder risk scores.
    """
    
    logger.info("=" * 80)
    logger.info("SYNOVIA MOVE: Patient-Specific Knee Digital Twin Pipeline")
    logger.info("(Running without FEniCS - Steps 1-6 only)")
    logger.info("=" * 80)
    
    # ========================================================================
    # STEP 1: MRI INGESTION
    # ========================================================================
    logger.info("\n[STEP 1] Loading and preprocessing MRI...")
    
    organized_path = Path("data/kmar_knee")
    if organized_path.exists():
        subject_dirs = [d for d in organized_path.iterdir() if d.is_dir() and d.name.startswith("subject_")]
        if subject_dirs:
            mri_path = subject_dirs[0] / "knee_mri.nii.gz"
            logger.info(f"Using organized KMAR dataset: {mri_path}")
        else:
            mri_path = Path("data/KMAR-50K")
            logger.info(f"Using KMAR dataset directly: {mri_path}")
    else:
        mri_path = Path("data/KMAR-50K")
        logger.info(f"Using KMAR dataset directly: {mri_path}")
    
    try:
        volume, spacing, metadata = mri_ingestion.load_mri(mri_path)
        logger.info(f"Loaded MRI: shape={volume.shape}, spacing={spacing}mm")
    except (FileNotFoundError, ValueError) as e:
        logger.warning(f"MRI file not found at {mri_path}, using synthetic data for demo")
        volume = np.random.rand(256, 256, 100).astype(np.float32)
        spacing = np.array([0.5, 0.5, 1.0])
        metadata = {'format': 'synthetic', 'shape': volume.shape}
    
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
        validate=True
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
    
    surface_meshes = surface_reconstruction.generate_surfaces_from_segmentation(
        masks,
        final_spacing,
        structures=['femur', 'tibia', 'femoral_cartilage', 'tibial_cartilage']
    )
    
    logger.info("Decimating surfaces for faster processing...")
    decimated_meshes = {}
    for struct_name, mesh in surface_meshes.items():
        if mesh.n_cells > 50000:
            original_faces = mesh.n_cells
            decimated = surface_reconstruction.clean_surface(
                mesh,
                smoothing_iterations=0,
                decimation_target=0.3
            )
            decimated_meshes[struct_name] = decimated
            logger.info(f"  {struct_name}: {original_faces} -> {decimated.n_cells} faces")
        else:
            decimated_meshes[struct_name] = mesh
    
    surface_meshes = decimated_meshes
    
    logger.info("Surface meshes generated:")
    for struct_name, mesh in surface_meshes.items():
        logger.info(f"  {struct_name}: {mesh.n_points} points, {mesh.n_cells} faces")
        quality = surface_reconstruction.check_mesh_quality(mesh, validate=True)
        logger.info(f"    Quality: manifold={quality['is_manifold']}, watertight={quality.get('is_watertight', False)}")
    
    # ========================================================================
    # STEP 4: VOLUMETRIC MESHING
    # ========================================================================
    logger.info("\n[STEP 4] Generating volumetric meshes...")
    
    volume_meshes = volumetric_meshing.generate_volume_mesh(
        surface_meshes,
        final_spacing,
        cartilage_element_size=2.0,
        bone_element_size=5.0
    )
    
    logger.info("Volume meshes generated:")
    for struct_name, mesh in volume_meshes.items():
        logger.info(f"  {struct_name}: {mesh.n_cells} tetrahedra")
    
    # ========================================================================
    # STEP 5: INJURY MODELING
    # ========================================================================
    logger.info("\n[STEP 5] Applying injury model (ACL deficiency)...")
    
    labeled_meshes = {name: mesh for name, mesh in volume_meshes.items()}
    fea_model = {
        'volume_meshes': labeled_meshes,
        'surface_meshes': surface_meshes,
        'materials': None
    }
    
    acl_severity = 0.8
    fea_model = injury_modeling.apply_acl_deficiency(
        fea_model,
        severity=acl_severity,
        constraint_stiffness_reduction=0.1
    )
    
    logger.info(f"Applied ACL deficiency: severity={acl_severity:.2f}")
    
    # ========================================================================
    # STEP 6: MOVEMENT SCENARIOS
    # ========================================================================
    logger.info("\n[STEP 6] Defining movement scenarios...")
    
    scenarios = movement_scenarios.generate_standard_scenarios()
    logger.info(f"Generated {len(scenarios)} scenarios")
    
    # ========================================================================
    # STEP 7: SKIP FEA (FEniCS not available)
    # ========================================================================
    logger.info("\n[STEP 7] Skipping FEA (FEniCS not available)")
    logger.warning("Using placeholder stress values for demonstration")
    logger.warning("For real FEA results, install FEniCS via WSL or Docker")
    
    # Generate placeholder metrics for risk scoring
    scenario_results = {}
    for scenario_name in scenarios.keys():
        scenario_results[scenario_name] = {
            'peak_stress': 1.5 + np.random.rand() * 0.5,  # 1.5-2.0 MPa
            'mean_stress': 0.8 + np.random.rand() * 0.3,  # 0.8-1.1 MPa
            'std_stress': 0.2,
            'stress_percentiles': {
                'p25': 0.6, 'p50': 0.8, 'p75': 1.0, 'p95': 1.5, 'p99': 1.8
            },
            'high_stress_fraction': 0.05,
            'high_stress_threshold': 1.5,
            'peak_contact_pressure': 0.5,
            'mean_contact_pressure': 0.3
        }
    
    # ========================================================================
    # STEP 8: RISK SCORING
    # ========================================================================
    logger.info("\n[STEP 8] Computing risk scores...")
    
    risk_scores = {}
    injury_context = fea_model.get('injury', {})
    
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
    
    # ========================================================================
    # STEP 9: LONGITUDINAL TRACKING
    # ========================================================================
    logger.info("\n[STEP 9] Setting up longitudinal tracking...")
    
    tracking = longitudinal_tracking.LongitudinalTracker()
    
    # Simulate some tracking data
    for i in range(5):
        tracking.log_session(
            datetime.now(),
            scenario_name='light_squat',
            stress_metrics=scenario_results['light_squat'],
            duration_minutes=30
        )
    
    logger.info(f"Logged {len(tracking.sessions)} sessions")
    
    # ========================================================================
    # STEP 10: VISUALIZATION
    # ========================================================================
    logger.info("\n[STEP 10] Generating visualizations...")
    
    try:
        visualization.render_anatomy(
            surface_meshes,
            output_path="output_visualizations/anatomy.png",
            off_screen=True
        )
        logger.info("Saved anatomy visualization")
    except Exception as e:
        logger.warning(f"Visualization failed: {e}")
    
    # ========================================================================
    # COMPLETE
    # ========================================================================
    logger.info("\n" + "=" * 80)
    logger.info("PIPELINE COMPLETE (Steps 1-6, 8-10)")
    logger.info("=" * 80)
    logger.info("\nNote: Step 7 (FEA) was skipped - FEniCS not available")
    logger.info("To enable FEA:")
    logger.info("  1. Run: .\\setup_wsl_simple.ps1 (easiest, no Docker)")
    logger.info("  2. Or use Docker: .\\setup_docker.ps1")
    logger.info("\nOutputs saved to:")
    logger.info("  - output_visualizations/")
    logger.info("  - tracking_data/")


if __name__ == "__main__":
    main()
