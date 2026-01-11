"""
MODULE 5: INJURY MODELING

Encodes ACL tear mechanically by modifying joint constraints and allowing
increased anterior tibial translation. Does NOT model full ligament geometry.
"""

import numpy as np
from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)


def apply_acl_deficiency(
    model: Dict,
    severity: float = 1.0,
    constraint_stiffness_reduction: float = 0.1
) -> Dict:
    """
    Apply ACL deficiency to the knee model.
    
    Args:
        model: Dictionary containing FEA model data (meshes, materials, constraints)
        severity: Severity of ACL tear (0.0 = intact, 1.0 = complete tear)
        constraint_stiffness_reduction: Factor by which to reduce constraint stiffness
    
    Returns:
        Modified model dictionary with ACL deficiency encoded
    
    Note:
        This function modifies joint constraints rather than modeling ligament geometry.
        In a full FEA model, ACL would be represented as:
        - Reduced constraint stiffness in anterior-posterior direction
        - Allowed increased anterior tibial translation
        - Modified contact mechanics due to altered joint kinematics
    """
    logger.info(f"Applying ACL deficiency: severity={severity:.2f}")
    
    modified_model = model.copy()
    
    # Initialize injury parameters if not present
    if 'injury' not in modified_model:
        modified_model['injury'] = {}
    
    modified_model['injury']['acl_deficiency'] = {
        'severity': severity,
        'constraint_stiffness_reduction': constraint_stiffness_reduction,
        'anterior_translation_allowance': severity * 5.0  # mm of additional translation
    }
    
    # Modify constraints
    # In a real implementation, this would modify:
    # 1. Joint constraint stiffness matrices
    # 2. Boundary conditions to allow anterior translation
    # 3. Contact definitions to account for altered kinematics
    
    if 'constraints' not in modified_model:
        modified_model['constraints'] = {}
    
    # Anterior-posterior constraint (reduced for ACL deficiency)
    original_stiffness = modified_model['constraints'].get('ap_stiffness', 100.0)  # N/mm
    modified_stiffness = original_stiffness * (1.0 - severity * (1.0 - constraint_stiffness_reduction))
    
    modified_model['constraints']['ap_stiffness'] = modified_stiffness
    modified_model['constraints']['ap_stiffness_original'] = original_stiffness
    
    # Medial-lateral constraint (may also be affected)
    ml_stiffness = modified_model['constraints'].get('ml_stiffness', 50.0)
    modified_model['constraints']['ml_stiffness'] = ml_stiffness * (1.0 - severity * 0.3)
    
    # Rotational constraint (internal rotation may increase)
    rot_stiffness = modified_model['constraints'].get('rotation_stiffness', 200.0)
    modified_model['constraints']['rotation_stiffness'] = rot_stiffness * (1.0 - severity * 0.2)
    
    logger.info(f"Modified constraints: AP stiffness = {modified_stiffness:.2f} N/mm (original: {original_stiffness:.2f})")
    
    return modified_model


def compute_injury_mechanical_effects(
    model: Dict,
    baseline_stress: np.ndarray,
    injured_stress: np.ndarray
) -> Dict:
    """
    Compute mechanical effects of injury on stress distribution.
    
    Args:
        model: Model dictionary with injury parameters
        baseline_stress: Stress field from intact model
        injured_stress: Stress field from injured model
    
    Returns:
        Dictionary with injury effects:
            - stress_increase: Absolute increase in stress
            - stress_increase_percent: Percentage increase
            - high_stress_regions: Regions with >20% stress increase
            - peak_stress_ratio: Ratio of peak stresses
    """
    effects = {}
    
    # Absolute increase
    stress_increase = injured_stress - baseline_stress
    effects['stress_increase'] = stress_increase
    effects['stress_increase_mean'] = np.mean(stress_increase)
    effects['stress_increase_max'] = np.max(stress_increase)
    
    # Percentage increase (avoid division by zero)
    with np.errstate(divide='ignore', invalid='ignore'):
        stress_increase_percent = np.where(
            baseline_stress > 0,
            (stress_increase / baseline_stress) * 100.0,
            0.0
        )
    effects['stress_increase_percent'] = stress_increase_percent
    effects['stress_increase_percent_mean'] = np.mean(stress_increase_percent[baseline_stress > 0])
    
    # High-stress regions (threshold: 20% increase)
    high_stress_mask = stress_increase_percent > 20.0
    effects['high_stress_regions'] = high_stress_mask
    effects['high_stress_volume_fraction'] = np.sum(high_stress_mask) / len(baseline_stress)
    
    # Peak stress ratio
    peak_baseline = np.max(baseline_stress)
    peak_injured = np.max(injured_stress)
    effects['peak_stress_ratio'] = peak_injured / peak_baseline if peak_baseline > 0 else 0.0
    
    return effects


def get_injury_parameters(model: Dict) -> Dict:
    """
    Retrieve injury parameters from model.
    
    Args:
        model: Model dictionary
    
    Returns:
        Dictionary of injury parameters
    """
    return model.get('injury', {})
