"""
Example: Loading and processing fastMRI knee DICOM dataset

This example demonstrates:
1. Loading DICOM series from fastMRI dataset
2. Converting to 3D volumes
3. Validating dataset
4. Converting to NIfTI (optional)
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from synovia_move.fastmri_dataset import (
    load_dicom_series,
    dicom_series_to_volume,
    convert_dicom_to_nifti,
    extract_spacing_and_orientation
)
from synovia_move.dataset_validation import (
    validate_dicom_series,
    visualize_middle_slices
)
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    """
    Example workflow for fastMRI dataset.
    """
    logger.info("=" * 80)
    logger.info("FASTMRI DATASET EXAMPLE")
    logger.info("=" * 80)
    
    # ========================================================================
    # STEP 1: Specify dataset path
    # ========================================================================
    # After downloading and extracting, point to a subject directory
    dataset_base = Path("data/fastmri_knee/dicom_organized")
    
    # Find first subject directory
    subject_dirs = [d for d in dataset_base.iterdir() if d.is_dir()] if dataset_base.exists() else []
    
    if not subject_dirs:
        logger.warning(f"No subject directories found in {dataset_base}")
        logger.info("\nTo set up dataset:")
        logger.info("1. Download: python scripts/download_fastmri.py --extract --organize")
        logger.info("2. Or use: bash scripts/setup_fastmri_dataset.sh")
        return
    
    subject_dir = subject_dirs[0]
    logger.info(f"Using subject: {subject_dir.name}")
    
    # ========================================================================
    # STEP 2: Load DICOM series
    # ========================================================================
    logger.info("\n[STEP 1] Loading DICOM series...")
    
    series = load_dicom_series(subject_dir)
    
    if not series:
        logger.error("No DICOM series found")
        return
    
    logger.info(f"Loaded {len(series)} DICOM slices")
    logger.info(f"Series UID: {series[0].SeriesInstanceUID}")
    logger.info(f"Modality: {series[0].Modality}")
    logger.info(f"Series Description: {getattr(series[0], 'SeriesDescription', 'N/A')}")
    
    # ========================================================================
    # STEP 3: Convert to 3D volume
    # ========================================================================
    logger.info("\n[STEP 2] Converting to 3D volume...")
    
    volume, spacing, metadata = dicom_series_to_volume(series)
    
    logger.info(f"Volume shape: {volume.shape}")
    logger.info(f"Voxel spacing: {spacing}mm")
    logger.info(f"Patient ID: {metadata['PatientID']}")
    
    # ========================================================================
    # STEP 4: Extract orientation
    # ========================================================================
    logger.info("\n[STEP 3] Extracting spacing and orientation...")
    
    spacing_check, orientation = extract_spacing_and_orientation(series)
    logger.info(f"Spacing: {spacing_check}mm")
    logger.info(f"Orientation matrix:\n{orientation}")
    
    # ========================================================================
    # STEP 5: Validate dataset
    # ========================================================================
    logger.info("\n[STEP 4] Validating dataset...")
    
    validation_results = validate_dicom_series(
        subject_dir,
        visualize=True,
        output_dir=Path("output_visualizations")
    )
    
    logger.info(f"Validation: {'PASSED' if validation_results['is_valid'] else 'FAILED'}")
    if validation_results['warnings']:
        logger.warning(f"Warnings: {validation_results['warnings']}")
    
    # ========================================================================
    # STEP 6: Visualize middle slices
    # ========================================================================
    logger.info("\n[STEP 5] Visualizing middle slices...")
    
    visualize_middle_slices(
        volume,
        spacing,
        output_path=Path("output_visualizations") / f"{subject_dir.name}_slices.png",
        show=False
    )
    
    # ========================================================================
    # STEP 7: Convert to NIfTI (optional)
    # ========================================================================
    logger.info("\n[STEP 6] Converting to NIfTI (optional)...")
    
    nifti_dir = Path("data/fastmri_knee/nifti")
    nifti_dir.mkdir(parents=True, exist_ok=True)
    
    nifti_path = nifti_dir / f"{subject_dir.name}.nii.gz"
    
    try:
        convert_dicom_to_nifti(
            subject_dir,
            nifti_path
        )
        logger.info(f"Converted to NIfTI: {nifti_path}")
    except Exception as e:
        logger.warning(f"NIfTI conversion failed: {e}")
    
    # ========================================================================
    # SUMMARY
    # ========================================================================
    logger.info("\n" + "=" * 80)
    logger.info("EXAMPLE COMPLETE")
    logger.info("=" * 80)
    logger.info(f"\nProcessed subject: {subject_dir.name}")
    logger.info(f"Volume shape: {volume.shape}")
    logger.info(f"Spacing: {spacing}mm")
    logger.info(f"Validation: {'PASSED' if validation_results['is_valid'] else 'FAILED'}")
    logger.info("\nThis volume can now be used in the Synovia Move pipeline:")
    logger.info("  from synovia_move import mri_ingestion")
    logger.info(f"  volume, spacing, metadata = mri_ingestion.load_mri('{nifti_path}')")


if __name__ == "__main__":
    main()
