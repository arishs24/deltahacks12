"""
MODULE 1: MRI INGESTION

Handles loading and preprocessing of knee MRI data from DICOM or NIfTI formats.
Ensures proper voxel spacing handling and intensity normalization.
"""

import numpy as np
import nibabel as nib
from pathlib import Path
from typing import Union, Tuple, Optional
import pydicom
from pydicom.dataset import Dataset
import logging

logger = logging.getLogger(__name__)


def load_mri(path: Union[str, Path]) -> Tuple[np.ndarray, np.ndarray, dict]:
    """
    Load MRI volume from DICOM series or NIfTI file.
    
    Supports:
    - NIfTI files (.nii, .nii.gz)
    - DICOM directories (automatically groups by SeriesInstanceUID)
    - fastMRI dataset structure
    - KMAR-50K dataset structure
    
    Args:
        path: Path to DICOM directory or NIfTI file (.nii, .nii.gz)
    
    Returns:
        volume: 3D numpy array of image intensities
        spacing: Voxel spacing (x, y, z) in mm
        metadata: Dictionary with additional metadata (orientation, etc.)
    
    Raises:
        ValueError: If file format is unsupported or data is invalid
    
    Note:
        For DICOM directories, uses fastmri_dataset module to properly
        group slices by SeriesInstanceUID and sort by slice position.
        For KMAR dataset, automatically detects and loads NIfTI files.
    """
    path = Path(path)
    
    # Check if this is a KMAR dataset directory
    if path.is_dir():
        # Check for KMAR structure
        if (path / "GroundTruthData_part1").exists() or (path / "ArtifactData_part1").exists():
            try:
                from synovia_move.kmar_dataset import scan_kmar_dataset, get_kmar_scan_by_plane, load_kmar_scan
                
                logger.info("Detected KMAR dataset structure")
                scans = scan_kmar_dataset(path, use_ground_truth=True, use_artifact=False)
                
                # Get first available sagittal scan
                plane_scans = get_kmar_scan_by_plane(scans, plane='sagittal', prefer_ground_truth=True)
                if plane_scans:
                    scan_id, file_path = plane_scans[0]
                    logger.info(f"Loading KMAR scan: {scan_id}")
                    return load_kmar_scan(file_path, normalize=False)
                else:
                    logger.warning("No sagittal scans found in KMAR dataset, trying other planes")
                    # Try other planes
                    for plane in ['coronal', 'transection']:
                        plane_scans = get_kmar_scan_by_plane(scans, plane=plane, prefer_ground_truth=True)
                        if plane_scans:
                            scan_id, file_path = plane_scans[0]
                            logger.info(f"Loading KMAR scan: {scan_id} (plane: {plane})")
                            return load_kmar_scan(file_path, normalize=False)
                    raise ValueError("No suitable scans found in KMAR dataset")
            except ImportError:
                logger.warning("kmar_dataset module not available, falling back to DICOM loading")
            except Exception as e:
                logger.warning(f"KMAR detection failed: {e}, falling back to DICOM loading")
    
    if path.is_file() and path.suffix in ['.nii', '.gz']:
        # Load NIfTI
        nii_img = nib.load(str(path))
        volume = nii_img.get_fdata()
        spacing = np.array(nii_img.header.get_zooms()[:3])
        affine = nii_img.affine
        
        metadata = {
            'format': 'nifti',
            'affine': affine,
            'orientation': nib.aff2axcodes(affine),
            'shape': volume.shape
        }
        
        logger.info(f"Loaded NIfTI: shape={volume.shape}, spacing={spacing}mm")
        return volume, spacing, metadata
    
    elif path.is_dir():
        # Load DICOM series - use fastmri_dataset for proper handling
        try:
            from synovia_move.fastmri_dataset import (
                load_dicom_series,
                dicom_series_to_volume
            )
            
            # Load series (automatically groups by SeriesInstanceUID)
            series = load_dicom_series(path)
            
            if not series:
                raise ValueError(f"No DICOM series found in {path}")
            
            # Convert to volume (handles sorting, spacing, etc.)
            volume, spacing, metadata = dicom_series_to_volume(series, normalize=False)
            
            metadata['format'] = 'dicom'
            metadata['num_slices'] = len(series)
            
            logger.info(f"Loaded DICOM: shape={volume.shape}, spacing={spacing}mm")
            return volume, spacing, metadata
        
        except ImportError:
            # Fallback to simple DICOM loading if fastmri_dataset not available
            logger.warning("fastmri_dataset not available, using simple DICOM loader")
            return _load_dicom_simple(path)
    
    else:
        raise ValueError(f"Unsupported file format or path does not exist: {path}")


