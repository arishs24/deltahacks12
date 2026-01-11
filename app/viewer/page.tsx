'use client';

import { useState, useMemo, useEffect } from 'react';
import { GaitScenario, TissueType } from '@/types/clinical';
import { mockExercises, generateBiomechanicsData } from '@/data/mockData';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { useView } from '@/contexts/ViewContext';
import { usePatients } from '@/hooks/usePatients';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { NoPatientsState } from '@/components/dashboard/NoPatientsState';
import { PatientSelectionCard } from '@/components/viewer/PatientSelectionCard';
import { SelectedPatientInfo } from '@/components/viewer/SelectedPatientInfo';
import { GaitControlsPanel } from '@/components/viewer/GaitControlsPanel';
import { TissueVisibilityPanel } from '@/components/viewer/TissueVisibilityPanel';
import { Model3DViewer } from '@/components/viewer/Model3DViewer';
import { BiomechanicsStatsCards } from '@/components/viewer/BiomechanicsStatsCards';
import { BiomechanicsChartsSection } from '@/components/viewer/BiomechanicsChartsSection';
import { BiomechanicsInterpretationCard } from '@/components/viewer/BiomechanicsInterpretationCard';
import { ExerciseSummaryCards } from '@/components/exercises/ExerciseSummaryCards';
import { ExerciseFilters } from '@/components/exercises/ExerciseFilters';
import { ExerciseList } from '@/components/exercises/ExerciseList';

type SafetyFilter = 'all' | 'safe' | 'caution';
type LoadFilter = 'all' | 'Low' | 'Moderate' | 'High';

