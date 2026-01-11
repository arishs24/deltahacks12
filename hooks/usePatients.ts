'use client';

import { useState, useEffect, useCallback } from 'react';
import { Patient } from '@/types/clinical';

interface UsePatientsReturn {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch patient data from MongoDB via API route
 * 
 * This hook:
 * - Fetches patients from /api/patients on mount
 * - Provides loading and error states
 * - Exposes a refetch function to manually reload data
 * - Transforms MongoDB documents to match the Patient interface
 */
export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch patients from MongoDB via API route
      const response = await fetch('/api/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch patients');
      }

      // Transform MongoDB documents to Patient interface
      // MongoDB stores _id as ObjectId, we need to convert it to string
      // Also normalize rehabStage (MongoDB stores lowercase, UI expects capitalized)
      const transformedPatients: Patient[] = data.patients.map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        age: p.age,
        gender: p.gender,
        height: p.height,
        weight: p.weight,
        injuryType: p.injuryType,
        affectedStructures: p.affectedStructures || [],
        rehabStage: capitalizeRehabStage(p.rehabStage),
        simulationStatus: p.simulationStatus || 'pending', // Default to pending if not set
      }));

      setPatients(transformedPatients);
    } catch (err) {
      console.error('Error fetching patients from MongoDB:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setPatients([]); // Clear patients on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
  };
}

/**
 * Helper function to capitalize rehab stage
 * MongoDB stores: "initial", "intermediate", "advanced"
 * UI expects: "Initial", "Intermediate", "Advanced"
 */
function capitalizeRehabStage(stage: string): 'Initial' | 'Intermediate' | 'Advanced' | 'Maintenance' {
  if (!stage) return 'Initial';
  
  const normalized = stage.toLowerCase();
  switch (normalized) {
    case 'initial':
      return 'Initial';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Initial';
  }
}
