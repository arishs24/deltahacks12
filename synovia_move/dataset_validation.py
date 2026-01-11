"""
MODULE 0D: DATASET VALIDATION

Validates fastMRI knee DICOM dataset:
- Confirms volume shapes are reasonable for knee MRI
- Visualizes middle slices for sanity check
- Logs voxel spacing and image orientation
"""

import numpy as np
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import logging
import json
import matplotlib.pyplot as plt
import pydicom

from synovia_move.fastmri_dataset import (
    load_dicom_series,
    dicom_series_to_volume,
    extract_spacing_and_orientation
)

logger = logging.getLogger(__name__)

# Expected ranges for knee MRI
EXPECTED_SHAPE_RANGES = {
    'width': (256, 512),   # Typical: 320-384
    'height': (256, 512),  # Typical: 320-384
    'depth': (20, 200)      # Typical: 30-80 slices
}

EXPECTED_SPACING_RANGES = {
    'x': (0.3, 1.0),   # mm, typical: 0.5-0.7
    'y': (0.3, 1.0),   # mm, typical: 0.5-0.7
    'z': (0.5, 5.0)    # mm, typical: 1.0-3.0
}


def validate_volume_shape(
    volume: np.ndarray,
    volume_name: str = "volume"
) -> Tuple[bool, List[str]]:
    """
    Validate that volume shape is reasonable for knee MRI.
    
    Args:
        volume: 3D numpy array
        volume_name: Name for logging
    
    Returns:
        is_valid: Whether shape is within expected ranges
        warnings: List of warning messages
    """
    warnings = []
    
    if len(volume.shape) != 3:
        return False, [f"{volume_name} must be 3D, got shape {volume.shape}"]
    
    height, width, depth = volume.shape
    
    # Check width
    if not (EXPECTED_SHAPE_RANGES['width'][0] <= width <= EXPECTED_SHAPE_RANGES['width'][1]):
        warnings.append(
            f"{volume_name} width {width} outside expected range "
            f"{EXPECTED_SHAPE_RANGES['width']}"
        )
    
    # Check height
    if not (EXPECTED_SHAPE_RANGES['height'][0] <= height <= EXPECTED_SHAPE_RANGES['height'][1]):
        warnings.append(
            f"{volume_name} height {height} outside expected range "
            f"{EXPECTED_SHAPE_RANGES['height']}"
        )
    
    # Check depth
    if not (EXPECTED_SHAPE_RANGES['depth'][0] <= depth <= EXPECTED_SHAPE_RANGES['depth'][1]):
        warnings.append(
            f"{volume_name} depth {depth} outside expected range "
            f"{EXPECTED_SHAPE_RANGES['depth']}"
        )
    
    is_valid = len(warnings) == 0
    
    if is_valid:
        logger.info(f"{volume_name} shape validation passed: {volume.shape}")
    else:
        logger.warning(f"{volume_name} shape validation warnings: {warnings}")
    
    return is_valid, warnings


def validate_spacing(
    spacing: np.ndarray,
    volume_name: str = "volume"
) -> Tuple[bool, List[str]]:
    """
    Validate that voxel spacing is reasonable for knee MRI.
    
    Args:
        spacing: Voxel spacing (x, y, z) in mm
        volume_name: Name for logging
    
    Returns:
        is_valid: Whether spacing is within expected ranges
        warnings: List of warning messages
    """
    warnings = []
    
    if len(spacing) != 3:
        return False, [f"Spacing must have 3 values, got {len(spacing)}"]
    
    spacing_x, spacing_y, spacing_z = spacing
    
    # Check X spacing
    if not (EXPECTED_SPACING_RANGES['x'][0] <= spacing_x <= EXPECTED_SPACING_RANGES['x'][1]):
        warnings.append(
            f"{volume_name} X spacing {spacing_x:.3f}mm outside expected range "
            f"{EXPECTED_SPACING_RANGES['x']}"
        )
    
    # Check Y spacing
    if not (EXPECTED_SPACING_RANGES['y'][0] <= spacing_y <= EXPECTED_SPACING_RANGES['y'][1]):
        warnings.append(
            f"{volume_name} Y spacing {spacing_y:.3f}mm outside expected range "
            f"{EXPECTED_SPACING_RANGES['y']}"
        )
    
    # Check Z spacing
    if not (EXPECTED_SPACING_RANGES['z'][0] <= spacing_z <= EXPECTED_SPACING_RANGES['z'][1]):
        warnings.append(
            f"{volume_name} Z spacing {spacing_z:.3f}mm outside expected range "
            f"{EXPECTED_SPACING_RANGES['z']}"
        )
    
    is_valid = len(warnings) == 0
    
    if is_valid:
        logger.info(f"{volume_name} spacing validation passed: {spacing}mm")
    else:
        logger.warning(f"{volume_name} spacing validation warnings: {warnings}")
    
    return is_valid, warnings


