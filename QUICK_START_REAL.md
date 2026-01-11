# Quick Start: Running the Real Pipeline

## Current Status

✅ **MONAI** - Installed (OpenMP warning is non-fatal)  
❌ **FEniCS** - Not installed (REQUIRED for real FEA)  
✅ **PyTorch** - Installed (OpenMP warning is non-fatal)

## Step 1: Fix OpenMP Warning (Optional but Recommended)

The OpenMP warning won't stop execution, but you can suppress it:

**Windows PowerShell:**
```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example.py
```

**Windows CMD:**
```cmd
set KMP_DUPLICATE_LIB_OK=TRUE
python examples/pipeline_example.py
```

**Or set permanently:**
```powershell
[System.Environment]::SetEnvironmentVariable("KMP_DUPLICATE_LIB_OK", "TRUE", "User")
```

## Step 2: Install FEniCS (REQUIRED)

FEniCS is required for real FEA. Choose one method:

### Option A: Using Conda (Recommended for Windows)

```bash
# Create a new conda environment (recommended)
conda create -n synovia_move python=3.9
conda activate synovia_move

# Install FEniCS
conda install -c conda-forge fenics

# Install other dependencies
pip install -r requirements.txt
pip install monai
```

### Option B: Using Docker (Alternative)

```bash
# Run pipeline in FEniCS Docker container
docker run -it -v ${PWD}:/workspace quay.io/fenicsproject/stable:latest
cd /workspace
pip install monai
python examples/pipeline_example.py
```

### Option C: Skip FEniCS (Use Placeholder - NOT RECOMMENDED)

If you can't install FEniCS right now, the pipeline will fail with a clear error. You would need to modify the code to use placeholder FEA (not recommended for production).

## Step 3: Run the Pipeline

### Basic Run

```powershell
# Set OpenMP workaround (if not set permanently)
$env:KMP_DUPLICATE_LIB_OK="TRUE"

# Run pipeline
python examples/pipeline_example.py
```

### What to Expect

**If FEniCS is installed:**
- Pipeline will run through all 10 steps
- Real segmentation using MONAI
- Real FEA using FEniCS
- Validation checks at each step
- Outputs saved to `fea_output/`, `output_visualizations/`, `tracking_data/`

**If FEniCS is NOT installed:**
- Pipeline will fail at Step 7 with:
  ```
  RuntimeError: FEniCS is required for FEA. Install with: conda install -c conda-forge fenics
  ```

## Step 4: Verify Installation

```powershell
# Check MONAI
python -c "import monai; print('MONAI:', monai.__version__)"

# Check FEniCS
python -c "import dolfin; print('FEniCS:', dolfin.__version__)"

# Check PyTorch
python -c "import torch; print('PyTorch:', torch.__version__)"
```

## Troubleshooting

### Error: "FEniCS not available"
**Solution:** Install FEniCS using one of the methods above.

### Error: "MONAI not available"
**Solution:** 
```bash
pip install monai
```

### Error: "Segmentation validation failed"
**Possible causes:**
- Segmentation model not trained (using default untrained architecture)
- MRI data quality issues
- Validation thresholds too strict

**Solution:** 
- Provide a trained model path, or
- Adjust validation thresholds in `synovia_move/segmentation.py`

### Error: "FEA validation failed"
**Possible causes:**
- Solver didn't converge
- Invalid boundary conditions
- Mesh quality issues

**Solution:** Check logs for specific validation errors.

## Running Without FEniCS (Development Only)

If you need to test other parts of the pipeline without FEniCS, you can temporarily modify `synovia_move/fea_solver.py` to skip FEniCS requirement, but **this is NOT recommended for production use**.

## Expected Runtime

- **Segmentation**: 30 seconds - 2 minutes
- **Surface Meshing**: 10-30 seconds per structure
- **Volumetric Meshing**: 1-5 minutes per structure  
- **FEA Solving**: 1-10 minutes
- **Total**: ~5-20 minutes (depending on hardware)

## Output Files

After successful run:
- `fea_output/` - FEA results (XDMF files)
- `output_visualizations/` - Plots and visualizations
- `tracking_data/` - Longitudinal tracking data

## Next Steps

1. Install FEniCS (if not already done)
2. Run the pipeline
3. Review validation results
4. Check output visualizations
5. Analyze FEA stress fields
