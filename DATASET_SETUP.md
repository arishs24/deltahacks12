# FastMRI Dataset Setup Guide

## Overview

This guide explains how to download, organize, and use the **fastMRI v2.0 knee DICOM dataset** for the Synovia Move pipeline.

**Important**: We use ONLY reconstructed DICOM files, NOT k-space data.

---

## Dataset Information

- **Dataset**: fastMRI v2.0 knee DICOMs
- **Batches**: 
  - `knee_DICOMs_batch1.tar.xz`
  - `knee_DICOMs_batch2.tar.xz`
- **Size**: Several GB per batch
- **Format**: DICOM (.dcm files)
- **Content**: Clinically realistic knee MRI scans suitable for segmentation and biomechanics

---

## Quick Start

### Option 1: Python Script (Recommended)

```bash
# Download and extract
python scripts/download_fastmri.py --extract --organize

# Or download only
python scripts/download_fastmri.py
```

### Option 2: Shell Script

```bash
# Make executable
chmod +x scripts/setup_fastmri_dataset.sh

# Download
bash scripts/setup_fastmri_dataset.sh data 1 2
```

### Option 3: Manual Download

```bash
# Create directory
mkdir -p data/fastmri_knee/raw
cd data/fastmri_knee/raw

# Download batches
curl -C - "https://fastmri-dataset.s3.amazonaws.com/v2.0/knee_DICOMs_batch1.tar.xz" --output knee_DICOMs_batch1.tar.xz
curl -C - "https://fastmri-dataset.s3.amazonaws.com/v2.0/knee_DICOMs_batch2.tar.xz" --output knee_DICOMs_batch2.tar.xz

# Extract
tar -xf knee_DICOMs_batch1.tar.xz
tar -xf knee_DICOMs_batch2.tar.xz
```

---

## Folder Structure

After setup, your directory structure will be:

```
data/
└── fastmri_knee/
    ├── raw/                          # Downloaded archives
    │   ├── knee_DICOMs_batch1.tar.xz
    │   └── knee_DICOMs_batch2.tar.xz
    │
    ├── dicom/                        # Extracted DICOM files (by batch)
    │   ├── batch1/
    │   │   └── [DICOM files]
    │   └── batch2/
    │       └── [DICOM files]
    │
    ├── dicom_organized/              # Organized by subject (after organize step)
    │   ├── subject_001/
    │   │   └── [DICOM files for this subject]
    │   ├── subject_002/
    │   └── ...
    │
    ├── nifti/                        # Converted NIfTI files (optional)
    │   ├── subject_001.nii.gz
    │   └── ...
    │
    └── metadata/                     # Dataset indices and metadata
        └── dataset_index.json
```

---

## DICOM Series Organization

### How DICOM Series Work

- **StudyInstanceUID**: Groups all series from one imaging session
- **SeriesInstanceUID**: Groups slices from one acquisition sequence
- **ImagePositionPatient**: 3D position of each slice
- **PixelSpacing**: In-plane resolution (x, y)
- **SpacingBetweenSlices**: Slice thickness (z)

### Grouping Logic

The `load_dicom_series()` function:
1. Scans directory for `.dcm` files
2. Groups by `SeriesInstanceUID`
3. Sorts slices by `ImagePositionPatient` (Z coordinate)
4. Returns sorted list of DICOM datasets

---

## Usage Examples

### 1. Load DICOM Series

```python
from synovia_move.fastmri_dataset import load_dicom_series, dicom_series_to_volume

# Load from subject directory
subject_dir = Path("data/fastmri_knee/dicom_organized/subject_001")
series = load_dicom_series(subject_dir)

# Convert to 3D volume
volume, spacing, metadata = dicom_series_to_volume(series)
```

### 2. Use with Synovia Move Pipeline

```python
from synovia_move import mri_ingestion

# Load directly (automatically uses fastmri_dataset)
volume, spacing, metadata = mri_ingestion.load_mri(
    "data/fastmri_knee/dicom_organized/subject_001"
)
```

### 3. Convert to NIfTI

```python
from synovia_move.fastmri_dataset import convert_dicom_to_nifti

convert_dicom_to_nifti(
    Path("data/fastmri_knee/dicom_organized/subject_001"),
    Path("data/fastmri_knee/nifti/subject_001.nii.gz")
)
```

### 4. Validate Dataset

```python
from synovia_move.dataset_validation import validate_dicom_series

results = validate_dicom_series(
    Path("data/fastmri_knee/dicom_organized/subject_001"),
    visualize=True,
    output_dir=Path("output_visualizations")
)
```

### 5. Run Full Example

```bash
python examples/fastmri_example.py
```

---

## Why Only DICOMs?

### We Use DICOM Because:
- ✅ **Clinically realistic**: Reconstructed images ready for analysis
- ✅ **Complete metadata**: Patient info, spacing, orientation included
- ✅ **Standard format**: Works with medical imaging tools
- ✅ **Ready for segmentation**: No reconstruction needed

### We Exclude K-Space Because:
- ❌ **Requires reconstruction**: Need complex MRI reconstruction algorithms
- ❌ **Not our focus**: We're doing biomechanics, not MRI physics
- ❌ **DICOMs are sufficient**: Already reconstructed and validated

---

## Integration with Synovia Move

The fastMRI dataset feeds into the pipeline as follows:

```
fastMRI DICOMs
    ↓
[Module 0: Dataset] → Load DICOM series
    ↓
[Module 1: MRI Ingestion] → Convert to volume, normalize
    ↓
[Module 2: Segmentation] → Segment knee anatomy
    ↓
[Module 3-10: Rest of pipeline] → Meshing, FEA, etc.
```

The `mri_ingestion.load_mri()` function automatically detects DICOM directories and uses the fastMRI dataset utilities.

---

## Validation

The dataset validation module checks:

- ✅ **Volume shape**: Reasonable dimensions for knee MRI (256-512 x 256-512 x 20-200)
- ✅ **Voxel spacing**: Typical values (0.3-1.0mm in-plane, 0.5-5.0mm slice thickness)
- ✅ **Image orientation**: Proper DICOM orientation matrix
- ✅ **Visualization**: Middle slices in axial, coronal, sagittal views

---

## Troubleshooting

### Download Fails
- Check internet connection
- Verify URL is accessible
- Try resuming: `curl -C - [URL]`

### Extraction Fails
- Ensure enough disk space (several GB per batch)
- Check file integrity: `tar -tf archive.tar.xz`

### No DICOM Files Found
- Verify extraction completed
- Check file extensions: `.dcm` or `.DCM`
- Run organization step: `organize_dicom_by_subject()`

### Volume Construction Fails
- Check DICOM files are from same series (same SeriesInstanceUID)
- Verify ImagePositionPatient tags are present
- Check PixelSpacing is set correctly

---

## Next Steps

After dataset setup:

1. **Validate**: Run validation on a few subjects
2. **Convert**: Convert to NIfTI if preferred format
3. **Index**: Create dataset index for easy access
4. **Pipeline**: Use in Synovia Move pipeline

See `examples/fastmri_example.py` for complete workflow.
