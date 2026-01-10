'use client';

import { useState, useMemo } from 'react';
import { GaitScenario, TissueType, Patient } from '@/types/clinical';
import { mockPatients, mockExercises, generateBiomechanicsData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import ToggleGroup from '@/components/clinical/ToggleGroup';
import ChartPlaceholder from '@/components/clinical/ChartPlaceholder';
import ExerciseCard from '@/components/clinical/ExerciseCard';
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
  AlertCircle
} from 'lucide-react';

type SafetyFilter = 'all' | 'safe' | 'caution';
type LoadFilter = 'all' | 'Low' | 'Moderate' | 'High';

export default function ViewerPage() {
  // Patient selection state
  const [selectedPatientId, setSelectedPatientId] = useState<string>(mockPatients[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Model viewer state
  const [gaitScenario, setGaitScenario] = useState<GaitScenario>('standing');
  const [visibleTissues, setVisibleTissues] = useState<Set<TissueType>>(
    new Set(['ligaments', 'cartilage', 'bone', 'tendons'])
  );

  // Exercise filter state
  const [safetyFilter, setSafetyFilter] = useState<SafetyFilter>('all');
  const [loadFilter, setLoadFilter] = useState<LoadFilter>('all');

  // Get selected patient
  const selectedPatient = useMemo(() => {
    return mockPatients.find(p => p.id === selectedPatientId) || mockPatients[0];
  }, [selectedPatientId]);

  // Filter patients based on search query
  // TODO: Replace with MongoDB query when backend is integrated
  // Future: await fetchPatientsFromMongoDB(searchQuery)
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockPatients;
    }
    const query = searchQuery.toLowerCase();
    return mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(query) ||
      patient.injuryType.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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

        {/* Patient Search and Selection */}
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

                  {/* Overlay information */}
                  <div className="relative z-10 text-center space-y-4 p-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-clinical-grey-200">
                      <Layers className="h-5 w-5 text-clinical-blue-600" />
                      <span className="font-semibold text-clinical-grey-900">
                        3D Knee Model Viewer
                      </span>
                    </div>
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
                    <p className="text-xs text-clinical-grey-500 max-w-md">
                      This placeholder will be replaced with an interactive 3D visualization
                      showing stress/strain distributions across knee tissues in real-time.
                    </p>
                  </div>

                  {/* Simulated biomechanical data overlay */}
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

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Average Ligament Stress</p>
                    <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                      {avgStress.toFixed(1)} MPa
                    </p>
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
                    <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                      {(avgStrain * 100).toFixed(2)}%
                    </p>
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
                    <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                      {avgStiffness.toFixed(0)} N/m
                    </p>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Activity className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            <ChartPlaceholder
              title="Ligament Stress Over Time"
              yAxisLabel="Stress"
              xAxisLabel="Days since initial assessment"
              data={ligamentStressData}
              trend="down"
              unit="MPa"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartPlaceholder
                title="Strain Analysis"
                yAxisLabel="Strain"
                xAxisLabel="Days since initial assessment"
                data={strainData}
                trend="down"
                unit="%"
              />

              <ChartPlaceholder
                title="Tissue Stiffness"
                yAxisLabel="Stiffness"
                xAxisLabel="Days since initial assessment"
                data={stiffnessData}
                trend="up"
                unit="N/m"
              />
            </div>
          </div>

          {/* Data Interpretation */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">Clinical Interpretation</h3>
              <div className="space-y-4 text-sm text-clinical-grey-700">
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Stress Trends</h4>
                  <p>
                    Ligament stress shows a gradual decrease over the 30-day monitoring period,
                    indicating positive healing response. Current values are within acceptable
                    ranges for intermediate rehabilitation stage.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Strain Analysis</h4>
                  <p>
                    Tissue strain demonstrates progressive reduction, suggesting improved tissue
                    integrity and load distribution. Monitor for any sudden increases which may
                    indicate overloading.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-clinical-grey-900 mb-2">Stiffness Progression</h4>
                  <p>
                    Increasing stiffness values reflect tissue healing and remodeling processes.
                    These changes are consistent with expected rehabilitation progression for
                    ligament injuries.
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
      </div>
    </ClinicalLayout>
  );
}
