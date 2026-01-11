'use client';

import { useState, useEffect, useMemo } from 'react';
import { useView } from '@/contexts/ViewContext';
import { usePatients } from '@/hooks/usePatients';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { NoPatientsState } from '@/components/dashboard/NoPatientsState';
import { RecoveryCalendar } from '@/components/planner/RecoveryCalendar';
import { DailyWorkoutChecklist } from '@/components/planner/DailyWorkoutChecklist';
import { RecoveryProgress } from '@/components/planner/RecoveryProgress';
import { DailyFEAAnalysis } from '@/components/planner/DailyFEAAnalysis';
import { generateRecoveryPlan, RecoveryPlan, calculateRecoveryProgress } from '@/lib/recovery-planner';
import { recalculateFEA, calculateFEAProgress, FEAProgress } from '@/lib/fea-progress';
import { TearType, FEASimulationResult } from '@/lib/fea-simulation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Target, TrendingUp } from 'lucide-react';

export default function PlannerPage() {
  const { isPatientView } = useView();
  const { patients, loading, error, refetch } = usePatients();
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlan | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());
  const [initialFEAResults, setInitialFEAResults] = useState<FEASimulationResult | null>(null);
  const [feaProgress, setFeaProgress] = useState<FEAProgress | null>(null);

  // Set initial selected patient
  useEffect(() => {
    if (!loading && patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [loading, patients, selectedPatientId]);

  // Get selected patient
  const selectedPatient = useMemo(() => {
    if (isPatientView) {
      return patients.find(p => p.name === 'John Smith') || patients[0];
    }
    return patients.find(p => p.id === selectedPatientId) || patients[0];
  }, [selectedPatientId, isPatientView, patients]);

  // Load completed workouts from localStorage when patient is available
  useEffect(() => {
    if (selectedPatient?.id && typeof window !== 'undefined') {
      const stored = localStorage.getItem(`completed_workouts_${selectedPatient.id}`);
      if (stored) {
        try {
          setCompletedWorkouts(new Set(JSON.parse(stored)));
        } catch (e) {
          console.error('Failed to parse stored completed workouts:', e);
        }
      } else {
        setCompletedWorkouts(new Set());
      }
    }
  }, [selectedPatient?.id]);

  // Detect tear type from patient data or localStorage
  useEffect(() => {
    if (selectedPatient && !recoveryPlan) {
      // First, try to get tear type from localStorage (set by Model Viewer)
      const storedTearType = localStorage.getItem(`tear_type_${selectedPatient.id}`);
      let tearType: TearType = null;

      if (storedTearType) {
        tearType = storedTearType as TearType;
      } else {
        // Fallback: Try to detect tear type from injury description
        const injuryType = selectedPatient.injuryType?.toLowerCase() || '';
        if (injuryType.includes('mcl') || injuryType.includes('medial collateral')) {
          tearType = 'mcl_grade3';
        } else if (injuryType.includes('acl') || injuryType.includes('anterior cruciate')) {
          tearType = 'acl_tear';
        }
      }

      if (tearType) {
        const plan = generateRecoveryPlan(tearType, new Date());
        setRecoveryPlan(plan);
      }
    }
  }, [selectedPatient, recoveryPlan]);

  // Load initial FEA results from localStorage
  useEffect(() => {
    if (selectedPatient?.id && !initialFEAResults) {
      const stored = localStorage.getItem(`fea_initial_${selectedPatient.id}`);
      if (stored) {
        try {
          setInitialFEAResults(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse stored FEA results:', e);
        }
      }
    }
  }, [selectedPatient?.id, initialFEAResults]);


  // Calculate progress and update FEA when workouts are completed
  useEffect(() => {
    if (recoveryPlan && initialFEAResults) {
      const progress = calculateRecoveryProgress(recoveryPlan, completedWorkouts);
      const currentFEAResults = recalculateFEA(initialFEAResults, progress.overallProgress);
      const feaProgressData = calculateFEAProgress(initialFEAResults, currentFEAResults);
      setFeaProgress(feaProgressData);
    }
  }, [recoveryPlan, completedWorkouts, initialFEAResults]);

  // Handle workout completion
  const handleWorkoutComplete = (workoutId: string) => {
    setCompletedWorkouts(prev => {
      const updated = new Set(prev);
      updated.add(workoutId);
      // Persist to localStorage
      if (selectedPatient?.id) {
        localStorage.setItem(`completed_workouts_${selectedPatient.id}`, JSON.stringify(Array.from(updated)));
      }
      return updated;
    });
  };

  // Handle workout uncomplete
  const handleWorkoutUncomplete = (workoutId: string) => {
    setCompletedWorkouts(prev => {
      const updated = new Set(prev);
      updated.delete(workoutId);
      // Persist to localStorage
      if (selectedPatient?.id) {
        localStorage.setItem(`completed_workouts_${selectedPatient.id}`, JSON.stringify(Array.from(updated)));
      }
      return updated;
    });
  };

  // Initialize FEA from viewer page
  const handleInitializeFEA = (feaResults: FEASimulationResult) => {
    setInitialFEAResults(feaResults);
    localStorage.setItem(`fea_initial_${selectedPatient?.id}`, JSON.stringify(feaResults));
  };

  const progress = recoveryPlan
    ? calculateRecoveryProgress(recoveryPlan, completedWorkouts)
    : null;

  const selectedDayPlan = recoveryPlan?.dailyPlans.find(
    plan => plan.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <ClinicalLayout currentPatient={selectedPatient?.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Recovery Planner</h1>
          <p className="mt-2 text-clinical-grey-600">
            Personalized rehabilitation plan with day-by-day workout schedule and progress tracking
          </p>
        </div>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && <ErrorState error={error} onRetry={refetch} />}

        {/* No Patients State */}
        {!loading && !error && patients.length === 0 && (
          <NoPatientsState isPatientView={isPatientView} />
        )}

        {/* Main Content */}
        {!loading && !error && patients.length > 0 && (
          <>
            {/* Recovery Plan Status */}
            {recoveryPlan ? (
              <>
                {/* Recovery Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Recovery Plan Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-clinical-grey-600 mb-1">Tear Type</p>
                        <p className="text-xl font-semibold">
                          {recoveryPlan.tearType === 'mcl_grade3' ? 'Grade 3 MCL Tear' : 'ACL Tear'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-clinical-grey-600 mb-1">Estimated Recovery</p>
                        <p className="text-xl font-semibold">
                          {Math.ceil(recoveryPlan.estimatedRecoveryDays / 7)} weeks
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-clinical-grey-600 mb-1">Start Date</p>
                        <p className="text-xl font-semibold">
                          {recoveryPlan.startDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Recovery Phases */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 bg-clinical-blue-50">
                        <h4 className="font-semibold mb-2">Early Phase</h4>
                        <p className="text-sm text-clinical-grey-700 mb-2">
                          Days 1-{recoveryPlan.phases.early.days}
                        </p>
                        <p className="text-xs text-clinical-grey-600">
                          {recoveryPlan.phases.early.description}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 bg-clinical-blue-100">
                        <h4 className="font-semibold mb-2">Mid Phase</h4>
                        <p className="text-sm text-clinical-grey-700 mb-2">
                          Days {recoveryPlan.phases.early.days + 1}-{recoveryPlan.phases.early.days + recoveryPlan.phases.mid.days}
                        </p>
                        <p className="text-xs text-clinical-grey-600">
                          {recoveryPlan.phases.mid.description}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 bg-clinical-blue-200">
                        <h4 className="font-semibold mb-2">Late Phase</h4>
                        <p className="text-sm text-clinical-grey-700 mb-2">
                          Days {recoveryPlan.phases.early.days + recoveryPlan.phases.mid.days + 1}-{recoveryPlan.estimatedRecoveryDays}
                        </p>
                        <p className="text-xs text-clinical-grey-600">
                          {recoveryPlan.phases.late.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily FEA Analysis - Shows after workouts are completed */}
                {initialFEAResults && progress && (
                  <DailyFEAAnalysis
                    initialFEAResults={initialFEAResults}
                    recoveryProgress={progress.overallProgress}
                    onAnalysisComplete={(feaProgressData) => setFeaProgress(feaProgressData)}
                  />
                )}

                {/* Recovery Progress */}
                {progress && feaProgress && (
                  <RecoveryProgress
                    progress={progress}
                    feaProgress={feaProgress}
                  />
                )}

                {/* Calendar and Daily Plan */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Calendar */}
                  <div className="lg:col-span-2">
                    <RecoveryCalendar
                      recoveryPlan={recoveryPlan}
                      completedWorkouts={completedWorkouts}
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                    />
                  </div>

                  {/* Daily Workout Checklist */}
                  <div className="lg:col-span-1">
                    {selectedDayPlan ? (
                      <DailyWorkoutChecklist
                        dayPlan={selectedDayPlan}
                        completedWorkouts={completedWorkouts}
                        onWorkoutComplete={handleWorkoutComplete}
                        onWorkoutUncomplete={handleWorkoutUncomplete}
                      />
                    ) : (
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-clinical-grey-600 text-center">
                            Select a date from the calendar to view workouts
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* FEA Initialization Notice */}
                {!initialFEAResults && (
                  <Card className="border-yellow-300 bg-yellow-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">Initialize FEA Tracking</h3>
                          <p className="text-sm text-clinical-grey-700">
                            Run an FEA simulation in the Model Viewer to track your recovery progress
                          </p>
                        </div>
                        <Button
                          onClick={() => window.location.href = '/viewer'}
                          variant="outline"
                        >
                          Go to Model Viewer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-clinical-grey-400" />
                  <h3 className="text-lg font-semibold mb-2">No Recovery Plan Available</h3>
                  <p className="text-clinical-grey-600 mb-4">
                    A recovery plan will be generated once a tear type is detected from your MRI scan.
                  </p>
                  <Button
                    onClick={() => window.location.href = '/viewer'}
                    className="bg-clinical-blue-600 hover:bg-clinical-blue-700"
                  >
                    Upload MRI in Model Viewer
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ClinicalLayout>
  );
}