def _load_dicom_simple(path: Path) -> Tuple[np.ndarray, np.ndarray, dict]:
    """
    Simple DICOM loader (fallback if fastmri_dataset not available).
    
    Args:
        path: Path to DICOM directory
    
    Returns:
        volume, spacing, metadata
    """
    # Load DICOM series
    dicom_files = sorted(path.glob("*.dcm"))
    if not dicom_files:
        dicom_files = sorted(path.rglob("*.dcm"))
    
    if not dicom_files:
        raise ValueError(f"No DICOM files found in {path}")
    
    # Read all slices
    slices = []
    positions = []
    for dcm_path in dicom_files:
        try:
            ds = pydicom.dcmread(str(dcm_path))
            if hasattr(ds, 'pixel_array'):
                slices.append(ds.pixel_array)
                if hasattr(ds, 'ImagePositionPatient'):
                    positions.append(ds.ImagePositionPatient)
        except Exception as e:
            logger.warning(f"Failed to read {dcm_path}: {e}")
            continue
    
    if not slices:
        raise ValueError("No valid DICOM slices found")
    
    # Stack slices
    volume = np.stack(slices, axis=-1)
    
    # Get spacing from first slice
    first_ds = pydicom.dcmread(str(dicom_files[0]))
    spacing_x = float(getattr(first_ds, 'PixelSpacing', [1.0, 1.0])[0])
    spacing_y = float(getattr(first_ds, 'PixelSpacing', [1.0, 1.0])[1])
    spacing_z = float(getattr(first_ds, 'SpacingBetweenSlices', 1.0))
    if spacing_z == 0:
        # Calculate from ImagePositionPatient if available
        if len(positions) > 1:
            spacing_z = np.linalg.norm(np.array(positions[1]) - np.array(positions[0]))
        else:
            spacing_z = 1.0
    
    spacing = np.array([spacing_x, spacing_y, spacing_z])
    
    metadata = {
        'format': 'dicom',
        'num_slices': len(slices),
        'shape': volume.shape
    }
    
    logger.info(f"Loaded DICOM (simple): shape={volume.shape}, spacing={spacing}mm")
    return volume, spacing, metadata


def preprocess_volume(
    volume: np.ndarray,
    spacing: Optional[np.ndarray] = None,
    target_spacing: Optional[np.ndarray] = None,
    normalize: bool = True,
    clip_percentiles: Tuple[float, float] = (1.0, 99.0)
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Preprocess MRI volume: normalize intensity, optionally resample to target spacing.
    
    Args:
        volume: 3D numpy array
        spacing: Current voxel spacing (x, y, z) in mm
        target_spacing: Target voxel spacing for resampling (None = no resampling)
        normalize: Whether to normalize intensities to [0, 1]
        clip_percentiles: Percentiles for intensity clipping (min, max)
    
    Returns:
        processed_volume: Preprocessed 3D array
        final_spacing: Final voxel spacing after resampling
    """
    from scipy import ndimage
    
    processed = volume.copy().astype(np.float32)
    
    # Clip outliers
    if clip_percentiles:
        p_low, p_high = np.percentile(processed, clip_percentiles)
        processed = np.clip(processed, p_low, p_high)
    
    # Normalize to [0, 1]
    if normalize:
        v_min, v_max = processed.min(), processed.max()
        if v_max > v_min:
            processed = (processed - v_min) / (v_max - v_min)
    
    final_spacing = spacing.copy() if spacing is not None else np.ones(3)
    
    # Resample if target spacing provided
    if target_spacing is not None and spacing is not None:
        zoom_factors = spacing / target_spacing
        processed = ndimage.zoom(processed, zoom_factors, order=1, mode='nearest')
        final_spacing = target_spacing.copy()
        logger.info(f"Resampled to spacing {final_spacing}mm, new shape={processed.shape}")
    
    return processed, final_spacing
