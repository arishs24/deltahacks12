"""
MODULE 0: FASTMRI DATASET ACQUISITION AND INGESTION

Handles downloading, organizing, and loading the fastMRI v2.0 knee DICOM dataset.
Focuses ONLY on reconstructed DICOM files (not k-space data).

Dataset: fastMRI v2.0 knee DICOMs
- knee_DICOMs_batch1.tar.xz
- knee_DICOMs_batch2.tar.xz
"""

import os
import subprocess
import tarfile
import shutil
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import logging
import json

import numpy as np
import pydicom
from pydicom.dataset import Dataset
import nibabel as nib
from nibabel.orientations import axcodes2ornt, ornt_transform

logger = logging.getLogger(__name__)

# Dataset URLs
FASTMRI_BASE_URL = "https://fastmri-dataset.s3.amazonaws.com/v2.0"
BATCH1_URL = f"{FASTMRI_BASE_URL}/knee_DICOMs_batch1.tar.xz"
BATCH2_URL = f"{FASTMRI_BASE_URL}/knee_DICOMs_batch2.tar.xz"

# Expected dataset structure
DATASET_STRUCTURE = {
    'raw': 'Raw downloaded archives',
    'dicom': 'Extracted DICOM files organized by subject',
    'nifti': 'Converted NIfTI files (optional)',
    'metadata': 'Dataset metadata and indices'
}


def download_fastmri_knee_dataset(
    output_dir: Path,
    batches: List[int] = [1, 2],
    resume: bool = True
) -> Dict[str, Path]:
    """
    Download fastMRI knee DICOM dataset batches.
    
    Args:
        output_dir: Base directory for dataset (will create fastmri_knee/ subdirectory)
        batches: List of batch numbers to download (default: [1, 2])
        resume: Whether to resume partial downloads (curl -C -)
    
    Returns:
        Dictionary mapping batch numbers to downloaded file paths
    
    Note:
        Uses curl for reliable download with resume capability.
        Downloads can be large (several GB per batch).
    """
    output_dir = Path(output_dir)
    fastmri_dir = output_dir / "fastmri_knee"
    raw_dir = fastmri_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    
    downloaded = {}
    
    for batch_num in batches:
        filename = f"knee_DICOMs_batch{batch_num}.tar.xz"
        filepath = raw_dir / filename
        url = f"{FASTMRI_BASE_URL}/{filename}"
        
        if filepath.exists():
            logger.info(f"Batch {batch_num} already exists: {filepath}")
            downloaded[batch_num] = filepath
            continue
        
        logger.info(f"Downloading batch {batch_num} from {url}")
        logger.info(f"Output: {filepath}")
        
        # Build curl command
        cmd = ['curl']
        if resume:
            cmd.extend(['-C', '-'])  # Resume partial downloads
        cmd.extend(['--output', str(filepath), url])
        
        try:
            result = subprocess.run(
                cmd,
                check=True,
                capture_output=True,
                text=True
            )
            
            # Verify download - check file size and content
            if filepath.exists():
                file_size = filepath.stat().st_size
                
                # Check if file is suspiciously small (likely an error page)
                if file_size < 1024:  # Less than 1KB is definitely wrong
                    logger.error(f"Downloaded file is too small ({file_size} bytes) - likely an error page")
                    filepath.unlink()  # Delete the bad file
                    raise ValueError(f"Download failed: file too small (got error page?)")
                
                # Check if file starts with xz magic bytes
                with open(filepath, 'rb') as f:
                    magic = f.read(6)
                    if magic[:2] != b'\xfd7z':  # xz magic bytes
                        # Check if it's an XML error page
                        f.seek(0)
                        first_bytes = f.read(100)
                        if b'<Error>' in first_bytes or b'<?xml' in first_bytes:
                            logger.error("Downloaded file appears to be an error page (XML)")
                            logger.error("The fastMRI dataset may require authentication or the URL may have changed.")
                            logger.error("Please check:")
                            logger.error("1. Visit https://fastmri.med.nyu.edu/ to register and get access")
                            logger.error("2. Check if the dataset URLs are still valid")
                            logger.error("3. You may need to download manually from the fastMRI website")
                            filepath.unlink()
                            raise ValueError("Download failed: got error page instead of archive")
                
                logger.info(f"Successfully downloaded batch {batch_num} ({file_size / (1024**2):.1f} MB)")
            else:
                raise FileNotFoundError(f"Download completed but file not found: {filepath}")
            
            downloaded[batch_num] = filepath
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to download batch {batch_num}: {e}")
            logger.error(f"stderr: {e.stderr}")
            if filepath.exists():
                filepath.unlink()  # Clean up partial download
            raise
    
    return downloaded


