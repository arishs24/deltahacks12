"""
MODULE 0: KMAR-50K DATASET HANDLING

Handles loading and organizing the KMAR-50K knee MRI dataset.
Dataset: Multi-view knee MRI with paired artifact/ground truth images.

Dataset structure:
- ArtifactData_part1/ - Images with motion artifacts
- GroundTruthData_part1/ - Clean ground truth images
- Testing_GroundTruthData/ - Test set ground truth images

All files are in NIfTI format (.nii.gz).
"""

import numpy as np
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import logging
import re
import nibabel as nib

logger = logging.getLogger(__name__)


def parse_kmar_filename(filename: str) -> Dict[str, str]:
    """
    Parse KMAR dataset filename to extract metadata.
    
    Handles multiple filename formats:
    - Standard: {patient_id}_{scan_id}_{plane}_{artifact_level}.nii.gz
      Example: 2020_100_sagittal_0.0.nii.gz
    - With MR number: {patient_id}_{scan_id}-XXX_MR{number}_{plane}_{artifact_level}.nii.gz
      Example: 2021_1-XXX_MR1202101110019_coronal_0.0.nii.gz
    - With date: {patient_id}_{scan_id}-{date}_{plane}_{artifact_level}.nii.gz
      Example: 2021_131-20210508003126_coronal_0.0.nii.gz
    - With suffixes: {patient_id}_{scan_id}_{plane}_{artifact_level}_{suffix}.nii.gz
      Example: 2023_10_coronal_0.0_N4_Norm_RegSyN.nii.gz
    
    Args:
        filename: Filename (with or without path)
    
    Returns:
        Dictionary with:
            - patient_id: Patient identifier
            - scan_id: Scan number
            - plane: Imaging plane (sagittal, coronal, transection)
            - artifact_level: Artifact level (0.0 = no artifacts, 1.0 = with artifacts)
            - full_id: Combined patient_scan identifier
    """
    # Extract just the filename
    filename = Path(filename).name
    
    # Remove .nii.gz extension
    base = filename.replace('.nii.gz', '').replace('.nii', '')
    
    # Try standard pattern first: {patient_id}_{scan_id}_{plane}_{artifact_level}
    pattern1 = r'^(\d+)_(\d+)_(sagittal|coronal|transection)_([\d.]+)(?:_.*)?$'
    match = re.match(pattern1, base)
    
    if match:
        patient_id, scan_id, plane, artifact_level = match.groups()
        return {
            'patient_id': patient_id,
            'scan_id': scan_id,
            'plane': plane,
            'artifact_level': artifact_level,
            'full_id': f"{patient_id}_{scan_id}"
        }
    
    # Try pattern with MR number: {patient_id}_{scan_id}-XXX_MR{number}_{plane}_{artifact_level}
    pattern2 = r'^(\d+)_(\d+)-[^_]+_MR\d+_(sagittal|coronal|transection)_([\d.]+)(?:_.*)?$'
    match = re.match(pattern2, base)
    
    if match:
        patient_id, scan_id, plane, artifact_level = match.groups()
        return {
            'patient_id': patient_id,
            'scan_id': scan_id,
            'plane': plane,
            'artifact_level': artifact_level,
            'full_id': f"{patient_id}_{scan_id}"
        }
    
    # Try pattern with date: {patient_id}_{scan_id}-{date}_{plane}_{artifact_level}
    pattern3 = r'^(\d+)_(\d+)-(\d+)_(sagittal|coronal|transection)_([\d.]+)(?:_.*)?$'
    match = re.match(pattern3, base)
    
    if match:
        patient_id, scan_id, date, plane, artifact_level = match.groups()
        return {
            'patient_id': patient_id,
            'scan_id': scan_id,
            'plane': plane,
            'artifact_level': artifact_level,
            'full_id': f"{patient_id}_{scan_id}"
        }
    
    # Try to extract at least plane and artifact level from any format
    # Look for plane and artifact level anywhere in the filename
    plane_match = re.search(r'(sagittal|coronal|transection)', base, re.IGNORECASE)
    artifact_match = re.search(r'_([\d.]+)(?:_|$)', base)
    
    if plane_match and artifact_match:
        plane = plane_match.group(1).lower()
        artifact_level = artifact_match.group(1)
        
        # Try to extract patient_id and scan_id from start
        start_match = re.match(r'^(\d+)_(\d+)', base)
        if start_match:
            patient_id, scan_id = start_match.groups()
        else:
            # Use first part as patient_id, second as scan_id
            parts = base.split('_')
            patient_id = parts[0] if len(parts) > 0 else 'unknown'
            scan_id = parts[1] if len(parts) > 1 else 'unknown'
        
        return {
            'patient_id': patient_id,
            'scan_id': scan_id,
            'plane': plane,
            'artifact_level': artifact_level,
            'full_id': f"{patient_id}_{scan_id}"
        }
    
    # Fallback: use filename as ID
    logger.warning(f"Could not parse filename: {filename}, using fallback")
    return {
        'patient_id': 'unknown',
        'scan_id': 'unknown',
        'plane': 'unknown',
        'artifact_level': '0.0',
        'full_id': base.replace('_', '-')[:20]  # Use first part of filename as ID
    }


