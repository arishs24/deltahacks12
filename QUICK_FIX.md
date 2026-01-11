# Quick Fix Guide

## Issues You're Experiencing

### 1. PyTorch Error (shm.dll)
**Error:** `OSError: [WinError 127] The specified procedure could not be found`

**Fix:**
```powershell
# Set OpenMP workaround
$env:KMP_DUPLICATE_LIB_OK="TRUE"

# Reinstall PyTorch (CPU version)
pip uninstall torch torchvision torchaudio -y
pip install torch --index-url https://download.pytorch.org/whl/cpu

# Test
python -c "import torch; print('OK')"
```

Or run: `.\fix_pytorch.ps1`

### 2. FEniCS Installation Failed
**Error:** Python 3.13 not supported (FEniCS needs 3.9-3.12)

**Fix:**
```powershell
# Create environment with Python 3.12
conda create -n synovia_fenics python=3.12 -y
conda activate synovia_fenics

# Install FEniCS
conda install -c conda-forge fenics-dolfinx -y

# Install other dependencies
pip install monai torch numpy scipy nibabel pydicom scikit-image pyvista matplotlib
```

Or run: `.\install_fenics_python312.ps1`

## Quick Start (After Fixes)

### Option A: With FEniCS (Full Pipeline)
```powershell
conda activate synovia_fenics
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example.py
```

### Option B: Without FEniCS (Test Steps 1-6)
```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example_no_fenics.py
```

## Summary

1. **Fix PyTorch:** Set `KMP_DUPLICATE_LIB_OK=TRUE` and reinstall PyTorch
2. **Install FEniCS:** Use Python 3.12 environment (not 3.13)
3. **Run:** Always set the OpenMP variable before running

## Files Created

- `fix_pytorch.ps1` - Fixes PyTorch shm.dll error
- `install_fenics_python312.ps1` - Sets up FEniCS with Python 3.12
- `QUICK_FIX.md` - This guide
