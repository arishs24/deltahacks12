"""
MODULE 2: SEGMENTATION (GPU)

Performs knee anatomy segmentation using MONAI models.
Segments: femur, tibia, femoral cartilage, tibial cartilage.
Includes postprocessing for clean masks and validation.
"""

import numpy as np
from typing import Dict, Optional, Union
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

# Try to import required libraries
try:
    import torch
    TORCH_AVAILABLE = True
except (ImportError, OSError) as e:
    TORCH_AVAILABLE = False
    logger.error(f"PyTorch not available: {e}. Segmentation requires PyTorch.")
    logger.error("Try: pip install torch --index-url https://download.pytorch.org/whl/cpu")
    logger.error("Or set: $env:KMP_DUPLICATE_LIB_OK='TRUE' to fix OpenMP conflicts")
    raise

try:
    import monai
    from monai.networks.nets import UNet
    from monai.transforms import (
        Compose,
        LoadImaged,
        EnsureChannelFirstd,
        Spacingd,
        Orientationd,
        NormalizeIntensityd,
        ToTensord,
        Activationsd,
        AsDiscreted,
    )
    from monai.inferers import sliding_window_inference
    MONAI_AVAILABLE = True
except ImportError as e:
    MONAI_AVAILABLE = False
    logger.error(f"MONAI not available: {e}. Install with: pip install monai")
    raise

# Label mapping for knee structures
LABEL_MAP = {
    'background': 0,
    'femur': 1,
    'tibia': 2,
    'femoral_cartilage': 3,
    'tibial_cartilage': 4,
    'patella': 5  # Optional
}


def segment_knee(
    volume: np.ndarray,
    spacing: np.ndarray,
    model_path: Optional[Union[str, Path]] = None,
    device: Optional[str] = None,
    postprocess: bool = True,
    validate: bool = True
) -> Dict[str, np.ndarray]:
    """
    Segment knee anatomy from MRI volume using MONAI UNet.
    
    Args:
        volume: Preprocessed 3D MRI volume (normalized, shape H x W x D)
        spacing: Voxel spacing (x, y, z) in mm
        model_path: Path to pretrained model weights (None = use default architecture)
        device: 'cuda' or 'cpu' (auto-detected if None)
        postprocess: Whether to apply postprocessing (hole filling, smoothing)
        validate: Whether to validate segmentation masks (raises on failure)
    
    Returns:
        Dictionary with keys:
            - 'femur': Binary mask
            - 'tibia': Binary mask
            - 'femoral_cartilage': Binary mask
            - 'tibial_cartilage': Binary mask
            - 'combined_label': Multi-label volume (0=bg, 1=femur, 2=tibia, 3=fc, 4=tc)
            - 'confidence': Confidence map (optional)
    
    Raises:
        ValueError: If segmentation validation fails
        RuntimeError: If model inference fails
    """
    if not TORCH_AVAILABLE:
        raise RuntimeError("PyTorch is required for segmentation")
    if not MONAI_AVAILABLE:
        raise RuntimeError("MONAI is required for segmentation")
    
    if device is None:
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    logger.info(f"Segmenting knee on device: {device}")
    
    # Load or create model
    model = _load_or_create_model(model_path, device)
    
    # Preprocess volume for MONAI
    preprocessed = _preprocess_volume(volume, spacing)
    
    # Run inference
    try:
        with torch.no_grad():
            model.eval()
            predictions = sliding_window_inference(
                preprocessed,
                roi_size=(96, 96, 96),  # Sliding window size
                sw_batch_size=4,
                predictor=model,
                overlap=0.5,
                mode='gaussian'
            )
            
            # Apply softmax and get discrete labels
            predictions = torch.softmax(predictions, dim=1)
            predictions = torch.argmax(predictions, dim=1, keepdim=True)
            predictions = predictions.squeeze().cpu().numpy()
    except Exception as e:
        raise RuntimeError(f"Model inference failed: {e}")
    
    # Convert predictions to masks
    masks = _predictions_to_masks(predictions)
    
    if postprocess:
        masks = _postprocess_masks(masks)
    
    # Validate segmentation
    if validate:
        _validate_segmentation(masks, volume.shape, volume.size)
    
    # Build combined label volume
    combined_label = np.zeros_like(volume, dtype=np.uint8)
    combined_label[masks['femur']] = LABEL_MAP['femur']
    combined_label[masks['tibia']] = LABEL_MAP['tibia']
    combined_label[masks['femoral_cartilage']] = LABEL_MAP['femoral_cartilage']
    combined_label[masks['tibial_cartilage']] = LABEL_MAP['tibial_cartilage']
    
    logger.info("Segmentation complete and validated")
    return {
        'femur': masks['femur'],
        'tibia': masks['tibia'],
        'femoral_cartilage': masks['femoral_cartilage'],
        'tibial_cartilage': masks['tibial_cartilage'],
        'combined_label': combined_label
    }