def scan_kmar_dataset(
    dataset_dir: Path,
    use_ground_truth: bool = True,
    use_artifact: bool = False,
    use_test: bool = False
) -> Dict[str, Dict]:
    """
    Scan KMAR dataset directory and build index of available scans.
    
    Args:
        dataset_dir: Root directory containing ArtifactData_part1, GroundTruthData_part1, etc.
        use_ground_truth: Include ground truth data
        use_artifact: Include artifact data
        use_test: Include test data
    
    Returns:
        Dictionary mapping scan IDs to file paths and metadata
    """
    dataset_dir = Path(dataset_dir)
    scans = {}
    
    # Scan ground truth data
    if use_ground_truth:
        gt_dir = dataset_dir / "GroundTruthData_part1"
        if gt_dir.exists():
            logger.info(f"Scanning ground truth data: {gt_dir}")
            for nii_file in gt_dir.glob("*.nii.gz"):
                metadata = parse_kmar_filename(nii_file.name)
                scan_id = metadata['full_id']
                
                if scan_id not in scans:
                    scans[scan_id] = {
                        'patient_id': metadata['patient_id'],
                        'scan_id': metadata['scan_id'],
                        'planes': {},
                        'artifact_level': metadata['artifact_level']
                    }
                
                plane = metadata['plane']
                scans[scan_id]['planes'][plane] = {
                    'ground_truth': str(nii_file),
                    'artifact': None
                }
    
    # Scan artifact data
    if use_artifact:
        artifact_dir = dataset_dir / "ArtifactData_part1"
        if artifact_dir.exists():
            logger.info(f"Scanning artifact data: {artifact_dir}")
            for nii_file in artifact_dir.glob("*.nii.gz"):
                metadata = parse_kmar_filename(nii_file.name)
                scan_id = metadata['full_id']
                
                if scan_id not in scans:
                    scans[scan_id] = {
                        'patient_id': metadata['patient_id'],
                        'scan_id': metadata['scan_id'],
                        'planes': {},
                        'artifact_level': metadata['artifact_level']
                    }
                
                plane = metadata['plane']
                if plane not in scans[scan_id]['planes']:
                    scans[scan_id]['planes'][plane] = {}
                
                scans[scan_id]['planes'][plane]['artifact'] = str(nii_file)
    
    # Scan test data
    if use_test:
        # Try different possible folder names (with space or underscore)
        test_dir = None
        for possible_name in ["Testing_GroundTruthData", "Testing _GroundTruthData", "Testing_GroundTruthData_part1"]:
            test_path = dataset_dir / possible_name
            if test_path.exists():
                test_dir = test_path
                break
        
        if test_dir is None:
            # Try to find any folder starting with "Testing"
            for folder in dataset_dir.iterdir():
                if folder.is_dir() and "Testing" in folder.name and "GroundTruth" in folder.name:
                    test_dir = folder
                    logger.info(f"Found test data folder: {test_dir.name}")
                    break
        
        if test_dir and test_dir.exists():
            logger.info(f"Scanning test data: {test_dir}")
            # Use rglob to search recursively (handles nested folders)
            for nii_file in test_dir.rglob("*.nii.gz"):
                metadata = parse_kmar_filename(nii_file.name)
                scan_id = f"test_{metadata['full_id']}"
                
                if scan_id not in scans:
                    scans[scan_id] = {
                        'patient_id': metadata['patient_id'],
                        'scan_id': metadata['scan_id'],
                        'planes': {},
                        'artifact_level': metadata['artifact_level'],
                        'is_test': True
                    }
                
                plane = metadata['plane']
                scans[scan_id]['planes'][plane] = {
                    'ground_truth': str(nii_file),
                    'artifact': None
                }
    
    logger.info(f"Found {len(scans)} scans in dataset")
    return scans