def extract_fastmri_archives(
    archive_paths: Dict[int, Path],
    output_dir: Path,
    remove_archives: bool = False
) -> Path:
    """
    Extract fastMRI .tar.xz archives.
    
    Args:
        archive_paths: Dictionary mapping batch numbers to archive file paths
        output_dir: Base directory for extraction
        remove_archives: Whether to delete archives after extraction
    
    Returns:
        Path to extracted DICOM directory
    """
    output_dir = Path(output_dir)
    fastmri_dir = output_dir / "fastmri_knee"
    dicom_dir = fastmri_dir / "dicom"
    dicom_dir.mkdir(parents=True, exist_ok=True)
    
    for batch_num, archive_path in archive_paths.items():
        if not archive_path.exists():
            logger.warning(f"Archive not found: {archive_path}, skipping")
            continue
        
        logger.info(f"Extracting batch {batch_num}: {archive_path}")
        
        # Check file exists and has content
        if not archive_path.exists():
            raise FileNotFoundError(f"Archive not found: {archive_path}")
        
        file_size = archive_path.stat().st_size
        if file_size == 0:
            raise ValueError(f"Archive is empty: {archive_path}")
        
        logger.info(f"Archive size: {file_size / (1024**3):.2f} GB")
        
        # Extract .tar.xz
        batch_dir = dicom_dir / f"batch{batch_num}"
        batch_dir.mkdir(parents=True, exist_ok=True)
        
        # Check if file looks valid (first few bytes should be xz magic bytes)
        with open(archive_path, 'rb') as f:
            magic = f.read(6)
            if magic[:2] != b'\xfd7z':  # xz magic bytes
                logger.error(f"File does not appear to be a valid xz archive (magic bytes: {magic.hex()})")
                logger.error("The download may be incomplete or corrupted.")
                logger.error("Try re-downloading the file.")
                raise ValueError(f"Invalid xz archive: {archive_path}")
        
        try:
            # Try 'r:xz' mode (requires lzma support in Python)
            logger.info("Attempting extraction with 'r:xz' mode...")
            with tarfile.open(archive_path, 'r:xz') as tar:
                # Get member count for progress
                members = tar.getmembers()
                logger.info(f"Archive contains {len(members)} files")
                tar.extractall(path=batch_dir)
            logger.info(f"Successfully extracted batch {batch_num} to {batch_dir}")
        except tarfile.ReadError as e:
            logger.error(f"Failed to read tar archive: {e}")
            logger.error("The file may be corrupted or incomplete.")
            logger.error("Try re-downloading the file.")
            raise
        except Exception as e:
            logger.error(f"Extraction failed: {e}")
            logger.error("\nTroubleshooting:")
            logger.error("1. Verify file integrity - check file size (should be several GB)")
            logger.error("2. Try re-downloading: python scripts/download_fastmri.py")
            logger.error("3. On Windows, you can manually extract using 7-Zip:")
            logger.error(f"   7z x {archive_path} -o{batch_dir}")
            logger.error("4. Or use Python's lzma module directly if tarfile fails")
            raise
        
        if remove_archives:
            archive_path.unlink()
            logger.info(f"Removed archive: {archive_path}")
    
    return dicom_dir


