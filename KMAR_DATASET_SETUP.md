# KMAR-50K Dataset Setup Guide

## Overview

The **KMAR-50K** dataset is a multi-view knee MRI dataset with paired artifact and ground truth images. All files are already in NIfTI format, making it easy to use with Synovia Move.

**Dataset**: KMAR-50K: A Multi-view Open-access Dataset of Paired Knee MRI for Motion Artifact Removal

**Source**: Mendeley Data
- Part 1: https://data.mendeley.com/datasets/95w9f5tzz8
- Part 2: See link in dataset description

---

## Dataset Structure

After downloading, your structure should be:

```
data/
└── KMAR-50K/
    ├── ArtifactData_part1/
    │   ├── 2020_100_sagittal_0.0.nii.gz
    │   ├── 2020_101_sagittal_0.0.nii.gz
    │   ├── 2020_102_coronal_0.0.nii.gz
    │   └── ...
    │
    ├── GroundTruthData_part1/
    │   ├── 2020_100_sagittal_0.0.nii.gz
    │   ├── 2020_101_sagittal_0.0.nii.gz
    │   ├── 2020_102_coronal_0.0.nii.gz
    │   └── ...
    │
    └── Testing_GroundTruthData/
        ├── 2023_10_coronal_0.0.nii.gz
        └── ...
```

---

## Filename Format

Files follow the pattern:
```
{patient_id}_{scan_id}_{plane}_{artifact_level}.nii.gz
```

**Example**: `2020_100_sagittal_0.0.nii.gz`
- `2020`: Patient ID
- `100`: Scan ID
- `sagittal`: Imaging plane (sagittal, coronal, transection)
- `0.0`: Artifact level (0.0 = no artifacts in ground truth, 1.0 = with artifacts)

---

## Quick Start

### 1. Download Dataset

1. Visit: https://data.mendeley.com/datasets/95w9f5tzz8
2. Download "ArtifactData_part1" and "GroundTruthData_part1"
3. Extract to: `data/KMAR-50K/`

### 2. Use with Synovia Move

#### Option A: Direct Loading

```python
from synovia_move.kmar_dataset import load_kmar_scan

# Load a single scan
volume, spacing, metadata = load_kmar_scan(
    "data/KMAR-50K/GroundTruthData_part1/2020_100_sagittal_0.0.nii.gz"
)
```

#### Option B: Organize First (Recommended)

```python
from synovia_move.kmar_dataset import organize_kmar_for_pipeline

# Organize dataset
organized_dir = organize_kmar_for_pipeline(
    Path("data/KMAR-50K"),
    output_dir=Path("data"),
    plane='sagittal',  # or 'coronal', 'transection'
    use_ground_truth=True
)

# Now use with pipeline
from synovia_move import mri_ingestion
volume, spacing, metadata = mri_ingestion.load_mri(
    "data/kmar_knee/subject_2020_100/knee_mri.nii.gz"
)
```

#### Option C: Automatic Detection

The `mri_ingestion.load_mri()` function automatically detects KMAR dataset structure:

```python
from synovia_move import mri_ingestion

# Automatically detects and loads from KMAR structure
volume, spacing, metadata = mri_ingestion.load_mri(
    Path("data/KMAR-50K")
)
```

---

## Example Workflow

```python
from synovia_move.kmar_dataset import (
    scan_kmar_dataset,
    get_kmar_scan_by_plane,
    load_kmar_scan
)

# 1. Scan dataset
scans = scan_kmar_dataset(
    Path("data/KMAR-50K"),
    use_ground_truth=True,
    use_artifact=False
)

# 2. Get sagittal scans
sagittal_scans = get_kmar_scan_by_plane(scans, plane='sagittal')

# 3. Load a scan
scan_id, scan_path = sagittal_scans[0]
volume, spacing, metadata = load_kmar_scan(scan_path)

# 4. Use in pipeline
# ... continue with segmentation, meshing, etc.
```

---

## Imaging Planes

The dataset contains three imaging planes:

1. **Sagittal**: Side view (most common for knee MRI)
2. **Coronal**: Front view
3. **Transection**: Cross-section view

For knee biomechanics, **sagittal** is typically most useful as it shows the joint in the flexion-extension plane.

---

## Paired Images

The dataset includes paired images:
- **Artifact images**: Motion artifacts present
- **Ground truth images**: Clean images without artifacts

For Synovia Move, we use **ground truth images** (artifact_level = 0.0) as they provide better segmentation quality.

---

## Integration with Synovia Move

The KMAR dataset integrates seamlessly:

```
KMAR-50K Dataset
    ↓
[Module 0: Dataset] → Load NIfTI files
    ↓
[Module 1: MRI Ingestion] → Already in NIfTI, just load
    ↓
[Module 2: Segmentation] → Segment knee anatomy
    ↓
[Module 3-10: Rest of pipeline] → Meshing, FEA, etc.
```

---

## Advantages of KMAR Dataset

✅ **Already in NIfTI format** - No DICOM conversion needed
✅ **Multiple imaging planes** - Sagittal, coronal, transection
✅ **Paired images** - Can compare artifact vs. clean
✅ **Open access** - No registration required
✅ **Large dataset** - 1,444 scans from 1,190 patients

---

## Running the Example

```bash
python examples/kmar_example.py
```

This will:
1. Scan the dataset
2. Load sample scans
3. Organize for pipeline use
4. Demonstrate integration

---

## Troubleshooting

**Error: "Dataset directory not found"**
- Ensure dataset is extracted to `data/KMAR-50K/`
- Check that `GroundTruthData_part1/` exists

**Error: "No sagittal scans found"**
- Try different plane: `plane='coronal'` or `plane='transection'`
- Check that files follow naming pattern: `*_sagittal_*.nii.gz`

**Error: "Could not parse filename"**
- Some test files have extra suffixes (e.g., `_N4_Norm_RegSyN`)
- The parser handles these, but check file names if issues occur

---

## Next Steps

After setup:

1. **Organize dataset**: Run `organize_kmar_for_pipeline()`
2. **Validate**: Check a few scans load correctly
3. **Pipeline**: Use in Synovia Move pipeline
4. **Segmentation**: Proceed with knee anatomy segmentation

See `examples/kmar_example.py` for complete workflow.
