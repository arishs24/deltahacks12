# Synovia Move: Patient-Specific Knee Digital Twin

**A comprehensive pipeline for MRI-based knee segmentation, finite element analysis, and mechanical risk assessment during rehabilitation movements.**

---

## 🎯 Overview

Synovia Move is an end-to-end system that:

1. **Segments** knee anatomy from MRI (femur, tibia, cartilage)
2. **Builds** patient-specific 3D knee meshes
3. **Encodes** injury mechanics (e.g., ACL deficiency)
4. **Runs** finite element analysis (FEA) to compute cartilage contact stress
5. **Compares** movement scenarios and quantifies mechanical risk
6. **Tracks** mechanical exposure over rehabilitation sessions

This is **NOT** a toy demo. The pipeline is designed for real MRI data, real segmentation, real meshing, and real FEA.

---

## ⚠️ Important Disclaimers

**This software is for research and decision support only. It does NOT:**

- Provide medical diagnosis
- Predict clinical outcomes
- Replace clinical judgment
- Claim FDA approval or clinical validation

**Use at your own risk. Always consult qualified medical professionals for clinical decisions.**

---

## 📁 Project Structure

```
synovia_move/
├── __init__.py
├── mri_ingestion.py          # Module 1: DICOM/NIfTI loading and preprocessing
├── segmentation.py            # Module 2: Deep learning segmentation (nnU-Net/MONAI)
├── surface_reconstruction.py  # Module 3: Marching cubes, mesh smoothing
├── volumetric_meshing.py      # Module 4: Tetrahedral mesh generation
├── injury_modeling.py         # Module 5: ACL deficiency encoding
├── movement_scenarios.py      # Module 6: Squat parameterization
├── fea_solver.py              # Module 7: FEBio/FEniCS interface
├── risk_scoring.py            # Module 8: Stress metrics and safety scores
├── longitudinal_tracking.py   # Module 9: Workout logging and dose tracking
└── visualization.py           # Module 10: PyVista rendering

examples/
└── pipeline_example.py        # End-to-end workflow demonstration

data/                           # Patient MRI data (not included)
fea_output/                     # FEA results (generated)
output_visualizations/          # Visualization outputs (generated)
tracking_data/                  # Longitudinal tracking data (generated)
```

---