def organize_dicom_by_subject(
    dicom_dir: Path,
    output_dir: Optional[Path] = None
) -> Path:
    """
    Organize DICOM files by subject/study.
    
    Groups DICOM files by SeriesInstanceUID and organizes into subject folders.
    
    Args:
        dicom_dir: Directory containing extracted DICOM files
        output_dir: Output directory (default: dicom_dir/../dicom_organized)
    
    Returns:
        Path to organized DICOM directory
    
    Note:
        fastMRI DICOMs are organized by study. This function groups them
        into subject folders based on PatientID or StudyInstanceUID.
    """
    dicom_dir = Path(dicom_dir)
    
    if output_dir is None:
        output_dir = dicom_dir.parent / "dicom_organized"
    else:
        output_dir = Path(output_dir)
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all DICOM files
    dicom_files = list(dicom_dir.rglob("*.dcm")) + list(dicom_dir.rglob("*.DCM"))
    
    if not dicom_files:
        logger.warning(f"No DICOM files found in {dicom_dir}")
        return output_dir
    
    logger.info(f"Found {len(dicom_files)} DICOM files")
    
    # Group by PatientID and StudyInstanceUID
    studies = {}
    
    for dcm_file in dicom_files:
        try:
            ds = pydicom.dcmread(str(dcm_file), stop_before_pixels=True)
            
            # Use PatientID if available, otherwise StudyInstanceUID
            patient_id = getattr(ds, 'PatientID', None)
            study_uid = getattr(ds, 'StudyInstanceUID', None)
            
            if patient_id:
                subject_id = f"subject_{patient_id}"
            elif study_uid:
                subject_id = f"subject_{study_uid[:8]}"  # Use first 8 chars
            else:
                subject_id = f"subject_unknown_{len(studies)}"
            
            if subject_id not in studies:
                studies[subject_id] = []
            
            studies[subject_id].append(dcm_file)
        
        except Exception as e:
            logger.warning(f"Failed to read {dcm_file}: {e}")
            continue
    
    # Copy files to organized structure
    for subject_id, files in studies.items():
        subject_dir = output_dir / subject_id
        subject_dir.mkdir(exist_ok=True)
        
        for src_file in files:
            dst_file = subject_dir / src_file.name
            if not dst_file.exists():
                shutil.copy2(src_file, dst_file)
        
        logger.info(f"Organized {len(files)} files for {subject_id}")
    
    logger.info(f"Organized {len(studies)} subjects into {output_dir}")
    return output_dir


def load_dicom_series(
    dicom_dir: Path,
    series_uid: Optional[str] = None
) -> List[Dataset]:
    """
    Load DICOM series from directory.
    
    Args:
        dicom_dir: Directory containing DICOM files
        series_uid: Specific SeriesInstanceUID to load (None = load all series)
    
    Returns:
        List of DICOM datasets, sorted by slice position
    
    Note:
        Groups slices by SeriesInstanceUID and sorts by ImagePositionPatient.
    """
    dicom_dir = Path(dicom_dir)
    
    # Find all DICOM files
    dicom_files = list(dicom_dir.glob("*.dcm")) + list(dicom_dir.glob("*.DCM"))
    
    if not dicom_files:
        logger.warning(f"No DICOM files found in {dicom_dir}")
        return []
    
    # Load DICOM files
    datasets = []
    for dcm_file in dicom_files:
        try:
            ds = pydicom.dcmread(str(dcm_file))
            
            # Filter by SeriesInstanceUID if specified
            if series_uid is not None:
                if getattr(ds, 'SeriesInstanceUID', None) != series_uid:
                    continue
            
            datasets.append(ds)
        
        except Exception as e:
            logger.warning(f"Failed to read {dcm_file}: {e}")
            continue
    
    if not datasets:
        logger.warning("No valid DICOM datasets found")
        return []
    
    # Group by SeriesInstanceUID
    series_dict = {}
    for ds in datasets:
        series_uid = getattr(ds, 'SeriesInstanceUID', 'unknown')
        if series_uid not in series_dict:
            series_dict[series_uid] = []
        series_dict[series_uid].append(ds)
    
    # If specific series requested, return only that
    if series_uid is not None and series_uid in series_dict:
        datasets = series_dict[series_uid]
    elif len(series_dict) == 1:
        # Only one series, use it
        datasets = list(series_dict.values())[0]
    else:
        # Multiple series - use the largest one (most slices)
        largest_series = max(series_dict.items(), key=lambda x: len(x[1]))
        logger.info(f"Multiple series found, using largest: {largest_series[0]} ({len(largest_series[1])} slices)")
        datasets = largest_series[1]
    
    # Sort by ImagePositionPatient (slice location)
    try:
        datasets.sort(key=lambda ds: _get_slice_position(ds))
    except Exception as e:
        logger.warning(f"Failed to sort by position, using file order: {e}")
    
    logger.info(f"Loaded {len(datasets)} DICOM slices")
    return datasets


