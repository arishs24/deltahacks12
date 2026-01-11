"""
MODULE 9: LONGITUDINAL TRACKING

Tracks mechanical exposure over time by mapping logged workouts to scenario IDs,
accumulating mechanical dose, and tracking trends per cartilage region.
"""

import numpy as np
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from pathlib import Path
import json
import logging

logger = logging.getLogger(__name__)


class MechanicalDoseTracker:
    """
    Tracks cumulative mechanical dose (stress-time integrals) over rehabilitation.
    """
    
    def __init__(self, patient_id: str, storage_path: Optional[Path] = None):
        """
        Initialize tracker for a patient.
        
        Args:
            patient_id: Unique patient identifier
            storage_path: Path to store tracking data (None = in-memory only)
        """
        self.patient_id = patient_id
        self.storage_path = Path(storage_path) if storage_path else None
        
        self.sessions = []  # List of workout sessions
        self.cumulative_dose = {}  # Cumulative dose per ROI
        self.stress_history = []  # Time series of stress metrics
        
        if self.storage_path:
            self.storage_path.mkdir(parents=True, exist_ok=True)
            self._load_history()
    
    
    def log_workout(
        self,
        session_date: datetime,
        scenario_id: str,
        duration_minutes: float,
        stress_metrics: Dict,
        notes: Optional[str] = None
    ):
        """
        Log a workout session with associated stress metrics.
        
        Args:
            session_date: Date/time of workout
            scenario_id: ID of movement scenario used
            duration_minutes: Duration of workout in minutes
            stress_metrics: Stress metrics from FEA (from extract_stress_metrics)
            notes: Optional notes about the session
        """
        session = {
            'date': session_date.isoformat(),
            'scenario_id': scenario_id,
            'duration_minutes': duration_minutes,
            'stress_metrics': stress_metrics,
            'notes': notes
        }
        
        self.sessions.append(session)
        
        # Update cumulative dose
        self._update_mechanical_dose(session)
        
        # Store stress history
        self.stress_history.append({
            'date': session_date.isoformat(),
            'peak_stress': stress_metrics['peak_stress'],
            'mean_stress': stress_metrics['mean_stress'],
            'scenario_id': scenario_id
        })
        
        logger.info(f"Logged workout: {scenario_id} on {session_date.date()}")
        
        if self.storage_path:
            self._save_history()
    
    
    def _update_mechanical_dose(self, session: Dict):
        """
        Update cumulative mechanical dose based on session.
        
        Mechanical dose = integral of stress over time
        Approximated as: mean_stress * duration
        """
        duration_hours = session['duration_minutes'] / 60.0
        mean_stress = session['stress_metrics']['mean_stress']
        peak_stress = session['stress_metrics']['peak_stress']
        
        # Dose = stress * time (MPa-hours)
        dose_contribution = mean_stress * duration_hours
        peak_dose_contribution = peak_stress * duration_hours
        
        # Update cumulative dose (overall)
        if 'overall' not in self.cumulative_dose:
            self.cumulative_dose['overall'] = {
                'total_dose': 0.0,
                'peak_dose': 0.0,
                'total_time_hours': 0.0,
                'sessions': 0
            }
        
        self.cumulative_dose['overall']['total_dose'] += dose_contribution
        self.cumulative_dose['overall']['peak_dose'] += peak_dose_contribution
        self.cumulative_dose['overall']['total_time_hours'] += duration_hours
        self.cumulative_dose['overall']['sessions'] += 1
        
        # Update ROI-specific dose if available
        if 'roi_metrics' in session['stress_metrics']:
            for roi_name, roi_data in session['stress_metrics']['roi_metrics'].items():
                if roi_name not in self.cumulative_dose:
                    self.cumulative_dose[roi_name] = {
                        'total_dose': 0.0,
                        'peak_dose': 0.0,
                        'total_time_hours': 0.0,
                        'sessions': 0
                    }
                
                roi_mean_stress = roi_data['mean_stress']
                roi_peak_stress = roi_data['peak_stress']
                
                self.cumulative_dose[roi_name]['total_dose'] += roi_mean_stress * duration_hours
                self.cumulative_dose[roi_name]['peak_dose'] += roi_peak_stress * duration_hours
                self.cumulative_dose[roi_name]['total_time_hours'] += duration_hours
                self.cumulative_dose[roi_name]['sessions'] += 1
    
    
    def get_cumulative_dose(self, roi: Optional[str] = None) -> Dict:
        """
        Get cumulative mechanical dose.
        
        Args:
            roi: ROI name (None = overall)
        
        Returns:
            Dictionary with dose metrics
        """
        if roi is None:
            roi = 'overall'
        
        return self.cumulative_dose.get(roi, {
            'total_dose': 0.0,
            'peak_dose': 0.0,
            'total_time_hours': 0.0,
            'sessions': 0
        })
    
    
    def get_stress_trends(
        self,
        days: Optional[int] = None,
        roi: Optional[str] = None
    ) -> Dict:
        """
        Get stress trends over time.
        
        Args:
            days: Number of days to look back (None = all)
            roi: ROI name (None = overall)
        
        Returns:
            Dictionary with trend metrics:
                - dates: List of dates
                - peak_stress: Time series of peak stress
                - mean_stress: Time series of mean stress
                - trend_slope: Linear trend slope (MPa/day)
                - trend_direction: 'increasing', 'decreasing', 'stable'
        """
        if days:
            cutoff_date = datetime.now() - timedelta(days=days)
            history = [h for h in self.stress_history 
                      if datetime.fromisoformat(h['date']) >= cutoff_date]
        else:
            history = self.stress_history
        
        if not history:
            return {
                'dates': [],
                'peak_stress': [],
                'mean_stress': [],
                'trend_slope': 0.0,
                'trend_direction': 'no_data'
            }
        
        dates = [datetime.fromisoformat(h['date']) for h in history]
        peak_stress = [h['peak_stress'] for h in history]
        mean_stress = [h['mean_stress'] for h in history]
        
        # Compute linear trend
        if len(dates) > 1:
            days_since_start = [(d - dates[0]).days for d in dates]
            if max(days_since_start) > 0:
                trend_slope_peak = np.polyfit(days_since_start, peak_stress, 1)[0]
                trend_slope_mean = np.polyfit(days_since_start, mean_stress, 1)[0]
                trend_slope = (trend_slope_peak + trend_slope_mean) / 2.0
            else:
                trend_slope = 0.0
        else:
            trend_slope = 0.0
        
        # Determine direction
        threshold = 0.01  # MPa/day
        if trend_slope > threshold:
            direction = 'increasing'
        elif trend_slope < -threshold:
            direction = 'decreasing'
        else:
            direction = 'stable'
        
        return {
            'dates': [d.isoformat() for d in dates],
            'peak_stress': peak_stress,
            'mean_stress': mean_stress,
            'trend_slope': trend_slope,
            'trend_direction': direction
        }
    
    
    def _save_history(self):
        """Save tracking history to disk."""
        if not self.storage_path:
            return
        
        data = {
            'patient_id': self.patient_id,
            'sessions': self.sessions,
            'cumulative_dose': self.cumulative_dose,
            'stress_history': self.stress_history
        }
        
        file_path = self.storage_path / f"{self.patient_id}_tracking.json"
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
    
    
    def _load_history(self):
        """Load tracking history from disk."""
        if not self.storage_path:
            return
        
        file_path = self.storage_path / f"{self.patient_id}_tracking.json"
        if file_path.exists():
            with open(file_path, 'r') as f:
                data = json.load(f)
                self.sessions = data.get('sessions', [])
                self.cumulative_dose = data.get('cumulative_dose', {})
                self.stress_history = data.get('stress_history', [])


def log_workout(
    tracker: MechanicalDoseTracker,
    session_date: datetime,
    scenario_id: str,
    duration_minutes: float,
    stress_metrics: Dict,
    notes: Optional[str] = None
):
    """
    Convenience function to log a workout session.
    
    See MechanicalDoseTracker.log_workout for details.
    """
    tracker.log_workout(session_date, scenario_id, duration_minutes, stress_metrics, notes)


def update_mechanical_dose(tracker: MechanicalDoseTracker):
    """
    Recompute cumulative mechanical dose from all sessions.
    
    Useful if dose calculation logic changes.
    """
    tracker.cumulative_dose = {}
    for session in tracker.sessions:
        tracker._update_mechanical_dose(session)
    
    if tracker.storage_path:
        tracker._save_history()
