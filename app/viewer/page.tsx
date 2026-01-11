'use client';

import { useState, useMemo, useEffect } from 'react';
import { GaitScenario, TissueType, Patient } from '@/types/clinical';
import { mockExercises, generateBiomechanicsData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import ToggleGroup from '@/components/clinical/ToggleGroup';
import ChartPlaceholder from '@/components/clinical/ChartPlaceholder';
import ExerciseCard from '@/components/clinical/ExerciseCard';
import { useView } from '@/contexts/ViewContext';
import { usePatients } from '@/hooks/usePatients';
import { 
  Box, 
  Layers, 
  Eye, 
  EyeOff, 
  Search,
  BarChart3,
  TrendingUp,
  Activity,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  XCircle,
  User
} from 'lucide-react';

type SafetyFilter = 'all' | 'safe' | 'caution';
type LoadFilter = 'all' | 'Low' | 'Moderate' | 'High';

export default function ViewerPage() {
  const { isPatientView } = useView();
  
  // Fetch live patient data from MongoDB via /api/patients
  const { patients, loading, error, refetch } = usePatients();
  
  // Patient selection state - only used in Clinician view
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Filter patients based on search query - Data from MongoDB
  // Client-side filtering for search functionality
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) {
      return patients;
    }
    const query = searchQuery.toLowerCase();
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(query) ||
      patient.injuryType.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query)
    );
  }, [searchQuery, patients]);

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

  const gaitOptions = [
    { value: 'standing', label: 'Standing' },
    { value: 'walking', label: 'Walking' },
    { value: 'running', label: 'Running' },
  ];

  const tissues: Array<{ value: TissueType; label: string }> = [
    { value: 'ligaments', label: 'Ligaments' },
    { value: 'cartilage', label: 'Cartilage' },
    { value: 'bone', label: 'Bone' },
    { value: 'tendons', label: 'Tendons' },
  ];

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
        {loading && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-clinical-blue-600 mb-4" />
                <p className="text-clinical-grey-600 font-medium">Loading patient data from MongoDB...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State - Failed to fetch from MongoDB */}
        {error && !loading && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="py-6">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-900">Failed to load patients</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <button
                    onClick={refetch}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Patients State - MongoDB collection is empty */}
        {!loading && !error && patients.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <User className="h-12 w-12 text-clinical-grey-400 mx-auto mb-4" />
                <p className="text-clinical-grey-600 font-medium">No patients found</p>
                <p className="text-sm text-clinical-grey-500 mt-2">
                  {isPatientView 
                    ? 'Your patient record is not available yet.'
                    : 'Add a patient using the "Add Patient" tab to get started.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content - Only show when data is loaded and available */}
        {!loading && !error && patients.length > 0 && (
          <>
            {/* Patient Search and Selection - Only show in Clinician view - Data from MongoDB */}
            {!isPatientView && (
          <Card>
            <CardHeader>
              <CardTitle>Patient Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-clinical-grey-400" />
                  <Input
                    type="text"
                    placeholder="Search patients by name, injury type, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Patient List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`
                        text-left p-4 rounded-lg border-2 transition-colors
                        ${
                          selectedPatientId === patient.id
                            ? 'border-clinical-blue-600 bg-clinical-blue-50'
                            : 'border-clinical-grey-200 hover:border-clinical-grey-300 hover:bg-clinical-grey-50'
                        }
                      `}
                    >
                      <div className="font-semibold text-clinical-grey-900 mb-1">
                        {patient.name}
                      </div>
                      <div className="text-sm text-clinical-grey-600">
                        {patient.injuryType}
                      </div>
                      <div className="text-xs text-clinical-grey-500 mt-1">
                        ID: {patient.id}
                      </div>
                    </button>
                  ))}
                </div>

                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-clinical-grey-500">
                    No patients found matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Patient Info */}
        {selectedPatient && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-clinical-grey-900">{selectedPatient.name}</h3>
                  <p className="text-sm text-clinical-grey-600">
                    {selectedPatient.injuryType} • {selectedPatient.age} years, {selectedPatient.gender}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedPatient.rehabStage === 'Initial'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : selectedPatient.rehabStage === 'Intermediate'
                      ? 'bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200'
                      : selectedPatient.rehabStage === 'Advanced'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-clinical-grey-100 text-clinical-grey-800 border-clinical-grey-200'
                  }
                >
                  {selectedPatient.rehabStage}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3D Model Viewer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gait Scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ToggleGroup
                  options={gaitOptions}
                  value={gaitScenario}
                  onChange={(value) => setGaitScenario(value as GaitScenario)}
                  className="w-full flex-col"
                />
                <div className="p-4 bg-clinical-blue-50 rounded-lg border border-clinical-blue-100">
                  <p className="text-sm text-clinical-grey-700">
                    <span className="font-semibold">Current:</span> {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
                  </p>
                  <p className="text-xs text-clinical-grey-600 mt-2">
                    Switch between gait scenarios to view biomechanical changes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tissue Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tissues.map((tissue) => {
                    const isVisible = visibleTissues.has(tissue.value);
                    return (
                      <button
                        key={tissue.value}
                        onClick={() => toggleTissue(tissue.value)}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors
                          ${
                            isVisible
                              ? 'border-clinical-blue-600 bg-clinical-blue-50'
                              : 'border-clinical-grey-200 hover:border-clinical-grey-300'
                          }
                        `}
                      >
                        <span className="font-medium text-clinical-grey-900">
                          {tissue.label}
                        </span>
                        {isVisible ? (
                          <Eye className="h-5 w-5 text-clinical-blue-600" />
                        ) : (
                          <EyeOff className="h-5 w-5 text-clinical-grey-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Viewer Placeholder */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 h-[600px]">
                <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-clinical-grey-50 to-clinical-grey-100 rounded-lg border-2 border-dashed border-clinical-grey-300 relative overflow-hidden">
                  {/* Placeholder 3D visualization area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Box className="h-48 w-48 text-clinical-grey-300" />
                  </div>

                  {/* Overlay information - Patient-specific UI: Simplified for Patient view, full details for Clinician */}
                  <div className="relative z-10 text-center space-y-4 p-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-clinical-grey-200">
                      <Layers className="h-5 w-5 text-clinical-blue-600" />
                      <span className="font-semibold text-clinical-grey-900">
                        3D Knee Model Viewer
                      </span>
                    </div>
                    {/* Clinician-only: Show detailed labels and patient information */}
                    {!isPatientView && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-clinical-grey-200">
                        <p className="text-sm text-clinical-grey-600 mb-2">
                          <span className="font-semibold">Patient:</span> {selectedPatient?.name}
                        </p>
                        <p className="text-sm text-clinical-grey-600 mb-2">
                          <span className="font-semibold">Gait Scenario:</span> {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
                        </p>
                        <p className="text-sm text-clinical-grey-600">
                          <span className="font-semibold">Visible Tissues:</span>{' '}
                          {Array.from(visibleTissues)
                            .map((t) => tissues.find((ts) => ts.value === t)?.label)
                            .join(', ') || 'None'}
                        </p>
                      </div>
                    )}
                    {/* Patient-specific: Simplified description without technical details */}
                    <p className="text-xs text-clinical-grey-500 max-w-md">
                      {isPatientView
                        ? 'Interactive 3D visualization of your knee model for rehabilitation planning.'
                        : 'This placeholder will be replaced with an interactive 3D visualization showing stress/strain distributions across knee tissues in real-time.'}
                    </p>
                  </div>

                  {/* Simulated biomechanical data overlay - Clinician-only: Hide numerical data in Patient view */}
                  {!isPatientView && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-clinical-grey-200 shadow-sm">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-clinical-grey-600">Peak Stress</p>
                          <p className="text-lg font-semibold text-clinical-grey-900">
                            {gaitScenario === 'standing' ? '2.4' : gaitScenario === 'walking' ? '8.7' : '15.2'} MPa
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-clinical-grey-600">Max Strain</p>
                          <p className="text-lg font-semibold text-clinical-grey-900">
                            {gaitScenario === 'standing' ? '0.03' : gaitScenario === 'walking' ? '0.12' : '0.24'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-clinical-grey-600">Load Factor</p>
                          <p className="text-lg font-semibold text-clinical-grey-900">
                            {gaitScenario === 'standing' ? '1.0x' : gaitScenario === 'walking' ? '2.8x' : '5.2x'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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

          {/* Summary Statistics - Patient-specific UI: Hide numerical values in Patient view, keep structure for visual consistency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Average Ligament Stress</p>
                    {!isPatientView && (
                      <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                        {avgStress.toFixed(1)} MPa
                      </p>
                    )}
                  </div>
                  <div className="rounded-full bg-clinical-blue-100 p-3">
                    <BarChart3 className="h-6 w-6 text-clinical-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Average Strain</p>
                    {!isPatientView && (
                      <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                        {(avgStrain * 100).toFixed(2)}%
                      </p>
                    )}
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Average Stiffness</p>
                    {!isPatientView && (
                      <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                        {avgStiffness.toFixed(0)} N/m
                      </p>
                    )}
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts - Patient-specific UI: Hide numbers in Patient view, show visual trends only */}
          <div className="space-y-6">
            <ChartPlaceholder
              title="Ligament Stress Over Time"
              yAxisLabel="Stress"
              xAxisLabel="Days since initial assessment"
              data={ligamentStressData}
              trend="down"
              unit="MPa"
              hideNumbers={isPatientView}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartPlaceholder
                title="Strain Analysis"
                yAxisLabel="Strain"
                xAxisLabel="Days since initial assessment"
                data={strainData}
                trend="down"
                unit="%"
                hideNumbers={isPatientView}
              />

              <ChartPlaceholder
                title="Tissue Stiffness"
                yAxisLabel="Stiffness"
                xAxisLabel="Days since initial assessment"
                data={stiffnessData}
                trend="up"
                unit="N/m"
                hideNumbers={isPatientView}
              />
            </div>
          </div>

          {/* Data Interpretation - Patient-specific UI: Remove numerical references in Patient view */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">Clinical Interpretation</h3>
              <div className="space-y-4 text-sm text-clinical-grey-700">
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Stress Trends</h4>
                  <p>
                    {isPatientView
                      ? 'Ligament stress shows a gradual decrease over the monitoring period, indicating positive healing response. Progress is within acceptable ranges for your current rehabilitation stage.'
                      : 'Ligament stress shows a gradual decrease over the 30-day monitoring period, indicating positive healing response. Current values are within acceptable ranges for intermediate rehabilitation stage.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Strain Analysis</h4>
                  <p>
                    {isPatientView
                      ? 'Tissue strain demonstrates progressive reduction, suggesting improved tissue integrity and load distribution. Monitor for any sudden changes which may indicate overloading.'
                      : 'Tissue strain demonstrates progressive reduction, suggesting improved tissue integrity and load distribution. Monitor for any sudden increases which may indicate overloading.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Stiffness Progression</h4>
                  <p>
                    {isPatientView
                      ? 'Increasing stiffness reflects tissue healing and remodeling processes. These changes are consistent with expected rehabilitation progression for ligament injuries.'
                      : 'Increasing stiffness values reflect tissue healing and remodeling processes. These changes are consistent with expected rehabilitation progression for ligament injuries.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Total Exercises</p>
                    <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                      {mockExercises.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-clinical-blue-100 p-3">
                    <Activity className="h-6 w-6 text-clinical-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Safe Exercises</p>
                    <p className="mt-1 text-2xl font-bold text-green-600">
                      {safeCount}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Caution Required</p>
                    <p className="mt-1 text-2xl font-bold text-yellow-600">
                      {cautionCount}
                    </p>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-clinical-grey-600" />
                  <span className="font-medium text-clinical-grey-900">Filters:</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-clinical-grey-600">Safety:</span>
                  <div className="flex gap-2">
                    {(['all', 'safe', 'caution'] as SafetyFilter[]).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSafetyFilter(filter)}
                        className={`
                          px-3 py-1 rounded-md text-sm font-medium transition-colors
                          ${
                            safetyFilter === filter
                              ? 'bg-clinical-blue-600 text-white'
                              : 'bg-clinical-grey-100 text-clinical-grey-700 hover:bg-clinical-grey-200'
                          }
                        `}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-clinical-grey-600">Load:</span>
                  <div className="flex gap-2">
                    {(['all', 'Low', 'Moderate', 'High'] as LoadFilter[]).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLoadFilter(filter)}
                        className={`
                          px-3 py-1 rounded-md text-sm font-medium transition-colors
                          ${
                            loadFilter === filter
                              ? 'bg-clinical-blue-600 text-white'
                              : 'bg-clinical-grey-100 text-clinical-grey-700 hover:bg-clinical-grey-200'
                          }
                        `}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredExercises.length !== mockExercises.length && (
                  <Badge variant="outline" className="bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200">
                    Showing {filteredExercises.length} of {mockExercises.length}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Exercise Cards */}
          <div className="space-y-6">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-clinical-grey-400 mx-auto mb-4" />
                    <p className="text-clinical-grey-600 font-medium">
                      No exercises match the current filters
                    </p>
                    <p className="text-sm text-clinical-grey-500 mt-2">
                      Try adjusting your filter criteria
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </ClinicalLayout>
  );
}
