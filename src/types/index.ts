export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  injuryType: string;
  affectedLigaments: string[];
  rehabStage: 'Initial' | 'Intermediate' | 'Advanced' | 'Maintenance';
  simulationStatus: 'complete' | 'pending' | 'processing';
}

export interface BiomechanicsData {
  timestamp: number;
  ligamentStress: number;
  strain: number;
  stiffness: number;
}

export interface Exercise {
  id: string;
  name: string;
  targetTissue: string;
  loadLevel: 'Low' | 'Moderate' | 'High';
  safetyStatus: 'safe' | 'caution';
  justification: string;
  duration: string;
  sets: number;
  reps: number;
}

export type GaitScenario = 'standing' | 'walking' | 'running';
export type TissueType = 'ligaments' | 'cartilage' | 'bone' | 'tendons';
