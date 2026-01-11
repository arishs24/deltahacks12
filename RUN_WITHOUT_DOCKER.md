# Run Without Docker - Complete Guide

You have **3 options** to run the pipeline without Docker:

## Option 1: WSL (Recommended - No Docker Needed) ⭐

**Easiest way to get FEniCS on Windows without Docker**

### Quick Setup:
```powershell
# Run as Administrator
.\setup_wsl_simple.ps1
```

### What it does:
1. Installs WSL (Windows Subsystem for Linux)
2. Sets up FEniCS in the Linux environment
3. Installs all Python dependencies

### After setup:
```bash
# Open WSL
wsl

# Navigate to your project
cd /mnt/c/Users/arish/OneDrive/Documents/GitHub/deltahacks12

# Run pipeline
python3 examples/pipeline_example.py
```

**Pros:**
- ✅ No Docker needed
- ✅ Native Linux environment
- ✅ Full FEniCS support
- ✅ Good performance

**Cons:**
- ⚠️ Requires restart after WSL installation
- ⚠️ Need to run pipeline in WSL terminal

---

## Option 2: Run Without FEniCS (Testing Only)

**Test Steps 1-6 without FEA**

### Quick Run:
```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example_no_fenics.py
```

### What it does:
- ✅ Runs Steps 1-6 (MRI → Segmentation → Meshing)
- ✅ Uses placeholder stress values for risk scoring
- ✅ Skips FEA (Step 7)
- ✅ Still generates visualizations and tracking

**Pros:**
- ✅ No installation needed
- ✅ Test most of the pipeline
- ✅ Works immediately

**Cons:**
- ❌ No real FEA results
- ❌ Placeholder stress values
- ❌ Not suitable for production

---

## Option 3: Manual FEniCS Installation

**Try to install FEniCS directly on Windows (may not work)**

### Attempt 1: Conda
```bash
conda install -c conda-forge fenics
```
*(Usually fails on Windows)*

### Attempt 2: Build from Source
Follow: https://fenicsproject.org/download/

**Pros:**
- ✅ Runs natively in Windows
- ✅ No WSL or Docker

**Cons:**
- ❌ Very difficult on Windows
- ❌ May not work
- ❌ Complex build process

---

## Recommendation

**For best results without Docker:**
1. Use **Option 1 (WSL)** - It's the easiest and most reliable
2. If you just want to test: Use **Option 2** to see Steps 1-6 work

## Quick Start Commands

### WSL Method:
```powershell
# As Administrator
.\setup_wsl_simple.ps1

# After restart, in WSL:
wsl
cd /mnt/c/Users/arish/OneDrive/Documents/GitHub/deltahacks12
python3 examples/pipeline_example.py
```

### No FEniCS Method:
```powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
python examples/pipeline_example_no_fenics.py
```

## Summary

| Method | FEA Support | Setup Difficulty | Recommended |
|--------|------------|------------------|-------------|
| WSL | ✅ Full | Easy | ⭐ Yes |
| No FEniCS | ❌ None | None | For testing |
| Manual | ⚠️ Maybe | Hard | Not recommended |

**Choose WSL if you want full pipeline without Docker!**
