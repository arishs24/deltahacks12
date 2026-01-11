# Quick Start Guide - Synovia Move

## Step-by-Step Instructions to Run the Pipeline

### Prerequisites

1. **Python 3.7+** installed
2. **Git** (to clone repository, if needed)

---

## Installation

### 1. Install Python Dependencies

```bash
# Navigate to project directory
cd deltahacks12

# Install required packages
pip install -r requirements.txt
```

**Note:** If you encounter issues, you may need to install packages individually:
```bash
pip install numpy scipy nibabel pydicom scikit-image torch pyvista matplotlib
```

### 2. (Optional) Install FEA Solver

For **actual FEA** (not required for testing with stub results):

**Option A: FEBio (Recommended)**
- Download from: https://febio.org/download/
- Install and add to PATH, OR
- Edit `synovia_move/config.py` and set:
  ```python
  FEBIO_PATH = Path("C:/path/to/febio2/bin/febio2.exe")  # Windows
  # or
  FEBIO_PATH = Path("/usr/local/bin/febio2")  # Linux/Mac
  ```

**Option B: FEniCS**
- Follow: https://fenicsproject.org/download/
- Set `FENICS_AVAILABLE = True` in `synovia_move/config.py`

**For testing:** You can skip this step - the pipeline will use stub results.

---

## Running the Pipeline

### Basic Run (With Synthetic Data)

```bash
python examples/pipeline_example.py
```

This will:
- Generate synthetic MRI data (if real data not found)
- Run through all 10 modules
- Create output directories
- Generate visualizations
- Display risk scores and recommendations

### Run With Real MRI Data

1. **Prepare your MRI data:**
   - Place DICOM folder or NIfTI file in `data/patient_001/`
   - Example: `data/patient_001/knee_mri.nii.gz`

2. **Edit the example script:**
   ```python
   # In examples/pipeline_example.py, line ~30:
   mri_path = "data/patient_001/knee_mri.nii.gz"  # Your path here
   ```

3. **Run:**
   ```bash
   python examples/pipeline_example.py
   ```

---

## What to Expect

### Console Output

You'll see progress logs like:
```
2024-01-XX XX:XX:XX - [STEP 1] Loading and preprocessing MRI...
2024-01-XX XX:XX:XX - Loaded MRI: shape=(256, 256, 100), spacing=[0.5 0.5 1.0]mm
2024-01-XX XX:XX:XX - [STEP 2] Segmenting knee anatomy...
...
```

### Generated Files

After running, you'll find:

```
fea_output/
├── light_squat/
│   └── model.feb
├── moderate_squat/
│   └── model.feb
└── ...

output_visualizations/
├── anatomy.png
├── stress_light_squat.png
├── stress_moderate_squat.png
├── scenario_comparison.png
└── stress_trends.png

tracking_data/
└── patient_001_tracking.json
```

### Final Output

The script will display:
- Risk scores for each scenario
- Scenario ranking (safest to riskiest)
- Recommendations
- Summary statistics

---

## Running Individual Modules

You can also import and use modules individually:

```python
from synovia_move import mri_ingestion, segmentation

# Load MRI
volume, spacing, metadata = mri_ingestion.load_mri("path/to/mri.nii.gz")

# Segment
masks = segmentation.segment_knee(volume)
```

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'synovia_move'"

**Solution:**
```bash
# Make sure you're in the project root directory
cd deltahacks12

# Install in development mode
pip install -e .

# Or add to Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"  # Linux/Mac
set PYTHONPATH=%PYTHONPATH%;%cd%  # Windows
```

### Issue: "FEBio not found" or "Using stub results"

**This is OK for testing!** The pipeline will use synthetic FEA results.

To use real FEA:
1. Install FEBio from https://febio.org/
2. Update `synovia_move/config.py` with FEBio path

### Issue: "Segmentation model not available"

**This is OK for testing!** The pipeline uses placeholder masks.

For real segmentation:
1. Train/download a knee segmentation model
2. Update `segmentation.py` to load your model

### Issue: "Out of memory" during meshing

**Solution:**
- Edit `synovia_move/config.py`:
  ```python
  CARTILAGE_ELEMENT_SIZE = 2.0  # Increase from 1.0 (coarser mesh)
  BONE_ELEMENT_SIZE = 5.0  # Increase from 3.0
  ```

### Issue: PyVista visualization window doesn't open

**Solution:**
- The example sets `show=False` to save images
- To see interactive plots, edit `examples/pipeline_example.py`:
  ```python
  visualization.render_anatomy(..., show=True)  # Change to True
  ```

### Issue: Import errors for specific packages

**Solution:**
```bash
# Install missing package
pip install <package_name>

# Or install all optional dependencies
pip install monai gmsh  # If needed
```

---

## Quick Test

To verify everything is installed correctly:

```python
# test_imports.py
try:
    from synovia_move import (
        mri_ingestion, segmentation, surface_reconstruction,
        volumetric_meshing, injury_modeling, movement_scenarios,
        fea_solver, risk_scoring, longitudinal_tracking, visualization
    )
    print("✅ All modules imported successfully!")
except ImportError as e:
    print(f"❌ Import error: {e}")
```

Run: `python test_imports.py`

---

## Next Steps

1. **Test with synthetic data** (current setup)
2. **Add real MRI data** when available
3. **Train/load segmentation model** for real segmentation
4. **Install FEBio** for real FEA
5. **Customize scenarios** in `movement_scenarios.py`
6. **Adjust material properties** in `synovia_move/config.py`

---

## Need Help?

- Check `README.md` for detailed documentation
- Review `PROJECT_STRUCTURE.md` for module overview
- See `examples/pipeline_example.py` for usage examples

---

**Ready to run?** Execute:
```bash
python examples/pipeline_example.py
```
