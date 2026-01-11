#!/usr/bin/env python
"""
Quick setup script to verify KMAR-50K dataset is in the right place.

Usage:
    python scripts/setup_kmar.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from synovia_move.kmar_dataset import scan_kmar_dataset
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    dataset_dir = Path("data/KMAR-50K")
    
    print("=" * 80)
    print("KMAR-50K DATASET SETUP CHECK")
    print("=" * 80)
    print()
    
    # Check if directory exists
    if not dataset_dir.exists():
        print(f"[ERROR] Dataset directory not found: {dataset_dir}")
        print()
        print("Please move your files to:")
        print(f"  {dataset_dir.absolute()}/")
        print()
        print("Expected structure:")
        print("  data/KMAR-50K/")
        print("    ├── GroundTruthData_part1/")
        print("    ├── Testing_GroundTruthData/")
        print("    ├── ArtifactData_part1/")
        print("    ├── TestingCohort.xlsx (optional)")
        print("    └── TrainingCohort.xlsx (optional)")
        return 1
    
    # Check for required folders (handle variations in naming)
    required_folders = {
        "GroundTruthData_part1": ["GroundTruthData_part1"],
        "Testing_GroundTruthData": ["Testing_GroundTruthData", "Testing _GroundTruthData", "Testing_GroundTruthData_part1"],
        "ArtifactData_part1": ["ArtifactData_part1"]
    }
    
    missing = []
    found_folders = {}
    
    for folder_key, possible_names in required_folders.items():
        folder_path = None
        for name in possible_names:
            test_path = dataset_dir / name
            if test_path.exists():
                folder_path = test_path
                found_folders[folder_key] = name
                break
        
        # If not found, try to find any folder matching pattern
        if folder_path is None:
            if "Testing" in folder_key:
                # Look for any folder with "Testing" and "GroundTruth"
                for folder in dataset_dir.iterdir():
                    if folder.is_dir() and "Testing" in folder.name and "GroundTruth" in folder.name:
                        folder_path = folder
                        found_folders[folder_key] = folder.name
                        break
        
        if folder_path is None or not folder_path.exists():
            missing.append(folder_key)
        else:
            # Use rglob to search recursively (handles nested folders)
            nii_files = list(folder_path.rglob("*.nii.gz"))
            actual_name = found_folders.get(folder_key, folder_key)
            print(f"[OK] {actual_name}: {len(nii_files)} NIfTI files found")
    
    if missing:
        print()
        print(f"[ERROR] Missing folders: {', '.join(missing)}")
        return 1
    
    # Try to scan dataset
    print()
    print("Scanning dataset...")
    try:
        scans = scan_kmar_dataset(
            dataset_dir,
            use_ground_truth=True,
            use_artifact=True,
            use_test=True
        )
        
        print()
        print("=" * 80)
        print("[SUCCESS] DATASET SETUP CORRECT!")
        print("=" * 80)
        print(f"Found {len(scans)} scans")
        print()
        print("You can now use the dataset:")
        print("  python examples/kmar_example.py")
        print()
        print("Or in Python:")
        print("  from synovia_move import mri_ingestion")
        print("  volume, spacing, metadata = mri_ingestion.load_mri('data/KMAR-50K')")
        return 0
        
    except Exception as e:
        print()
        print(f"[ERROR] Error scanning dataset: {e}")
        print("Please check that NIfTI files are in the folders")
        return 1


if __name__ == "__main__":
    sys.exit(main())