def _load_or_create_model(model_path: Optional[Union[str, Path]], device: str):
    """Load pretrained model or create default architecture."""
    if model_path is not None and Path(model_path).exists():
        logger.info(f"Loading model from {model_path}")
        model = UNet(
            spatial_dims=3,
            in_channels=1,
            out_channels=5,  # background + 4 structures
            channels=(16, 32, 64, 128, 256),
            strides=(2, 2, 2, 2),
            num_res_units=2,
        )
        model.load_state_dict(torch.load(model_path, map_location=device))
        model.to(device)
        return model
    else:
        logger.warning("No model path provided, using untrained default architecture")
        logger.warning("For production use, provide a trained model path")
        # Create default architecture (untrained - will need training)
        model = UNet(
            spatial_dims=3,
            in_channels=1,
            out_channels=5,
            channels=(16, 32, 64, 128, 256),
            strides=(2, 2, 2, 2),
            num_res_units=2,
        )
        model.to(device)
        return model


def _preprocess_volume(volume: np.ndarray, spacing: np.ndarray) -> torch.Tensor:
    """Preprocess volume for MONAI inference."""
    # Normalize intensity
    volume_norm = (volume - volume.mean()) / (volume.std() + 1e-8)
    
    # Add channel dimension and batch dimension
    volume_tensor = torch.from_numpy(volume_norm).float()
    volume_tensor = volume_tensor.unsqueeze(0).unsqueeze(0)  # [1, 1, H, W, D]
    
    return volume_tensor


def _predictions_to_masks(predictions: np.ndarray) -> Dict[str, np.ndarray]:
    """Convert model predictions to binary masks."""
    masks = {
        'femur': (predictions == LABEL_MAP['femur']),
        'tibia': (predictions == LABEL_MAP['tibia']),
        'femoral_cartilage': (predictions == LABEL_MAP['femoral_cartilage']),
        'tibial_cartilage': (predictions == LABEL_MAP['tibial_cartilage']),
    }
    return masks


def _postprocess_masks(masks: Dict[str, np.ndarray]) -> Dict[str, np.ndarray]:
    """
    Postprocess segmentation masks: fill holes, remove islands, smooth.
    
    Args:
        masks: Dictionary of binary masks
    
    Returns:
        Postprocessed masks
    """
    from scipy import ndimage
    
    processed = {}
    
    for name, mask in masks.items():
        # Convert to uint8 for morphological operations
        mask_uint8 = mask.astype(np.uint8)
        
        # Fill holes (small internal cavities)
        mask_uint8 = ndimage.binary_fill_holes(mask_uint8).astype(np.uint8)
        
        # Remove small islands (connected components)
        labeled, num_features = ndimage.label(mask_uint8)
        if num_features > 1:
            # Keep only largest component
            sizes = ndimage.sum(mask_uint8, labeled, range(1, num_features + 1))
            largest_label = np.argmax(sizes) + 1
            mask_uint8 = (labeled == largest_label).astype(np.uint8)
        
        # Smooth with morphological closing/opening
        structure = ndimage.generate_binary_structure(3, 1)  # 6-connectivity
        mask_uint8 = ndimage.binary_closing(mask_uint8, structure, iterations=1).astype(np.uint8)
        mask_uint8 = ndimage.binary_opening(mask_uint8, structure, iterations=1).astype(np.uint8)
        
        processed[name] = mask_uint8.astype(bool)
    
    logger.info("Postprocessed masks: filled holes, removed islands, smoothed")
    return processed