## 🚀 Quick Start

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd deltahacks12
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install FEA solver (choose one):**
   - **FEBio** (recommended): Download from [https://febio.org/](https://febio.org/)
     - Add to PATH or specify path in `fea_solver.py`
   - **FEniCS** (alternative): Follow [installation guide](https://fenicsproject.org/download/)

4. **Install segmentation model:**
   - Train or download a pretrained nnU-Net or MONAI model for knee segmentation
   - Update `segmentation.py` to load your model

### Run Example Pipeline

```bash
python examples/pipeline_example.py
```

This will:
- Load MRI (or use synthetic data if not found)
- Segment knee anatomy
- Generate meshes
- Run FEA for multiple scenarios
- Compute risk scores
- Generate visualizations

---

## 📖 Module Documentation

### Module 1: MRI Ingestion

**What it does:**
- Loads DICOM series or NIfTI files
- Normalizes intensity
- Handles voxel spacing correctly
- Outputs standardized 3D volume

**Key functions:**
- `load_mri(path)` - Load from DICOM or NIfTI
- `preprocess_volume(volume, spacing, ...)` - Normalize and resample

**Patient-specific:** Yes - each MRI is unique

**Cached:** Preprocessed volumes can be cached

---

### Module 2: Segmentation

**What it does:**
- Segments femur, tibia, femoral cartilage, tibial cartilage
- Uses pretrained nnU-Net or MONAI model
- Postprocesses masks (hole filling, smoothing)

**Key functions:**
- `segment_knee(volume)` - Main segmentation function

**Patient-specific:** Yes - segmentation is unique per patient

**Cached:** Segmentation masks can be cached (large files)

**Note:** Requires GPU for inference. Assumes model is trained/available.

---

### Module 3: Surface Reconstruction

**What it does:**
- Converts masks to surface meshes (marching cubes)
- Smooths and cleans meshes
- Ensures watertight meshes

**Key functions:**
- `mask_to_surface(mask, spacing)` - Generate surface mesh
- `clean_surface(mesh)` - Improve mesh quality

**Patient-specific:** Yes - meshes are unique per patient

**Cached:** Surface meshes can be cached

---

### Module 4: Volumetric Meshing

**What it does:**
- Generates tetrahedral volume meshes
- Fine mesh for cartilage, coarser for bone
- Labels contact surfaces and boundaries

**Key functions:**
- `generate_volume_mesh(surface_meshes, ...)` - Create tetrahedral meshes
- `export_to_febio_format(...)` - Export for FEA

**Patient-specific:** Yes - meshes are unique per patient

**Cached:** Volume meshes can be cached (very large files)

**Recomputed per scenario:** No - same mesh used for all scenarios

---

### Module 5: Injury Modeling

**What it does:**
- Encodes ACL tear mechanically
- Modifies joint constraints (not full ligament geometry)
- Allows increased anterior tibial translation

**Key functions:**
- `apply_acl_deficiency(model, severity)` - Apply injury model

**Patient-specific:** Injury severity may vary per patient

**Cached:** Injury parameters can be stored with patient model

**Recomputed per scenario:** No - injury is fixed for patient

---

### Module 6: Movement Scenarios

**What it does:**
- Defines squat scenarios parametrically
- Knee flexion angle, load, stance bias
- Translates to FEA boundary conditions

**Key functions:**
- `define_squat_scenario(angle, load, stance_bias, ...)` - Create scenario
- `generate_standard_scenarios()` - Predefined scenarios

**Patient-specific:** No - scenarios are movement patterns

**Cached:** Scenario definitions can be reused

**Recomputed per scenario:** Yes - each scenario has different BCs

---

### Module 7: FEA Solver

**What it does:**
- Runs quasi-static contact FEA
- Solves for displacement and stress fields
- Extracts contact pressure and von Mises stress

**Key functions:**
- `run_fea(model, scenario, solver='febio')` - Run analysis
- `extract_stress_metrics(results, ROIs)` - Extract metrics

**Patient-specific:** Yes - results depend on patient geometry

**Cached:** FEA results can be cached per scenario

**Recomputed per scenario:** Yes - each scenario requires new FEA solve

**Note:** FEA is computationally expensive (minutes to hours per scenario)

---

### Module 8: Risk Scoring

**What it does:**
- Translates FEA stress into risk scores (0-100)
- Categorizes risk (low, moderate, high, critical)
- Generates recommendations

**Key functions:**
- `compute_risk_score(metrics, injury_context)` - Compute score
- `rank_scenarios(scenario_results)` - Rank by risk

**Patient-specific:** Yes - risk depends on patient geometry and injury

**Cached:** Risk scores can be cached per scenario

**Recomputed per scenario:** Yes - each scenario has different risk

---

### Module 9: Longitudinal Tracking

**What it does:**
- Logs workout sessions with stress metrics
- Accumulates mechanical dose (stress × time)
- Tracks stress trends over time

**Key functions:**
- `MechanicalDoseTracker` - Main tracking class
- `log_workout(tracker, ...)` - Log session

**Patient-specific:** Yes - tracking is per patient

**Cached:** Tracking data is persisted to disk

**Recomputed per scenario:** No - tracking aggregates across sessions

---

### Module 10: Visualization

**What it does:**
- Renders patient anatomy
- Visualizes stress heatmaps
- Compares scenarios side-by-side
- Plots time-series trends

**Key functions:**
- `render_anatomy(surface_meshes, ...)` - 3D anatomy
- `render_stress_heatmap(mesh, stress, ...)` - Stress visualization
- `compare_scenarios(...)` - Side-by-side comparison

**Patient-specific:** Yes - visualizations are patient-specific

**Cached:** Rendered images can be cached

---

## 🔄 What is Patient-Specific vs. Reusable?

### Patient-Specific (Computed Once Per Patient):
- MRI volume
- Segmentation masks
- Surface meshes
- Volume meshes
- Injury parameters
- FEA results (per scenario)
- Risk scores (per scenario)
- Tracking data

### Reusable (Same Across Patients):
- Segmentation model (pretrained)
- Movement scenario definitions
- Risk scoring thresholds
- Visualization functions

### Recomputed Per Scenario:
- FEA boundary conditions
- FEA solve (displacement, stress)
- Stress metrics
- Risk scores

---

## 💾 Caching Strategy

To optimize performance, consider caching:

1. **Preprocessed MRI volumes** (large, slow to process)
2. **Segmentation masks** (GPU-intensive)
3. **Surface meshes** (moderate computation)
4. **Volume meshes** (very large, slow to generate)
5. **FEA results** (very slow, scenario-specific)

Example caching structure:
```
cache/
├── patient_001/
│   ├── preprocessed_volume.npy
│   ├── masks.npz
│   ├── surfaces.pkl
│   ├── volume_meshes.pkl
│   └── fea_results/
│       ├── scenario_1.pkl
│       └── scenario_2.pkl
```

---

## 🔧 Configuration

### FEA Solver Path

Edit `synovia_move/fea_solver.py`:
```python
febio_path = Path("/path/to/febio2")
```

### Segmentation Model

Edit `synovia_move/segmentation.py`:
```python
model = load_segmentation_model("/path/to/model.pt", device='cuda')
```

### Material Properties

Edit `synovia_move/volumetric_meshing.py`:
```python
material_properties = {
    'femoral_cartilage': {'E': 0.5, 'nu': 0.45, ...},
    ...
}
```

---

## 📊 Output Files

### FEA Results
- `fea_output/{scenario_name}/model.feb` - FEBio input file
- `fea_output/{scenario_name}/model.xplt` - FEBio output
- `fea_output/{scenario_name}/results.pkl` - Parsed results (if implemented)

### Visualizations
- `output_visualizations/anatomy.png` - 3D anatomy
- `output_visualizations/stress_{scenario}.png` - Stress heatmaps
- `output_visualizations/scenario_comparison.png` - Side-by-side comparison
- `output_visualizations/stress_trends.png` - Time-series plot

### Tracking Data
- `tracking_data/{patient_id}_tracking.json` - Longitudinal data

---

## 🧪 Testing

Run the example pipeline with synthetic data:
```bash
python examples/pipeline_example.py
```

With real MRI data:
```bash
python examples/pipeline_example.py --mri_path data/patient_001/knee_mri.nii.gz
```

---

## 🐛 Troubleshooting

### FEBio not found
- Download FEBio from [https://febio.org/](https://febio.org/)
- Add to PATH or specify path in `fea_solver.py`

### Segmentation model not available
- Train or download a pretrained model
- Update `segmentation.py` to load your model
- For testing, the code uses placeholder masks

### Out of memory
- Reduce mesh element size in `volumetric_meshing.py`
- Use mesh decimation in `surface_reconstruction.py`
- Process scenarios sequentially

### FEA convergence issues
- Check boundary conditions in scenario definition
- Adjust material properties
- Increase FEA solver iterations/time steps

---

## 📚 References

- **FEBio**: [https://febio.org/](https://febio.org/)
- **nnU-Net**: [https://github.com/MIC-DKFZ/nnUNet](https://github.com/MIC-DKFZ/nnUNet)
- **MONAI**: [https://monai.io/](https://monai.io/)
- **PyVista**: [https://docs.pyvista.org/](https://docs.pyvista.org/)

---

## 📝 License

[Specify your license here]

---

## 👥 Contributors

[Add contributors]

---

## 🙏 Acknowledgments

[Add acknowledgments]

---

**Last updated:** 2024
