# How to Run the Real Pipeline

This guide explains how to run the Synovia Move pipeline with **real segmentation and FEA** (no placeholders).

## Prerequisites

### 1. Install Python Dependencies

```bash
# Install core dependencies
pip install -r requirements.txt

# Install MONAI for real segmentation
pip install monai

# Install FEniCS for real FEA (choose one method)
```

### 2. Install FEniCS

**Option A: Using Conda (Recommended)**
```bash
conda install -c conda-forge fenics
```

**Option B: Using Docker**
```bash
docker pull quay.io/fenicsproject/stable:latest
```

**Option C: From Source**
Follow instructions at: https://fenicsproject.org/download/

### 3. Verify Installations

```bash
python -c "import monai; print('MONAI:', monai.__version__)"
python -c "import dolfin; print('FEniCS:', dolfin.__version__)"
```

## Data Setup

### Option 1: Use KMAR-50K Dataset (Already Set Up)

Your KMAR-50K dataset should be in:
```
data/KMAR-50K/
```

The pipeline will automatically detect and load it.

### Option 2: Use fastMRI Dataset

If you have fastMRI DICOM data:
```bash
# Place DICOM files in:
data/fastmri_knee/dicom/
```

## Running the Pipeline

### Basic Run

```bash
python examples/pipeline_example.py
```

### What Happens

1. **MRI Loading**: Loads from KMAR-50K or fastMRI dataset
2. **Real Segmentation**: Uses MONAI UNet (requires trained model or will use default architecture)
3. **Validation**: Checks segmentation quality (fails if invalid)
4. **Surface Meshing**: Generates 3D surface meshes
5. **Geometry Validation**: Checks mesh quality (fails if invalid)
6. **Volumetric Meshing**: Creates tetrahedral meshes
7. **Real FEA**: Runs FEniCS quasi-static contact solver
8. **FEA Validation**: Checks solver results (fails if invalid)
9. **Risk Scoring**: Computes risk scores
10. **Visualization**: Generates plots

### Expected Output

```
[STEP 1] Loading and preprocessing MRI...
Loaded MRI: shape=(640, 640, 22), spacing=[0.265625 0.265625 4.199997]mm

[STEP 2] Segmenting knee anatomy...
Segmenting knee on device: cpu
Segmentation complete and validated

[STEP 3] Generating surface meshes...
Surface meshes generated:
  femur: 53736 points, 107468 faces
    Quality: manifold=True, watertight=False

[STEP 4] Generating volumetric meshes...
Generated femur mesh: 163765 tetrahedra

[STEP 5] Applying injury model (ACL deficiency)...

[STEP 6] Defining movement scenarios...

[STEP 7] Running finite element analysis...
Running FEA with fenics solver
Setting up FEniCS quasi-static contact problem
Solving linear elasticity problem...
FEA analysis completed successfully
FEA validation passed

[STEP 8] Computing risk scores...

[STEP 9] Setting up longitudinal tracking...

[STEP 10] Generating visualizations...
PIPELINE COMPLETE
```

## Troubleshooting

### Error: "MONAI not available"
```bash
pip install monai
```

### Error: "FEniCS not available"
```bash
conda install -c conda-forge fenics
```

### Error: "Segmentation validation failed"
- Check that your MRI data is valid
- Ensure segmentation model is trained (or use default architecture)
- Check segmentation coverage thresholds in `segmentation.py`

### Error: "Mesh quality validation failed"
- Meshes may be too coarse or have poor quality
- Try adjusting mesh generation parameters
- Check mesh quality metrics in logs

### Error: "FEA validation failed"
- Check that boundary conditions are reasonable
- Verify material properties are valid
- Check solver convergence in logs

### Error: "PyTorch not available"
```bash
pip install torch
```

## Model Training (Optional)

If you want to use a trained segmentation model:

1. Train a MONAI UNet on knee MRI data
2. Save the model weights
3. Update `pipeline_example.py`:
   ```python
   masks = segmentation.segment_knee(
       processed_volume,
       spacing=final_spacing,
       model_path="path/to/trained_model.pt",  # Add this
       postprocess=True,
       validate=True
   )
   ```

## Performance Notes

- **Segmentation**: ~30 seconds - 2 minutes (depending on GPU/CPU)
- **Surface Meshing**: ~10-30 seconds per structure
- **Volumetric Meshing**: ~1-5 minutes per structure
- **FEA Solving**: ~1-10 minutes (depending on mesh size)

## Output Files

After running, you'll find:

- `fea_output/` - FEA results (XDMF files)
- `output_visualizations/` - Plots and visualizations
- `tracking_data/` - Longitudinal tracking data

## Next Steps

1. Review validation results in logs
2. Check output visualizations
3. Analyze FEA stress fields
4. Review risk scores and recommendations