def _validate_segmentation(
    masks: Dict[str, np.ndarray],
    volume_shape: tuple,
    total_voxels: int
) -> None:
    """
    Validate segmentation masks.
    
    Raises ValueError if validation fails.
    
    Args:
        masks: Dictionary of binary masks
        volume_shape: Shape of original volume
        total_voxels: Total number of voxels in volume
    
    Raises:
        ValueError: If any validation check fails
    """
    errors = []
    
    # Check each mask
    for name, mask in masks.items():
        # Check shape
        if mask.shape != volume_shape:
            errors.append(f"{name}: mask shape {mask.shape} != volume shape {volume_shape}")
        
        # Check coverage (should be reasonable, not too small or too large)
        coverage = np.sum(mask) / total_voxels
        
        # Reasonable coverage ranges (adjust based on anatomy)
        min_coverage = 0.001  # 0.1% minimum
        max_coverage = 0.3    # 30% maximum
        
        if coverage < min_coverage:
            errors.append(f"{name}: coverage {coverage:.4f} < minimum {min_coverage:.4f}")
        elif coverage > max_coverage:
            errors.append(f"{name}: coverage {coverage:.4f} > maximum {max_coverage:.4f}")
        
        # Check connectivity (should have reasonable number of connected components)
        from scipy import ndimage
        labeled, num_components = ndimage.label(mask)
        if num_components > 10:  # Too many disconnected regions
            errors.append(f"{name}: {num_components} disconnected components (expected < 10)")
        
        # Check that mask is not empty
        if np.sum(mask) == 0:
            errors.append(f"{name}: mask is empty")
    
    # Check overlap between structures (cartilage should be near bones)
    femur_mask = masks['femur']
    tibia_mask = masks['tibia']
    fc_mask = masks['femoral_cartilage']
    tc_mask = masks['tibial_cartilage']
    
    # Cartilage should be near corresponding bone
    from scipy import ndimage
    femur_dilated = ndimage.binary_dilation(femur_mask, iterations=5)
    tibia_dilated = ndimage.binary_dilation(tibia_mask, iterations=5)
    
    fc_near_femur = np.sum(fc_mask & femur_dilated) / (np.sum(fc_mask) + 1e-8)
    tc_near_tibia = np.sum(tc_mask & tibia_dilated) / (np.sum(tc_mask) + 1e-8)
    
    if fc_near_femur < 0.5:  # At least 50% of FC should be near femur
        errors.append(f"femoral_cartilage: only {fc_near_femur:.2%} near femur (expected > 50%)")
    
    if tc_near_tibia < 0.5:  # At least 50% of TC should be near tibia
        errors.append(f"tibial_cartilage: only {tc_near_tibia:.2%} near tibia (expected > 50%)")
    
    if errors:
        error_msg = "Segmentation validation failed:\n" + "\n".join(f"  - {e}" for e in errors)
        logger.error(error_msg)
        raise ValueError(error_msg)
    
    logger.info("Segmentation validation passed")


def load_segmentation_model(model_path: Union[str, Path], device: str = 'cuda'):
    """
    Load pretrained segmentation model (MONAI UNet).
    
    Args:
        model_path: Path to model weights
        device: Device to load model on
    
    Returns:
        Loaded model ready for inference
    """
    if not MONAI_AVAILABLE:
        raise RuntimeError("MONAI is required for segmentation")
    
    model = UNet(
        spatial_dims=3,
        in_channels=1,
        out_channels=5,
        channels=(16, 32, 64, 128, 256),
        strides=(2, 2, 2, 2),
        num_res_units=2,
    )
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model
