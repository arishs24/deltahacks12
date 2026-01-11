# Validation Implementation

This document describes the validation checks implemented in the Synovia Move pipeline.

## Overview

All placeholder code has been removed and replaced with real implementations:
- **Real MONAI-based segmentation** from fastMRI DICOMs
- **Real FEniCS quasi-static contact FEA solver**
- **Comprehensive validation** that fails the pipeline on invalid results

## Validation Checks

### 1. Segmentation Validation

Located in `synovia_move/segmentation.py::_validate_segmentation()`

**Checks:**
- **Shape consistency**: All masks must match volume shape
- **Coverage**: Each structure must cover 0.1% - 30% of volume
- **Connectivity**: Each structure should have < 10 disconnected components
- **Non-empty**: All masks must be non-empty
- **Spatial relationships**: Cartilage must be near corresponding bone (50% overlap after dilation)

**Failure behavior**: Raises `ValueError` with detailed error messages

### 2. Geometry Validation

Located in `synovia_move/surface_reconstruction.py::check_mesh_quality()`

**Checks:**
- **Manifold**: Mesh must be manifold (required for FEA)
- **Minimum points**: At least 10 points
- **Minimum faces**: At least 10 faces
- **Aspect ratio**: Maximum aspect ratio < 10.0
- **Edge quality**: No degenerate edges (min length > 1e-6 mm)

**Failure behavior**: Raises `ValueError` with detailed error messages

### 3. FEA Validation

Located in `synovia_move/fea_solver.py::_validate_fea_results()`

**Checks:**
- **Convergence**: Solver must converge
- **Displacements**: Must be finite and reasonable (0.001 mm - 100 mm)
- **Stresses**: Must be finite, non-negative, and reasonable (< 100 MPa for cartilage)
- **Contact pressure**: Must be finite and non-negative
- **Computation time**: Must be reasonable (< 1 hour)

**Failure behavior**: Raises `ValueError` with detailed error messages

## Pipeline Integration

All validation is enabled by default in `examples/pipeline_example.py`:

```python
# Segmentation with validation
masks = segmentation.segment_knee(
    processed_volume,
    spacing=final_spacing,
    postprocess=True,
    validate=True  # Fail pipeline if segmentation is invalid
)

# Mesh quality with validation
quality = surface_reconstruction.check_mesh_quality(mesh, validate=True)

# FEA with validation
results = fea_solver.run_fea(
    model,
    scenario,
    solver='fenics',
    validate=True  # Fail pipeline if FEA results are invalid
)
```

## Error Handling

When validation fails, the pipeline:
1. Logs detailed error messages
2. Raises `ValueError` with all validation errors
3. Stops execution (does not continue with invalid data)

This ensures that only valid, high-quality results proceed through the pipeline.

## Dependencies

### Required for Real Segmentation
- `torch>=1.10.0` (PyTorch)
- `monai>=1.0.0` (MONAI for segmentation)

### Required for Real FEA
- `fenics` (FEniCS - install with: `conda install -c conda-forge fenics`)

## Notes

- All placeholder/stub code has been removed
- The pipeline will fail if required dependencies are missing
- Validation thresholds can be adjusted in the respective modules
- For production use, provide trained segmentation models