def load_kmar_scan(
    scan_path: str,
    normalize: bool = True
) -> Tuple[np.ndarray, np.ndarray, Dict]:
    """
    Load a single KMAR NIfTI scan.
    
    Args:
        scan_path: Path to .nii.gz file
        normalize: Whether to normalize intensities to [0, 1]
    
    Returns:
        volume: 3D numpy array
        spacing: Voxel spacing (x, y, z) in mm
        metadata: Dictionary with scan metadata
    """
    scan_path = Path(scan_path)
    
    if not scan_path.exists():
        raise FileNotFoundError(f"Scan not found: {scan_path}")
    
    # Load NIfTI
    nii_img = nib.load(str(scan_path))
    volume = nii_img.get_fdata()
    
    # Get spacing
    spacing = np.array(nii_img.header.get_zooms()[:3])
    
    # Get orientation
    affine = nii_img.affine
    orientation = nib.aff2axcodes(affine)
    
    # Parse filename for metadata
    filename_metadata = parse_kmar_filename(scan_path.name)
    
    # Normalize if requested
    if normalize:
        v_min, v_max = volume.min(), volume.max()
        if v_max > v_min:
            volume = (volume - v_min) / (v_max - v_min)
    
    metadata = {
        'format': 'nifti',
        'source': 'kmar',
        'file_path': str(scan_path),
        'affine': affine,
        'orientation': orientation,
        'shape': volume.shape,
        **filename_metadata
    }
    
    logger.info(f"Loaded KMAR scan: {scan_path.name}, shape={volume.shape}, spacing={spacing}mm")
    
    return volume, spacing, metadata


def load_kmar_pair(
    artifact_path: str,
    ground_truth_path: str,
    normalize: bool = True
) -> Tuple[Tuple[np.ndarray, np.ndarray, Dict], Tuple[np.ndarray, np.ndarray, Dict]]:
    """
    Load paired artifact and ground truth images.
    
    Args:
        artifact_path: Path to artifact image
        ground_truth_path: Path to ground truth image
        normalize: Whether to normalize intensities
    
    Returns:
        Tuple of (artifact_data, ground_truth_data)
        Each is (volume, spacing, metadata)
    """
    artifact_data = load_kmar_scan(artifact_path, normalize=normalize)
    gt_data = load_kmar_scan(ground_truth_path, normalize=normalize)
    
    logger.info(f"Loaded paired images: artifact={Path(artifact_path).name}, gt={Path(ground_truth_path).name}")
    
    return artifact_data, gt_data


def get_kmar_scan_by_plane(
    scans: Dict[str, Dict],
    plane: str = 'sagittal',
    prefer_ground_truth: bool = True
) -> List[Tuple[str, str]]:
    """
    Get all scans for a specific imaging plane.
    
    Args:
        scans: Scans dictionary from scan_kmar_dataset()
        plane: Imaging plane ('sagittal', 'coronal', 'transection')
        prefer_ground_truth: Prefer ground truth over artifact images
    
    Returns:
        List of (scan_id, file_path) tuples
    """
    results = []
    
    for scan_id, scan_data in scans.items():
        if plane in scan_data['planes']:
            plane_data = scan_data['planes'][plane]
            
            # Choose file based on preference
            if prefer_ground_truth and plane_data.get('ground_truth'):
                file_path = plane_data['ground_truth']
            elif plane_data.get('artifact'):
                file_path = plane_data['artifact']
            else:
                continue
            
            results.append((scan_id, file_path))
    
    logger.info(f"Found {len(results)} scans for plane: {plane}")
    return results


def organize_kmar_for_pipeline(
    dataset_dir: Path,
    output_dir: Path,
    plane: str = 'sagittal',
    use_ground_truth: bool = True
) -> Path:
    """
    Organize KMAR dataset for Synovia Move pipeline.
    
    Creates a clean structure:
    data/kmar_knee/
        subject_001/
            knee_mri.nii.gz
        subject_002/
            knee_mri.nii.gz
    
    Args:
        dataset_dir: Root KMAR dataset directory
        output_dir: Output directory for organized data
        plane: Which plane to use (sagittal, coronal, transection)
        use_ground_truth: Use ground truth images (True) or artifact images (False)
    
    Returns:
        Path to organized data directory
    """
    dataset_dir = Path(dataset_dir)
    output_dir = Path(output_dir)
    
    organized_dir = output_dir / "kmar_knee"
    organized_dir.mkdir(parents=True, exist_ok=True)
    
    # Scan dataset
    scans = scan_kmar_dataset(
        dataset_dir,
        use_ground_truth=use_ground_truth,
        use_artifact=not use_ground_truth,
        use_test=False
    )
    
    # Get scans for specified plane
    plane_scans = get_kmar_scan_by_plane(scans, plane, prefer_ground_truth=use_ground_truth)
    
    # Copy/organize files
    import shutil
    for scan_id, file_path in plane_scans:
        subject_dir = organized_dir / f"subject_{scan_id}"
        subject_dir.mkdir(exist_ok=True)
        
        # Copy to standardized name
        dst_file = subject_dir / "knee_mri.nii.gz"
        if not dst_file.exists():
            shutil.copy2(file_path, dst_file)
            logger.info(f"Organized {scan_id} -> {dst_file}")
    
    logger.info(f"Organized {len(plane_scans)} scans to {organized_dir}")
    return organized_dir
