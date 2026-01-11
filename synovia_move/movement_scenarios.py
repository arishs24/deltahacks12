"""
MODULE 6: MOVEMENT SCENARIOS

Defines squat movement scenarios parametrically with knee flexion angle,
compressive load, load direction, and stance bias. Translates to FEA boundary conditions.
"""

import numpy as np
from typing import Dict, Tuple, Optional
import logging

logger = logging.getLogger(__name__)


def define_squat_scenario(
    angle: float,
    load: float,
    stance_bias: float = 0.0,
    load_direction: Optional[np.ndarray] = None,
    anterior_posterior_force: float = 0.0
) -> Dict:
    """
    Define a squat movement scenario with boundary conditions for FEA.
    
    Args:
        angle: Knee flexion angle in degrees (0 = full extension, 90 = 90° flexion)
        load: Compressive load in Newtons (body weight + additional load)
        stance_bias: Medial-lateral load bias (-1.0 = fully lateral, 0.0 = balanced, 1.0 = fully medial)
        load_direction: 3D load direction vector (None = vertical)
        anterior_posterior_force: Anterior-posterior force component in N (positive = anterior)
    
    Returns:
        Dictionary with scenario parameters and boundary conditions:
            - angle: Flexion angle
            - load: Total load
            - boundary_conditions: Dict with BC definitions
            - contact_settings: Contact mechanics parameters
    """
    logger.info(f"Defining squat scenario: angle={angle}°, load={load}N, bias={stance_bias:.2f}")
    
    # Default load direction (vertical, downward)
    if load_direction is None:
        load_direction = np.array([0.0, 0.0, -1.0])  # Negative Z (downward)
    else:
        load_direction = np.array(load_direction)
        load_direction = load_direction / np.linalg.norm(load_direction)  # Normalize
    
    # Compute load components
    vertical_load = load * load_direction[2]  # Z component
    medial_lateral_load = load * stance_bias * 0.3  # 30% of total load can shift medially/laterally
    ap_load = anterior_posterior_force
    
    # Boundary conditions
    # In FEA, these translate to:
    # - Fixed constraints on bone surfaces (femur/tibia)
    # - Applied forces on contact surfaces
    # - Displacement constraints based on flexion angle
    
    boundary_conditions = {
        'femur': {
            'fixed_dof': [1, 1, 1, 1, 1, 1],  # All DOF fixed (rigid body assumption)
            'fixed_nodes': 'proximal',  # Proximal femur fixed
            'applied_force': None  # No force on femur (it's fixed)
        },
        'tibia': {
            'fixed_dof': [0, 0, 0, 0, 0, 0],  # No fixed DOF (tibia moves)
            'applied_force': {
                'direction': load_direction,
                'magnitude': load,
                'components': {
                    'vertical': vertical_load,
                    'medial_lateral': medial_lateral_load,
                    'anterior_posterior': ap_load
                }
            },
            'displacement_constraints': {
                'flexion_angle': angle,
                'allowed_translation': {
                    'anterior': True,  # ACL deficiency allows this
                    'medial_lateral': True,
                    'vertical': False  # Constrained by contact
                }
            }
        },
        'cartilage': {
            'contact': True,
            'friction': 0.0,  # Frictionless contact
            'penalty_stiffness': 1000.0  # N/mm
        }
    }
    
    # Contact settings
    contact_settings = {
        'type': 'frictionless',
        'friction_coefficient': 0.0,
        'penalty_method': True,
        'penalty_stiffness': 1000.0,
        'contact_pairs': [
            ('femoral_cartilage', 'tibial_cartilage')
        ]
    }
    
    scenario = {
        'angle': angle,
        'load': load,
        'stance_bias': stance_bias,
        'load_direction': load_direction.tolist(),
        'anterior_posterior_force': anterior_posterior_force,
        'boundary_conditions': boundary_conditions,
        'contact_settings': contact_settings,
        'scenario_id': f"squat_{angle:.0f}deg_{load:.0f}N_bias{stance_bias:.2f}"
    }
    
    return scenario


def create_rehabilitation_protocol(
    protocol_name: str,
    phases: list
) -> Dict:
    """
    Create a rehabilitation protocol with multiple movement scenarios.
    
    Args:
        protocol_name: Name of the protocol
        phases: List of phase dictionaries, each with:
            - phase_name: Name of phase
            - scenarios: List of scenario dictionaries from define_squat_scenario
            - duration_weeks: Duration of phase
            - frequency: Sessions per week
    
    Returns:
        Protocol dictionary
    """
    protocol = {
        'name': protocol_name,
        'phases': phases,
        'total_duration_weeks': sum(p.get('duration_weeks', 0) for p in phases)
    }
    
    logger.info(f"Created protocol '{protocol_name}' with {len(phases)} phases")
    return protocol


def generate_standard_scenarios() -> Dict[str, Dict]:
    """
    Generate a set of standard movement scenarios for comparison.
    
    Returns:
        Dictionary mapping scenario names to scenario dictionaries
    """
    scenarios = {}
    
    # Light squat (early rehab)
    scenarios['light_squat'] = define_squat_scenario(
        angle=30.0,
        load=500.0,  # ~50% body weight
        stance_bias=0.0
    )
    
    # Moderate squat
    scenarios['moderate_squat'] = define_squat_scenario(
        angle=60.0,
        load=1000.0,  # ~100% body weight
        stance_bias=0.0
    )
    
    # Deep squat
    scenarios['deep_squat'] = define_squat_scenario(
        angle=90.0,
        load=1500.0,  # ~150% body weight
        stance_bias=0.0
    )
    
    # Lateral bias squat (compensatory pattern)
    scenarios['lateral_bias_squat'] = define_squat_scenario(
        angle=60.0,
        load=1000.0,
        stance_bias=-0.5  # Lateral shift
    )
    
    # Medial bias squat
    scenarios['medial_bias_squat'] = define_squat_scenario(
        angle=60.0,
        load=1000.0,
        stance_bias=0.5  # Medial shift
    )
    
    # Anterior load (ACL stress test)
    scenarios['anterior_load_squat'] = define_squat_scenario(
        angle=60.0,
        load=1000.0,
        stance_bias=0.0,
        anterior_posterior_force=200.0  # Anterior force
    )
    
    logger.info(f"Generated {len(scenarios)} standard scenarios")
    return scenarios
