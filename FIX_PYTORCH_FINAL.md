# Final PyTorch Fix

The PyTorch `shm.dll` error is a Windows DLL conflict issue. Here's how to fix it:

## Solution 1: Restart PowerShell (Try This First!)

**The DLL might be cached. Restart PowerShell:**

1. Close this PowerShell window
2. Open a NEW PowerShell window
3. Navigate to your project:
   ```powershell
   cd C:\Users\arish\OneDrive\Documents\GitHub\deltahacks12
   ```
4. Set environment variable:
   ```powershell
   $env:KMP_DUPLICATE_LIB_OK="TRUE"
   ```
5. Run:
   ```powershell
   python examples/pipeline_example_no_fenics.py
   ```

## Solution 2: Create Fresh Conda Environment

**This isolates PyTorch from conflicts:**

```powershell
# Create new environment
conda create -n synovia_test python=3.11 -y
conda activate synovia_test

# Install everything fresh
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install monai numpy scipy nibabel pydicom scikit-image pyvista matplotlib

# Set environment variable
$env:KMP_DUPLICATE_LIB_OK="TRUE"

# Run pipeline
python examples/pipeline_example_no_fenics.py
```

## Solution 3: Set System Environment Variable

**Make it permanent:**

```powershell
# Set for current user (persists across sessions)
[System.Environment]::SetEnvironmentVariable("KMP_DUPLICATE_LIB_OK", "TRUE", "User")

# Restart PowerShell, then run:
python examples/pipeline_example_no_fenics.py
```

## Solution 4: Use CPU-Only PyTorch (Recommended)

**If nothing else works:**

```powershell
# Uninstall all PyTorch versions
pip uninstall torch torchvision torchaudio -y

# Install CPU-only version
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Set environment variable
$env:KMP_DUPLICATE_LIB_OK="TRUE"

# Test
python -c "import torch; print('OK')"

# Run pipeline
python examples/pipeline_example_no_fenics.py
```

## Quick Test

After trying any solution, test PyTorch:

```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python -c "import torch; print('PyTorch version:', torch.__version__)"
```

If this works, the pipeline should work too!

## Why This Happens

Windows has multiple OpenMP libraries that conflict:
- Intel OpenMP (from some packages)
- LLVM OpenMP (from PyTorch)
- Microsoft OpenMP (from Visual C++)

Setting `KMP_DUPLICATE_LIB_OK=TRUE` tells libraries to ignore the conflict.

## Next Steps After Fix

Once PyTorch works:
1. Run: `python examples/pipeline_example_no_fenics.py`
2. This tests Steps 1-6 (everything except FEA)
3. For full pipeline, install FEniCS with Python 3.12
