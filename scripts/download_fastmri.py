#!/usr/bin/env python
"""
Script to download and set up fastMRI knee DICOM dataset.

Usage:
    python scripts/download_fastmri.py [--output-dir data] [--batches 1 2] [--extract] [--organize]
"""

import argparse
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from synovia_move.fastmri_dataset import (
    download_fastmri_knee_dataset,
    extract_fastmri_archives,
    organize_dicom_by_subject
)
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(
        description="Download and set up fastMRI knee DICOM dataset"
    )
    parser.add_argument(
        '--output-dir',
        type=Path,
        default=Path('data'),
        help='Base output directory (default: data/)'
    )
    parser.add_argument(
        '--batches',
        type=int,
        nargs='+',
        default=[1, 2],
        help='Batch numbers to download (default: 1 2)'
    )
    parser.add_argument(
        '--extract',
        action='store_true',
        help='Extract archives after downloading'
    )
    parser.add_argument(
        '--organize',
        action='store_true',
        help='Organize DICOM files by subject after extraction'
    )
    parser.add_argument(
        '--remove-archives',
        action='store_true',
        help='Remove archive files after extraction'
    )
    
    args = parser.parse_args()
    
    logger.info("=" * 80)
    logger.info("FASTMRI KNEE DATASET DOWNLOAD")
    logger.info("=" * 80)
    logger.info(f"Output directory: {args.output_dir}")
    logger.info(f"Batches: {args.batches}")
    
    # Download
    logger.info("\n[STEP 1] Downloading datasets...")
    try:
        downloaded = download_fastmri_knee_dataset(
            args.output_dir,
            batches=args.batches,
            resume=True
        )
        logger.info(f"Downloaded {len(downloaded)} batch(es)")
    except Exception as e:
        logger.error(f"Download failed: {e}")
        return 1
    
    # Extract if requested
    if args.extract:
        logger.info("\n[STEP 2] Extracting archives...")
        try:
            dicom_dir = extract_fastmri_archives(
                downloaded,
                args.output_dir,
                remove_archives=args.remove_archives
            )
            logger.info(f"Extracted to: {dicom_dir}")
        except Exception as e:
            logger.error(f"Extraction failed: {e}")
            return 1
        
        # Organize if requested
        if args.organize:
            logger.info("\n[STEP 3] Organizing DICOM files by subject...")
            try:
                organized_dir = organize_dicom_by_subject(dicom_dir)
                logger.info(f"Organized to: {organized_dir}")
            except Exception as e:
                logger.error(f"Organization failed: {e}")
                return 1
    
    logger.info("\n" + "=" * 80)
    logger.info("DOWNLOAD COMPLETE")
    logger.info("=" * 80)
    logger.info("\nNext steps:")
    logger.info("1. Use synovia_move.fastmri_dataset to load DICOM series")
    logger.info("2. Convert to NIfTI if needed: convert_dicom_to_nifti()")
    logger.info("3. Validate dataset: synovia_move.dataset_validation.validate_dicom_series()")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
