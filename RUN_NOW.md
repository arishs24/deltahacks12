# How to Run the Pipeline - Quick Guide

## Current Status

✅ MONAI installed (segmentation ready)  
❌ **FEniCS NOT installed** (FEA will fail)  
✅ PyTorch installed

## To Run the Pipeline

### Option 1: Use the Helper Script (Easiest)

```powershell
.\run_pipeline.ps1
```

This script will:
- Check all dependencies
- Set up environment variables
- Run the pipeline
- Show clear error messages if something is missing

### Option 2: Manual Run

**Step 1: Set OpenMP workaround (fixes warning)**
```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
```

**Step 2: Run pipeline**
```powershell
python examples/pipeline_example.py
```

## Install Missing Dependencies

### Install FEniCS (REQUIRED)

**Using Conda (Recommended):**
```bash
conda install -c conda-forge fenics
```

**Or create new environment:**
```bash
conda create -n synovia_move python=3.9
conda activate synovia_move
conda install -c conda-forge fenics
pip install -r requirements.txt
pip install monai
```

## What Happens When You Run

1. **If FEniCS is installed:** Pipeline runs all 10 steps with real segmentation and FEA
2. **If FEniCS is missing:** Pipeline fails at Step 7 with clear error message

## Expected Output

```
[STEP 1] Loading and preprocessing MRI...
[STEP 2] Segmenting knee anatomy... (MONAI)
[STEP 3] Generating surface meshes...
[STEP 4] Generating volumetric meshes...
[STEP 5] Applying injury model...
[STEP 6] Defining movement scenarios...
[STEP 7] Running finite element analysis... (FEniCS)
[STEP 8] Computing risk scores...
[STEP 9] Setting up longitudinal tracking...
[STEP 10] Generating visualizations...
PIPELINE COMPLETE
```

## Quick Commands

```powershell
# Check what's installed
python -c "import monai; print('MONAI OK')"
python -c "import dolfin; print('FEniCS OK')"  # Will fail if not installed

# Run with helper script
.\run_pipeline.ps1

# Or run directly
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example.py
```

## Troubleshooting

**Error: "FEniCS not available"**
→ Install FEniCS: `conda install -c conda-forge fenics`

**Error: "MONAI not available"**
→ Install MONAI: `pip install monai`

**OpenMP Warning**
→ Set `$env:KMP_DUPLICATE_LIB_OK="TRUE"` (non-fatal, just a warning)

## Files Created

After successful run:
- `fea_output/` - FEA results
- `output_visualizations/` - Plots
- `tracking_data/` - Tracking data