def visualize_middle_slices(
    volume: np.ndarray,
    spacing: np.ndarray,
    output_path: Optional[Path] = None,
    show: bool = False
) -> None:
    """
    Visualize middle slices in axial, coronal, and sagittal views.
    
    Args:
        volume: 3D volume array
        spacing: Voxel spacing
        output_path: Path to save figure (None = don't save)
        show: Whether to display interactively
    """
    height, width, depth = volume.shape
    
    # Get middle slices
    mid_axial = volume[:, :, depth // 2]
    mid_coronal = volume[:, width // 2, :]
    mid_sagittal = volume[height // 2, :, :]
    
    # Create figure
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    
    # Axial (XY plane)
    im1 = axes[0].imshow(mid_axial, cmap='gray', aspect=spacing[1]/spacing[0])
    axes[0].set_title(f'Axial (Z={depth//2}, spacing={spacing[0]:.2f}x{spacing[1]:.2f}mm)')
    axes[0].set_xlabel('X')
    axes[0].set_ylabel('Y')
    plt.colorbar(im1, ax=axes[0])
    
    # Coronal (XZ plane)
    im2 = axes[1].imshow(mid_coronal, cmap='gray', aspect=spacing[2]/spacing[0])
    axes[1].set_title(f'Coronal (Y={width//2}, spacing={spacing[0]:.2f}x{spacing[2]:.2f}mm)')
    axes[1].set_xlabel('Z')
    axes[1].set_ylabel('X')
    plt.colorbar(im2, ax=axes[1])
    
    # Sagittal (YZ plane)
    im3 = axes[2].imshow(mid_sagittal, cmap='gray', aspect=spacing[2]/spacing[1])
    axes[2].set_title(f'Sagittal (X={height//2}, spacing={spacing[1]:.2f}x{spacing[2]:.2f}mm)')
    axes[2].set_xlabel('Z')
    axes[2].set_ylabel('Y')
    plt.colorbar(im3, ax=axes[2])
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        logger.info(f"Saved slice visualization to {output_path}")
    
    if show:
        plt.show()
    else:
        plt.close()


def validate_dicom_series(
    dicom_dir: Path,
    series_uid: Optional[str] = None,
    visualize: bool = False,
    output_dir: Optional[Path] = None
) -> Dict:
    """
    Comprehensive validation of DICOM series.
    
    Args:
        dicom_dir: Directory containing DICOM files
        series_uid: Specific SeriesInstanceUID to validate
        visualize: Whether to generate visualization
        output_dir: Directory for output files
    
    Returns:
        Dictionary with validation results:
            - is_valid: Overall validation status
            - shape_valid: Shape validation result
            - spacing_valid: Spacing validation result
            - warnings: List of all warnings
            - metadata: Volume metadata
    """
    logger.info(f"Validating DICOM series in {dicom_dir}")
    
    # Load series
    series = load_dicom_series(dicom_dir, series_uid)
    if not series:
        return {
            'is_valid': False,
            'error': 'No DICOM series found',
            'warnings': []
        }
    
    # Convert to volume
    try:
        volume, spacing, metadata = dicom_series_to_volume(series)
    except Exception as e:
        return {
            'is_valid': False,
            'error': f'Failed to convert to volume: {e}',
            'warnings': []
        }
    
    # Validate shape
    shape_valid, shape_warnings = validate_volume_shape(volume, "Knee MRI")
    
    # Validate spacing
    spacing_valid, spacing_warnings = validate_spacing(spacing, "Knee MRI")
    
    # Get orientation
    try:
        _, orientation = extract_spacing_and_orientation(series)
        logger.info(f"Image orientation matrix:\n{orientation}")
    except Exception as e:
        logger.warning(f"Failed to extract orientation: {e}")
        orientation = None
    
    # Visualize if requested
    if visualize:
        if output_dir:
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)
            viz_path = output_dir / f"validation_{metadata.get('PatientID', 'unknown')}.png"
        else:
            viz_path = None
        
        visualize_middle_slices(volume, spacing, viz_path, show=False)
    
    # Compile results
    all_warnings = shape_warnings + spacing_warnings
    is_valid = shape_valid and spacing_valid and len(all_warnings) == 0
    
    results = {
        'is_valid': is_valid,
        'shape_valid': shape_valid,
        'spacing_valid': spacing_valid,
        'warnings': all_warnings,
        'metadata': metadata,
        'shape': volume.shape,
        'spacing': spacing.tolist(),
        'orientation': orientation.tolist() if orientation is not None else None
    }
    
    logger.info(f"Validation complete: {'PASSED' if is_valid else 'FAILED'}")
    if all_warnings:
        logger.warning(f"Warnings: {all_warnings}")
    
    return results


def create_dataset_index(
    dicom_base_dir: Path,
    output_path: Path
) -> Path:
    """
    Create an index of all subjects and series in the dataset.
    
    Args:
        dicom_base_dir: Base directory containing organized DICOM subjects
        output_path: Path to save JSON index file
    
    Returns:
        Path to created index file
    """
    dicom_base_dir = Path(dicom_base_dir)
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    index = {
        'subjects': [],
        'total_subjects': 0,
        'total_series': 0
    }
    
    # Scan for subject directories
    subject_dirs = [d for d in dicom_base_dir.iterdir() if d.is_dir()]
    
    for subject_dir in subject_dirs:
        subject_id = subject_dir.name
        
        # Find DICOM files
        dicom_files = list(subject_dir.glob("*.dcm")) + list(subject_dir.glob("*.DCM"))
        
        if not dicom_files:
            continue
        
        # Load first file to get metadata
        try:
            ds = pydicom.dcmread(str(dicom_files[0]), stop_before_pixels=True)
            
            # Group by series
            series_dict = {}
            for dcm_file in dicom_files:
                try:
                    ds_file = pydicom.dcmread(str(dcm_file), stop_before_pixels=True)
                    series_uid = getattr(ds_file, 'SeriesInstanceUID', 'unknown')
                    if series_uid not in series_dict:
                        series_dict[series_uid] = []
                    series_dict[series_uid].append(dcm_file.name)
                except:
                    continue
            
            subject_info = {
                'subject_id': subject_id,
                'patient_id': getattr(ds, 'PatientID', 'unknown'),
                'study_instance_uid': getattr(ds, 'StudyInstanceUID', 'unknown'),
                'modality': getattr(ds, 'Modality', 'unknown'),
                'study_date': getattr(ds, 'StudyDate', 'unknown'),
                'num_series': len(series_dict),
                'series': []
            }
            
            for series_uid, files in series_dict.items():
                # Get series metadata from first file
                ds_series = pydicom.dcmread(str(subject_dir / files[0]), stop_before_pixels=True)
                series_info = {
                    'series_instance_uid': series_uid,
                    'series_description': getattr(ds_series, 'SeriesDescription', 'unknown'),
                    'num_slices': len(files),
                    'files': files[:10]  # First 10 files as sample
                }
                subject_info['series'].append(series_info)
                index['total_series'] += 1
            
            index['subjects'].append(subject_info)
            index['total_subjects'] += 1
        
        except Exception as e:
            logger.warning(f"Failed to index {subject_dir}: {e}")
            continue
    
    # Save index
    with open(output_path, 'w') as f:
        json.dump(index, f, indent=2)
    
    logger.info(f"Created dataset index: {index['total_subjects']} subjects, {index['total_series']} series")
    logger.info(f"Saved to {output_path}")
    
    return output_path
