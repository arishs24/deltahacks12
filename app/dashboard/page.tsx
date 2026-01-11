"use client";

import { useState, useMemo, useEffect } from "react";
import { Patient, Exercise } from "@/types/clinical";
import ClinicalLayout from "@/components/clinical/ClinicalLayout";
import { useView } from "@/contexts/ViewContext";
import { usePatients } from "@/hooks/usePatients";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { NoPatientsState } from "@/components/dashboard/NoPatientsState";
import { PatientListCard } from "@/components/dashboard/PatientListCard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AffectedStructuresCard } from "@/components/dashboard/AffectedStructuresCard";
import { PatientInformationCard } from "@/components/dashboard/PatientInformationCard";
import { ModelEvaluationCard } from "@/components/dashboard/ModelEvaluationCard";
import { ClinicalInterpretationCard } from "@/components/dashboard/ClinicalInterpretationCard";
import { RecommendedExercisesCard } from "@/components/dashboard/RecommendedExercisesCard";

interface ExerciseRecommendationResponse {
  healthy_forces: Record<string, number>;
  exercises: Array<{ name: string }>;
  data_sufficient: boolean;
  rag_interpretation?: string;
  gemini_feedback?: string;
}

export default function DashboardPage() {
  const { isPatientView } = useView();

  // Fetch live patient data from MongoDB via /api/patients
  const { patients, loading, error, refetch } = usePatients();

  // In Patient view, always show John Smith (filter by name from MongoDB data)
  // In a real app, this would be the authenticated user's patient record
  const johnSmith = useMemo(
    () => patients.find((p) => p.name === "John Smith") || patients[0],
    [patients]
  );

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Set initial selected patient once data is loaded from MongoDB
  useEffect(() => {
    if (!loading && patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [loading, patients, selectedPatient]);
  const [evaluationResults, setEvaluationResults] =
    useState<ExerciseRecommendationResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Determine which patient to display based on view mode
  const displayPatient = isPatientView ? johnSmith : selectedPatient;

  // Reset evaluation results when patient changes
  useEffect(() => {
    setEvaluationResults(null);
    setEvaluationError(null);
  }, [displayPatient?.id]);

  const handleEvaluateModel = async () => {
    if (!displayPatient) return;

    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      // Prepare request data
      const requestData = {
        patient_info: {
          height: displayPatient.height,
          weight: displayPatient.weight,
          gender: displayPatient.gender,
        },
        regions: [
          // Placeholder region data - in real app, this would come from biomechanics data
          { region: "heel", stress: 120.5, load: 450.2 },
          { region: "arch", stress: 95.3, load: 380.1 },
          { region: "forefoot", stress: 140.7, load: 520.4 },
        ],
      };

      const response = await fetch("/api/exercise-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to evaluate model");
      }

      const data: ExerciseRecommendationResponse = await response.json();
      setEvaluationResults(data);
    } catch (error) {
      console.error("Error evaluating model:", error);
      setEvaluationError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  // Convert API exercises to Exercise format with placeholder data
  const convertExercises = (
    apiExercises: Array<{ name: string }>
  ): Exercise[] => {
    return apiExercises.map((ex, index) => ({
      id: `evaluated-${index}`,
      name: ex.name,
      targetTissue: displayPatient?.affectedStructures[0] || "General",
      loadLevel: "Low" as const,
      safetyStatus: "safe" as const,
      justification:
        "Recommended based on biomechanical analysis and clinical guidelines.",
      duration: "15 minutes",
      sets: 3,
      reps: 10,
    }));
  };

  return (
    <ClinicalLayout currentPatient={displayPatient?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">
            Dashboard
          </h1>
          <p className="mt-2 text-clinical-grey-600">
            {isPatientView
              ? "View your clinical summary and simulation status"
              : "Select a patient to view their clinical summary and simulation status"}
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

        {/* Main Content - Only show when data is loaded from MongoDB */}
        {!loading && !error && patients.length > 0 && (
          <div
            className={`grid grid-cols-1 ${
              isPatientView ? "" : "lg:grid-cols-3"
            } gap-6`}
          >
            {/* Patient Selector - Only show in Clinician view - Data from MongoDB */}
            {!isPatientView && (
              <PatientListCard
                patients={patients}
                selectedPatient={selectedPatient}
                onPatientSelect={setSelectedPatient}
              />
            )}

          {/* Patient Summary - Improved spacing: Normalized gaps and consistent card heights */}
          {displayPatient && (
            <div
              className={
                isPatientView ? "space-y-6" : "lg:col-span-2 space-y-6"
              }
            >
              {/* Summary Cards - Improved spacing: Consistent gap-4, aligned card heights */}
              <SummaryCards patient={displayPatient} />

              {/* Affected Structures - Improved spacing: Consistent padding */}
              <AffectedStructuresCard structures={displayPatient.affectedStructures} />

              {/* Patient Details - Improved spacing: Consistent padding and grid alignment */}
              <PatientInformationCard patient={displayPatient} isPatientView={isPatientView} />

              {/* Evaluate Model Button */}
              <ModelEvaluationCard
                onEvaluate={handleEvaluateModel}
                isEvaluating={isEvaluating}
                error={evaluationError}
              />

              {/* Clinical Interpretation - Only show after evaluation */}
              {evaluationResults?.rag_interpretation && (
                <ClinicalInterpretationCard
                  interpretation={evaluationResults.rag_interpretation}
                  dataSufficient={evaluationResults.data_sufficient}
                  geminiFeedback={evaluationResults.gemini_feedback}
                />
              )}

              {/* Clinical Exercises - Only show after evaluation */}
              {evaluationResults && (
                <RecommendedExercisesCard
                  exercises={convertExercises(evaluationResults.exercises)}
                />
              )}
            </div>
          )}
          </div>
        )}
      </div>
    </ClinicalLayout>
  );
}
