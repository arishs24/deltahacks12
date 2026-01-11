# How to Run Synovia Move

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Test Installation
```bash
python test_imports.py
```
Expected: Most modules should show `[OK]`. PyTorch warning is OK for testing.

### Step 3: Run the Pipeline
```bash
python examples/pipeline_example.py
```

That's it! The pipeline will:
- Use synthetic data if MRI not found
- Run all 10 modules
- Generate visualizations
- Output risk scores

---

## What You'll See

### Console Output
```
================================================================================
SYNOVIA MOVE: Patient-Specific Knee Digital Twin Pipeline
================================================================================

[STEP 1] Loading and preprocessing MRI...
Loaded MRI: shape=(256, 256, 100), spacing=[0.5 0.5 1.0]mm

[STEP 2] Segmenting knee anatomy...
Segmentation complete:
  femur: 2.34% of volume
  tibia: 1.89% of volume
  ...

[STEP 3] Generating surface meshes...
...

[STEP 10] Generating visualizations...
  Rendering anatomy...
  Rendering stress heatmap: light_squat
  ...

PIPELINE COMPLETE
================================================================================
```

### Generated Files
- `fea_output/` - FEA input/output files
- `output_visualizations/` - PNG images
- `tracking_data/` - JSON tracking data

---

## Using Real MRI Data

1. Place your MRI file:
   ```
   data/patient_001/knee_mri.nii.gz
   ```
   OR a DICOM folder:
   ```
   data/patient_001/dicom/
   ```

2. Edit `examples/pipeline_example.py` line ~55:
   ```python
   mri_path = "data/patient_001/knee_mri.nii.gz"  # Your path
   ```

3. Run:
   ```bash
   python examples/pipeline_example.py
   ```

---

## Common Issues

### "ModuleNotFoundError"
```bash
# Install in development mode
pip install -e .

# OR add to Python path
python -m pip install -e .
```

### PyTorch Warning (Segmentation)
**This is OK!** The pipeline uses placeholder segmentation for testing.
- For real segmentation: Install PyTorch and load a trained model

### FEBio Not Found
**This is OK!** The pipeline uses stub FEA results for testing.
- For real FEA: Install FEBio from https://febio.org/

---

## Expected Runtime

- **With stub results:** ~30 seconds
- **With real FEA:** Minutes to hours (depends on mesh size)

---

## Next Steps

1. ✅ Run with synthetic data (current)
2. Add real MRI data
3. Install FEBio for real FEA
4. Train/load segmentation model

---

**Ready?** Just run:
```bash
python examples/pipeline_example.py
```
