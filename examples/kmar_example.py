"""
Example: Loading and processing KMAR-50K knee MRI dataset

This example demonstrates:
1. Scanning KMAR dataset structure
2. Loading individual scans
3. Loading paired artifact/ground truth images
4. Organizing for Synovia Move pipeline
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from synovia_move.kmar_dataset import (
    scan_kmar_dataset,
    load_kmar_scan,
    load_kmar_pair,
    get_kmar_scan_by_plane,
    organize_kmar_for_pipeline
)
from synovia_move import mri_ingestion
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    """
    Example workflow for KMAR-50K dataset.
    """
    logger.info("=" * 80)
    logger.info("KMAR-50K DATASET EXAMPLE")
    logger.info("=" * 80)
    
    # ========================================================================
    # STEP 1: Specify dataset path
    # ========================================================================
    dataset_dir = Path("data/KMAR-50K")  # Adjust to your dataset location
    
    if not dataset_dir.exists():
        logger.warning(f"Dataset directory not found: {dataset_dir}")
        logger.info("\nTo use this example:")
        logger.info("1. Download KMAR-50K dataset from Mendeley")
        logger.info("2. Extract to data/KMAR-50K/")
        logger.info("3. Ensure structure: data/KMAR-50K/GroundTruthData_part1/")
        return
    
    # ========================================================================
    # STEP 2: Scan dataset
    # ========================================================================
    logger.info("\n[STEP 1] Scanning KMAR dataset...")
    
    scans = scan_kmar_dataset(
        dataset_dir,
        use_ground_truth=True,
        use_artifact=True,
        use_test=False
    )
    
    logger.info(f"Found {len(scans)} scans")
    logger.info(f"Example scan IDs: {list(scans.keys())[:5]}")
    
    # ========================================================================
    # STEP 3: Get scans by plane
    # ========================================================================
    logger.info("\n[STEP 2] Getting sagittal scans...")
    
    sagittal_scans = get_kmar_scan_by_plane(scans, plane='sagittal', prefer_ground_truth=True)
    logger.info(f"Found {len(sagittal_scans)} sagittal scans")
    
    if not sagittal_scans:
        logger.warning("No sagittal scans found, trying coronal...")
        coronal_scans = get_kmar_scan_by_plane(scans, plane='coronal', prefer_ground_truth=True)
        logger.info(f"Found {len(coronal_scans)} coronal scans")
        if coronal_scans:
            sagittal_scans = coronal_scans
    
    if not sagittal_scans:
        logger.error("No suitable scans found")
        return
    
    # ========================================================================
    # STEP 4: Load a single scan
    # ========================================================================
    logger.info("\n[STEP 3] Loading a scan...")
    
    scan_id, scan_path = sagittal_scans[0]
    logger.info(f"Loading: {scan_id} from {Path(scan_path).name}")
    
    volume, spacing, metadata = load_kmar_scan(scan_path, normalize=True)
    
    logger.info(f"Volume shape: {volume.shape}")
    logger.info(f"Voxel spacing: {spacing}mm")
    logger.info(f"Plane: {metadata['plane']}")
    logger.info(f"Patient ID: {metadata['patient_id']}")
    
    # ========================================================================
    # STEP 5: Load paired images (if available)
    # ========================================================================
    logger.info("\n[STEP 4] Loading paired artifact/ground truth (if available)...")
    
    scan_data = scans[scan_id]
    plane_data = scan_data['planes'].get(metadata['plane'], {})
    
    if plane_data.get('artifact') and plane_data.get('ground_truth'):
        try:
            artifact_data, gt_data = load_kmar_pair(
                plane_data['artifact'],
                plane_data['ground_truth']
            )
            logger.info("Successfully loaded paired images")
            logger.info(f"Artifact shape: {artifact_data[0].shape}")
            logger.info(f"Ground truth shape: {gt_data[0].shape}")
        except Exception as e:
            logger.warning(f"Failed to load pair: {e}")
    else:
        logger.info("Paired images not available for this scan")
    
    # ========================================================================
    # STEP 6: Organize for pipeline
    # ========================================================================
    logger.info("\n[STEP 5] Organizing dataset for Synovia Move pipeline...")
    
    organized_dir = organize_kmar_for_pipeline(
        dataset_dir,
        output_dir=Path("data"),
        plane='sagittal',
        use_ground_truth=True
    )
    
    logger.info(f"Organized dataset to: {organized_dir}")
    
    # ========================================================================
    # STEP 7: Use with Synovia Move pipeline
    # ========================================================================
    logger.info("\n[STEP 6] Loading with Synovia Move pipeline...")
    
    # Load using the organized structure
    subject_dir = list(organized_dir.glob("subject_*"))[0] if list(organized_dir.glob("subject_*")) else None
    
    if subject_dir:
        mri_file = subject_dir / "knee_mri.nii.gz"
        if mri_file.exists():
            volume_pipeline, spacing_pipeline, metadata_pipeline = mri_ingestion.load_mri(mri_file)
            logger.info(f"Pipeline loaded: shape={volume_pipeline.shape}, spacing={spacing_pipeline}mm")
    
    # ========================================================================
    # SUMMARY
    # ========================================================================
    logger.info("\n" + "=" * 80)
    logger.info("EXAMPLE COMPLETE")
    logger.info("=" * 80)
    logger.info(f"\nDataset: KMAR-50K")
    logger.info(f"Total scans: {len(scans)}")
    logger.info(f"Sagittal scans: {len(sagittal_scans)}")
    logger.info(f"Organized to: {organized_dir}")
    logger.info("\nYou can now use this dataset in the Synovia Move pipeline:")
    logger.info(f"  from synovia_move import mri_ingestion")
    logger.info(f"  volume, spacing, metadata = mri_ingestion.load_mri('{organized_dir}/subject_XXX/knee_mri.nii.gz')")


if __name__ == "__main__":
    main()