def _get_slice_position(ds: Dataset) -> float:
    """Extract slice position from DICOM dataset."""
    # Try ImagePositionPatient (3D vector)
    if hasattr(ds, 'ImagePositionPatient'):
        pos = ds.ImagePositionPatient
        if pos and len(pos) >= 3:
            # Use Z coordinate (typically slice direction)
            return float(pos[2])
    
    # Fallback to SliceLocation
    if hasattr(ds, 'SliceLocation'):
        return float(ds.SliceLocation)
    
    # Fallback to InstanceNumber
    if hasattr(ds, 'InstanceNumber'):
        return float(ds.InstanceNumber)
    
    return 0.0


def dicom_series_to_volume(
    series: List[Dataset],
    normalize: bool = True
) -> Tuple[np.ndarray, np.ndarray, Dict]:
    """
    Convert DICOM series to 3D volume array.
    
    Args:
        series: List of DICOM datasets (from load_dicom_series)
        normalize: Whether to normalize pixel values to [0, 1]
    
    Returns:
        volume: 3D numpy array (H x W x D)
        spacing: Voxel spacing (x, y, z) in mm
        metadata: Dictionary with additional metadata
    """
    if not series:
        raise ValueError("Empty DICOM series")
    
    # Get pixel arrays
    slices = []
    positions = []
    spacings = []
    
    for ds in series:
        try:
            pixel_array = ds.pixel_array.astype(np.float32)
            slices.append(pixel_array)
            
            # Get slice position
            pos = _get_slice_position(ds)
            positions.append(pos)
            
            # Get spacing
            spacing_x = float(getattr(ds, 'PixelSpacing', [1.0, 1.0])[0])
            spacing_y = float(getattr(ds, 'PixelSpacing', [1.0, 1.0])[1])
            spacing_z = float(getattr(ds, 'SpacingBetweenSlices', 1.0))
            if spacing_z == 0 or not hasattr(ds, 'SpacingBetweenSlices'):
                # Calculate from ImagePositionPatient if available
                if hasattr(ds, 'ImagePositionPatient') and len(positions) > 1:
                    prev_pos = positions[-2] if len(positions) > 1 else pos
                    spacing_z = abs(pos - prev_pos)
                else:
                    spacing_z = 1.0
            
            spacings.append([spacing_x, spacing_y, spacing_z])
        
        except Exception as e:
            logger.warning(f"Failed to process slice: {e}")
            continue
    
    if not slices:
        raise ValueError("No valid slices found in series")
    
    # Stack slices
    volume = np.stack(slices, axis=-1)
    
    # Get spacing (use most common or mean)
    spacing_x = np.mean([s[0] for s in spacings])
    spacing_y = np.mean([s[1] for s in spacings])
    
    # Calculate slice spacing from positions
    if len(positions) > 1:
        position_diffs = np.diff(sorted(positions))
        spacing_z = np.mean(position_diffs[position_diffs > 0])
    else:
        spacing_z = spacings[0][2] if spacings else 1.0
    
    spacing = np.array([spacing_x, spacing_y, spacing_z])
    
    # Normalize if requested
    if normalize:
        v_min, v_max = volume.min(), volume.max()
        if v_max > v_min:
            volume = (volume - v_min) / (v_max - v_min)
    
    # Extract metadata
    first_ds = series[0]
    metadata = {
        'PatientID': getattr(first_ds, 'PatientID', 'unknown'),
        'StudyInstanceUID': getattr(first_ds, 'StudyInstanceUID', 'unknown'),
        'SeriesInstanceUID': getattr(first_ds, 'SeriesInstanceUID', 'unknown'),
        'Modality': getattr(first_ds, 'Modality', 'unknown'),
        'StudyDate': getattr(first_ds, 'StudyDate', 'unknown'),
        'SeriesDescription': getattr(first_ds, 'SeriesDescription', 'unknown'),
        'shape': volume.shape,
        'spacing': spacing.tolist()
    }
    
    logger.info(f"Constructed volume: shape={volume.shape}, spacing={spacing}mm")
    
    return volume, spacing, metadata


