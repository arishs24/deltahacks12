"""
MODULE 8: RISK SCORING

Translates FEA stress results into interpretable mechanical risk metrics.
Computes safety scores and ranks movement scenarios.
"""

import numpy as np
from typing import Dict, List, Optional, Tuple
import logging

logger = logging.getLogger(__name__)

# Stress thresholds (MPa) - based on literature for cartilage damage
STRESS_THRESHOLDS = {
    'low_risk': 1.0,      # Below this: safe
    'moderate_risk': 2.0,  # Moderate risk of damage
    'high_risk': 3.0,      # High risk
    'critical': 5.0       # Critical - likely damage
}


def compute_risk_score(
    metrics: Dict,
    injury_context: Optional[Dict] = None,
    roi_weights: Optional[Dict[str, float]] = None
) -> Dict:
    """
    Compute mechanical safety/risk score from stress metrics.
    
    Args:
        metrics: Stress metrics dictionary from extract_stress_metrics
        injury_context: Dictionary with injury information (e.g., ACL deficiency severity)
        roi_weights: Dictionary mapping ROI names to importance weights
    
    Returns:
        Dictionary with risk scores:
            - overall_risk_score: 0-100 (0 = safe, 100 = critical)
            - risk_category: 'low', 'moderate', 'high', 'critical'
            - component_scores: Breakdown by stress type
            - recommendations: List of recommendations
    """
    logger.info("Computing risk score from stress metrics")
    
    # Base risk from peak stress
    peak_stress = metrics['peak_stress']
    peak_risk = _stress_to_risk(peak_stress)
    
    # Risk from mean stress
    mean_stress = metrics['mean_stress']
    mean_risk = _stress_to_risk(mean_stress) * 0.3  # Lower weight
    
    # Risk from high-stress volume fraction
    high_stress_frac = metrics.get('high_stress_fraction', 0.0)
    volume_risk = min(high_stress_frac * 100, 50.0)  # Cap at 50
    
    # Combine components
    overall_score = peak_risk * 0.5 + mean_risk * 0.2 + volume_risk * 0.3
    
    # Adjust for injury context
    if injury_context:
        injury_severity = injury_context.get('acl_deficiency', {}).get('severity', 0.0)
        # Increase risk score for injured knees
        injury_multiplier = 1.0 + injury_severity * 0.3
        overall_score *= injury_multiplier
        overall_score = min(overall_score, 100.0)  # Cap at 100
    
    # ROI-weighted risk (if ROIs provided)
    if roi_weights and 'roi_metrics' in metrics:
        roi_risk = 0.0
        total_weight = 0.0
        for roi_name, roi_metrics in metrics['roi_metrics'].items():
            weight = roi_weights.get(roi_name, 1.0)
            roi_peak = roi_metrics['peak_stress']
            roi_risk_component = _stress_to_risk(roi_peak) * weight
            roi_risk += roi_risk_component
            total_weight += weight
        
        if total_weight > 0:
            roi_risk = roi_risk / total_weight
            overall_score = overall_score * 0.7 + roi_risk * 0.3
    
    # Determine risk category
    if overall_score < 30:
        category = 'low'
    elif overall_score < 50:
        category = 'moderate'
    elif overall_score < 75:
        category = 'high'
    else:
        category = 'critical'
    
    # Generate recommendations
    recommendations = _generate_recommendations(overall_score, peak_stress, metrics)
    
    return {
        'overall_risk_score': overall_score,
        'risk_category': category,
        'component_scores': {
            'peak_stress_risk': peak_risk,
            'mean_stress_risk': mean_risk,
            'volume_risk': volume_risk
        },
        'recommendations': recommendations,
        'peak_stress': peak_stress,
        'mean_stress': mean_stress
    }


