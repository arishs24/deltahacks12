import { Patient, Exercise, BiomechanicsData } from '@/types/clinical';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 34,
    gender: 'Male',
    height: 180, // cm
    weight: 82, // kg
    injuryType: 'ACL Tear (Grade II)',
    affectedLigaments: ['ACL', 'MCL'],
    rehabStage: 'Intermediate',
    simulationStatus: 'complete',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    height: 165, // cm
    weight: 62, // kg
    injuryType: 'Meniscal Tear',
    affectedLigaments: ['ACL'],
    rehabStage: 'Initial',
    simulationStatus: 'complete',
  },
  {
    id: '3',
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    height: 175, // cm
    weight: 78, // kg
    injuryType: 'PCL Sprain (Grade I)',
    affectedLigaments: ['PCL'],
    rehabStage: 'Advanced',
    simulationStatus: 'pending',
  },
  {
    id: '4',
    name: 'Emily Davis',
    age: 31,
    gender: 'Female',
    height: 170, // cm
    weight: 68, // kg
    injuryType: 'Multiple Ligament Injury',
    affectedLigaments: ['ACL', 'PCL', 'MCL'],
    rehabStage: 'Initial',
    simulationStatus: 'processing',
  },
];

export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Quadriceps Isometric Contraction',
    targetTissue: 'Quadriceps Tendon',
    loadLevel: 'Low',
    safetyStatus: 'safe',
    justification: 'Low-load exercise to maintain muscle activation without excessive stress on healing ACL graft. Evidence supports early isometric exercises in ACL rehabilitation protocols.',
    duration: '5-10 seconds hold',
    sets: 3,
    reps: 10,
  },
  {
    id: '2',
    name: 'Straight Leg Raise',
    targetTissue: 'Quadriceps, Hip Flexors',
    loadLevel: 'Low',
    safetyStatus: 'safe',
    justification: 'Closed-chain exercise that minimizes anterior tibial translation while strengthening quadriceps. Recommended in early-phase ACL rehabilitation.',
    duration: '2 seconds up, 2 seconds down',
    sets: 3,
    reps: 15,
  },
  {
    id: '3',
    name: 'Heel Slides',
    targetTissue: 'Hamstrings, Flexors',
    loadLevel: 'Low',
    safetyStatus: 'safe',
    justification: 'Active range of motion exercise that promotes knee flexion without weight-bearing stress. Appropriate for current rehabilitation stage.',
    duration: 'Slow controlled movement',
    sets: 3,
    reps: 20,
  },
  {
    id: '4',
    name: 'Single-Leg Balance',
    targetTissue: 'Proprioceptors, Stabilizers',
    loadLevel: 'Moderate',
    safetyStatus: 'caution',
    justification: 'Proprioceptive training essential for ACL recovery. Monitor for excessive knee valgus or instability. Progress with eyes closed once stable.',
    duration: '30-60 seconds',
    sets: 3,
    reps: 1,
  },
  {
    id: '5',
    name: 'Wall Sits',
    targetTissue: 'Quadriceps, Glutes',
    loadLevel: 'Moderate',
    safetyStatus: 'caution',
    justification: 'Isometric strengthening exercise. Maintain knee flexion at 60-90 degrees. Avoid if patient reports anterior knee pain or patellofemoral symptoms.',
    duration: '20-45 seconds',
    sets: 3,
    reps: 1,
  },
  {
    id: '6',
    name: 'Resistance Band Hamstring Curl',
    targetTissue: 'Hamstrings',
    loadLevel: 'Moderate',
    safetyStatus: 'safe',
    justification: 'Hamstring strengthening helps provide dynamic stability to the knee joint. Low to moderate resistance recommended to protect healing tissues.',
    duration: '2 seconds contraction, 2 seconds release',
    sets: 3,
    reps: 12,
  },
];

export const generateBiomechanicsData = (): BiomechanicsData[] => {
  const data: BiomechanicsData[] = [];
  const baseTime = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago
  
  for (let i = 0; i < 30; i++) {
    const timestamp = baseTime + i * 24 * 60 * 60 * 1000;
    data.push({
      timestamp,
      ligamentStress: 25 + Math.random() * 15 + (i * 0.5), // Gradual improvement
      strain: 0.08 + Math.random() * 0.04 - (i * 0.001),
      stiffness: 1500 + Math.random() * 300 + (i * 10),
    });
  }
  
  return data;
};