export default function ViewerPage() {
  const { isPatientView } = useView();
  
  // Fetch live patient data from MongoDB via /api/patients
  const { patients, loading, error, refetch } = usePatients();
  
  // Patient selection state - only used in Clinician view
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  
  // Set initial selected patient once data is loaded
  useEffect(() => {
    if (!loading && patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [loading, patients, selectedPatientId]);
  
  // In Patient view, always show John Smith (filter by name)
  // In a real app, this would be the authenticated user's patient record
  const johnSmith = useMemo(() => 
    patients.find(p => p.name === 'John Smith') || patients[0], 
    [patients]
  );

  // Model viewer state
  const [gaitScenario, setGaitScenario] = useState<GaitScenario>('standing');
  const [visibleTissues, setVisibleTissues] = useState<Set<TissueType>>(
    new Set(['ligaments', 'cartilage', 'bone', 'tendons'])
  );

  // Exercise filter state
  const [safetyFilter, setSafetyFilter] = useState<SafetyFilter>('all');
  const [loadFilter, setLoadFilter] = useState<LoadFilter>('all');

  // Get selected patient - use John Smith in Patient view, otherwise use selected patient from MongoDB data
  const selectedPatient = useMemo(() => {
    if (isPatientView) {
      return johnSmith;
    }
    return patients.find(p => p.id === selectedPatientId) || patients[0];
  }, [selectedPatientId, isPatientView, johnSmith, patients]);

  // Biomechanics data for selected patient
  // TODO: Replace with MongoDB query when backend is integrated
  // Future: const biomechanicsData = await fetchPatientBiomechanicsData(selectedPatientId)
  const biomechanicsData = useMemo(() => generateBiomechanicsData(), [selectedPatientId]);

  // Process data for charts
  const ligamentStressData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.ligamentStress,
  }));

  const strainData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.strain * 100, // Convert to percentage
  }));

  const stiffnessData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.stiffness,
  }));

  // Calculate statistics
  const avgStress = biomechanicsData.reduce((sum, d) => sum + d.ligamentStress, 0) / biomechanicsData.length;
  const avgStrain = biomechanicsData.reduce((sum, d) => sum + d.strain, 0) / biomechanicsData.length;
  const avgStiffness = biomechanicsData.reduce((sum, d) => sum + d.stiffness, 0) / biomechanicsData.length;

  // Filter exercises
  // TODO: Replace with MongoDB query when backend is integrated
  // Future: const exercises = await fetchPatientExercises(selectedPatientId, safetyFilter, loadFilter)
  const filteredExercises = mockExercises.filter((exercise) => {
    if (safetyFilter !== 'all' && exercise.safetyStatus !== safetyFilter) {
      return false;
    }
    if (loadFilter !== 'all' && exercise.loadLevel !== loadFilter) {
      return false;
    }
    return true;
  });

  const safeCount = mockExercises.filter((e) => e.safetyStatus === 'safe').length;
  const cautionCount = mockExercises.filter((e) => e.safetyStatus === 'caution').length;

  const toggleTissue = (tissue: TissueType) => {
    const newVisible = new Set(visibleTissues);
    if (newVisible.has(tissue)) {
      newVisible.delete(tissue);
    } else {
      newVisible.add(tissue);
    }
    setVisibleTissues(newVisible);
  };

  return (
    <ClinicalLayout currentPatient={selectedPatient?.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Knee Model Viewer</h1>
          <p className="mt-2 text-clinical-grey-600">
            Interactive 3D visualization, biomechanics analysis, and exercise recommendations for patient knee models
          </p>
        </div>

        {/* Loading State - Fetching patient data from MongoDB */}
        {loading && <LoadingState />}

        {/* Error State - Failed to fetch from MongoDB */}
        {error && !loading && <ErrorState error={error} onRetry={refetch} />}

        {/* No Patients State - MongoDB collection is empty */}
        {!loading && !error && patients.length === 0 && (
          <NoPatientsState isPatientView={isPatientView} />
        )}

        {/* Main Content - Only show when data is loaded and available */}
        {!loading && !error && patients.length > 0 && (
          <>
            {/* Patient Search and Selection - Only show in Clinician view - Data from MongoDB */}
            {!isPatientView && (
              <PatientSelectionCard
                patients={patients}
                selectedPatientId={selectedPatientId}
                onPatientSelect={setSelectedPatientId}
              />
            )}

        {/* Selected Patient Info */}
        {selectedPatient && <SelectedPatientInfo patient={selectedPatient} />}

        {/* 3D Model Viewer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <GaitControlsPanel
              gaitScenario={gaitScenario}
              onGaitChange={setGaitScenario}
            />
            <TissueVisibilityPanel
              visibleTissues={visibleTissues}
              onToggleTissue={toggleTissue}
            />
          </div>

          {/* 3D Viewer Placeholder */}
          <div className="lg:col-span-3">
            <Model3DViewer
              gaitScenario={gaitScenario}
              visibleTissues={visibleTissues}
              selectedPatient={selectedPatient}
              isPatientView={isPatientView}
            />
          </div>
        </div>

        {/* Biomechanics Data Panel Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-clinical-grey-900">Biomechanics Data Panel</h2>
            <p className="mt-1 text-clinical-grey-600">
              Detailed analysis of ligament stress, strain, and tissue stiffness over time
            </p>
          </div>

          {/* Summary Statistics */}
          <BiomechanicsStatsCards
            avgStress={avgStress}
            avgStrain={avgStrain}
            avgStiffness={avgStiffness}
            isPatientView={isPatientView}
          />

          {/* Charts */}
          <BiomechanicsChartsSection
            ligamentStressData={ligamentStressData}
            strainData={strainData}
            stiffnessData={stiffnessData}
            hideNumbers={isPatientView}
          />

          {/* Data Interpretation */}
          <BiomechanicsInterpretationCard isPatientView={isPatientView} />
        </div>

        {/* Exercise Recommendations Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-clinical-grey-900">Exercise Recommendations</h2>
            <p className="mt-1 text-clinical-grey-600">
              AI-assisted rehabilitation exercise recommendations based on biomechanical analysis
            </p>
          </div>

          {/* Summary Cards */}
          <ExerciseSummaryCards
            totalCount={mockExercises.length}
            safeCount={safeCount}
            cautionCount={cautionCount}
          />

          {/* Filters */}
          <ExerciseFilters
            safetyFilter={safetyFilter}
            loadFilter={loadFilter}
            onSafetyFilterChange={setSafetyFilter}
            onLoadFilterChange={setLoadFilter}
            filteredCount={filteredExercises.length}
            totalCount={mockExercises.length}
          />

          {/* Exercise Cards */}
          <ExerciseList exercises={filteredExercises} />
        </div>
          </>
        )}
      </div>
    </ClinicalLayout>
  );
}