def extract_spacing_and_orientation(
    series: List[Dataset]
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Extract voxel spacing and image orientation from DICOM series.
    
    Args:
        series: List of DICOM datasets
    
    Returns:
        spacing: Voxel spacing (x, y, z) in mm
        orientation: Image orientation matrix (3x3)
    """
    if not series:
        raise ValueError("Empty series")
    
    ds = series[0]
    
    # Get spacing
    spacing_x = float(getattr(ds, 'PixelSpacing', [1.0, 1.0])[0])
    spacing_y = float(getattr(ds, 'PixelSpacing', [1.0, 1.0])[1])
    spacing_z = float(getattr(ds, 'SpacingBetweenSlices', 1.0))
    
    if spacing_z == 0:
        # Calculate from slice positions
        positions = [_get_slice_position(d) for d in series]
        if len(positions) > 1:
            position_diffs = np.diff(sorted(positions))
            spacing_z = np.mean(position_diffs[position_diffs > 0])
        else:
            spacing_z = 1.0
    
    spacing = np.array([spacing_x, spacing_y, spacing_z])
    
    # Get orientation
    if hasattr(ds, 'ImageOrientationPatient'):
        row_cos = np.array(ds.ImageOrientationPatient[0:3])
        col_cos = np.array(ds.ImageOrientationPatient[3:6])
        slice_cos = np.cross(row_cos, col_cos)
        orientation = np.array([row_cos, col_cos, slice_cos])
    else:
        # Default: identity
        orientation = np.eye(3)
    
    return spacing, orientation


def convert_dicom_to_nifti(
    dicom_dir: Path,
    output_path: Path,
    series_uid: Optional[str] = None
) -> Path:
    """
    Convert DICOM series to NIfTI format.
    
    Args:
        dicom_dir: Directory containing DICOM files
        output_path: Output NIfTI file path (.nii or .nii.gz)
        series_uid: Specific SeriesInstanceUID to convert (None = use largest series)
    
    Returns:
        Path to created NIfTI file
    
    Note:
        Preserves orientation and spacing from DICOM.
        Uses nibabel for conversion.
    """
    dicom_dir = Path(dicom_dir)
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Load DICOM series
    series = load_dicom_series(dicom_dir, series_uid)
    if not series:
        raise ValueError(f"No DICOM series found in {dicom_dir}")
    
    # Convert to volume
    volume, spacing, metadata = dicom_series_to_volume(series, normalize=False)
    
    # Get orientation
    _, orientation = extract_spacing_and_orientation(series)
    
    # Create affine matrix
    # Simplified: assumes standard orientation
    # In production, properly compute from ImageOrientationPatient
    affine = np.eye(4)
    affine[:3, :3] = orientation * spacing.reshape(3, 1)
    if hasattr(series[0], 'ImagePositionPatient'):
        pos = series[0].ImagePositionPatient
        affine[:3, 3] = pos
    
    # Create NIfTI image
    nii_img = nib.Nifti1Image(volume, affine)
    
    # Add metadata to header
    header = nii_img.header
    header.set_xyzt_units('mm', 'sec')
    header['pixdim'][1:4] = spacing
    
    # Save
    nib.save(nii_img, str(output_path))
    
    logger.info(f"Converted DICOM to NIfTI: {output_path}")
    logger.info(f"  Shape: {volume.shape}, Spacing: {spacing}mm")
    
    return output_path