def _stress_to_risk(stress: float) -> float:
    """
    Convert stress value (MPa) to risk score (0-100).
    
    Uses piecewise linear mapping based on thresholds.
    """
    if stress < STRESS_THRESHOLDS['low_risk']:
        # Linear from 0 to 20
        return (stress / STRESS_THRESHOLDS['low_risk']) * 20.0
    elif stress < STRESS_THRESHOLDS['moderate_risk']:
        # Linear from 20 to 50
        return 20.0 + ((stress - STRESS_THRESHOLDS['low_risk']) / 
                      (STRESS_THRESHOLDS['moderate_risk'] - STRESS_THRESHOLDS['low_risk'])) * 30.0
    elif stress < STRESS_THRESHOLDS['high_risk']:
        # Linear from 50 to 75
        return 50.0 + ((stress - STRESS_THRESHOLDS['moderate_risk']) / 
                      (STRESS_THRESHOLDS['high_risk'] - STRESS_THRESHOLDS['moderate_risk'])) * 25.0
    else:
        # Linear from 75 to 100
        risk = 75.0 + ((stress - STRESS_THRESHOLDS['high_risk']) / 
                      (STRESS_THRESHOLDS['critical'] - STRESS_THRESHOLDS['high_risk'])) * 25.0
        return min(risk, 100.0)


def _generate_recommendations(
    risk_score: float,
    peak_stress: float,
    metrics: Dict
) -> List[str]:
    """Generate human-readable recommendations based on risk."""
    recommendations = []
    
    if risk_score >= 75:
        recommendations.append("CRITICAL: Avoid this movement pattern - high risk of cartilage damage")
        recommendations.append("Consider reducing load or flexion angle")
    elif risk_score >= 50:
        recommendations.append("HIGH RISK: Proceed with caution")
        recommendations.append("Monitor for pain or discomfort")
        recommendations.append("Consider reducing load by 20-30%")
    elif risk_score >= 30:
        recommendations.append("MODERATE RISK: Acceptable with proper form")
        recommendations.append("Gradually increase intensity")
    else:
        recommendations.append("LOW RISK: Movement appears safe")
        recommendations.append("Maintain current intensity")
    
    # Specific recommendations based on metrics
    if peak_stress > STRESS_THRESHOLDS['high_risk']:
        recommendations.append("Peak stress exceeds safe threshold - reduce load")
    
    high_stress_frac = metrics.get('high_stress_fraction', 0.0)
    if high_stress_frac > 0.1:
        recommendations.append(f"Large volume ({high_stress_frac*100:.1f}%) experiences high stress")
    
    return recommendations


def rank_scenarios(
    scenario_results: Dict[str, Dict]
) -> List[Tuple[str, float, str]]:
    """
    Rank movement scenarios by risk score.
    
    Args:
        scenario_results: Dictionary mapping scenario names to risk score dictionaries
    
    Returns:
        List of tuples (scenario_name, risk_score, category) sorted by risk (lowest first)
    """
    ranked = []
    
    for scenario_name, risk_dict in scenario_results.items():
        ranked.append((
            scenario_name,
            risk_dict['overall_risk_score'],
            risk_dict['risk_category']
        ))
    
    # Sort by risk score (ascending - lowest risk first)
    ranked.sort(key=lambda x: x[1])
    
    logger.info(f"Ranked {len(ranked)} scenarios")
    return ranked


def compare_scenarios(
    baseline_results: Dict,
    comparison_results: Dict
) -> Dict:
    """
    Compare two scenarios and quantify differences.
    
    Args:
        baseline_results: Risk score dictionary for baseline scenario
        comparison_results: Risk score dictionary for comparison scenario
    
    Returns:
        Dictionary with comparison metrics:
            - risk_difference: Change in risk score
            - stress_difference: Change in peak/mean stress
            - relative_risk_change: Percentage change
            - recommendation: Which scenario is safer
    """
    baseline_score = baseline_results['overall_risk_score']
    comparison_score = comparison_results['overall_risk_score']
    
    risk_difference = comparison_score - baseline_score
    relative_change = (risk_difference / baseline_score * 100.0) if baseline_score > 0 else 0.0
    
    safer = 'baseline' if baseline_score < comparison_score else 'comparison'
    
    return {
        'risk_difference': risk_difference,
        'relative_risk_change_percent': relative_change,
        'stress_difference': {
            'peak': comparison_results['peak_stress'] - baseline_results['peak_stress'],
            'mean': comparison_results['mean_stress'] - baseline_results['mean_stress']
        },
        'safer_scenario': safer,
        'recommendation': f"Use {safer} scenario (risk score: {baseline_score if safer == 'baseline' else comparison_score:.1f} vs {comparison_score if safer == 'baseline' else baseline_score:.1f})"
    }
