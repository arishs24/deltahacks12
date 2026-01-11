# Quick Start: KMAR-50K Dataset Setup

## Step 1: Move Your Files

Move all your KMAR-50K files to this location:

```
data/
└── KMAR-50K/
    ├── TestingCohort.xlsx (or .csv)
    ├── TrainingCohort.xlsx (or .csv)
    ├── GroundTruthData_part1/
    │   └── [all your .nii.gz files]
    ├── Testing_GroundTruthData/
    │   └── [all your .nii.gz files]
    └── ArtifactData_part1/
        └── [all your .nii.gz files]
```

**In Windows, you can:**
1. Create folder: `data\KMAR-50K\`
2. Copy/move all 5 items (2 Excel files + 3 folders) into `data\KMAR-50K\`

## Step 2: Verify Structure

After moving, your structure should look like:
```
data/
└── KMAR-50K/
    ├── TestingCohort.xlsx
    ├── TrainingCohort.xlsx
    ├── GroundTruthData_part1/
    │   ├── 2020_100_sagittal_0.0.nii.gz
    │   ├── 2020_101_sagittal_0.0.nii.gz
    │   └── ...
    ├── Testing_GroundTruthData/
    │   ├── 2023_10_coronal_0.0.nii.gz
    │   └── ...
    └── ArtifactData_part1/
        ├── 2020_100_sagittal_0.0.nii.gz
        └── ...
```

## Step 3: Test It Works

Run this to test:

```bash
python examples/kmar_example.py
```

Or in Python:
```python
from synovia_move.kmar_dataset import scan_kmar_dataset
from pathlib import Path

# Scan your dataset
scans = scan_kmar_dataset(Path("data/KMAR-50K"))
print(f"Found {len(scans)} scans!")
```

## Step 4: Use in Pipeline

Once files are in place, you can use them directly:

```python
from synovia_move import mri_ingestion

# Automatically detects KMAR structure
volume, spacing, metadata = mri_ingestion.load_mri(
    Path("data/KMAR-50K")
)
```

## That's It!

The code is **already made** and ready to use. Just move your files to `data/KMAR-50K/` and you're good to go!
