"use client";

import { useState, useMemo, useEffect } from "react";
import { mockPatients } from "@/data/mockData";
import { Patient, Exercise } from "@/types/clinical";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ClinicalLayout from "@/components/clinical/ClinicalLayout";
import { useView } from "@/contexts/ViewContext";
import ExerciseCard from "@/components/clinical/ExerciseCard";
import {
  User,
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
  Ruler,
  Weight,
  Brain,
  Loader2,
} from "lucide-react";

interface ExerciseRecommendationResponse {
  healthy_forces: Record<string, number>;
  exercises: Array<{ name: string }>;
  data_sufficient: boolean;
  rag_interpretation?: string;
  gemini_feedback?: string;
}

export default function DashboardPage() {
  const { isPatientView } = useView();

  // In Patient view, always use John Smith (id: '1')
  // TODO: Replace with authenticated user's patient data when backend is integrated
  const johnSmith = useMemo(
    () => mockPatients.find((p) => p.id === "1") || mockPatients[0],
    []
  );

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    mockPatients[0]
  );
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "processing":
        return (
          <Activity className="h-5 w-5 text-clinical-blue-600 animate-pulse" />
        );
      default:
        return <XCircle className="h-5 w-5 text-clinical-grey-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete";
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      default:
        return "Unknown";
    }
  };

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

        <div
          className={`grid grid-cols-1 ${
            isPatientView ? "" : "lg:grid-cols-3"
          } gap-6`}
        >
          {/* Patient Selector - Only show in Clinician view */}
          {!isPatientView && (
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-colors
                        ${
                          selectedPatient?.id === patient.id
                            ? "border-clinical-blue-600 bg-clinical-blue-50"
                            : "border-clinical-grey-200 hover:border-clinical-grey-300 hover:bg-clinical-grey-50"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-clinical-grey-900">
                          {patient.name}
                        </span>
                        {getStatusIcon(patient.simulationStatus)}
                      </div>
                      <div className="text-sm text-clinical-grey-600">
                        {patient.injuryType}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Patient Summary - Improved spacing: Normalized gaps and consistent card heights */}
          {displayPatient && (
            <div
              className={
                isPatientView ? "space-y-6" : "lg:col-span-2 space-y-6"
              }
            >
              {/* Summary Cards - Improved spacing: Consistent gap-4, aligned card heights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-clinical-grey-600">
                          Injury Type
                        </p>
                        <p className="mt-1 text-lg font-semibold text-clinical-grey-900">
                          {displayPatient.injuryType}
                        </p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-clinical-blue-600 flex-shrink-0 ml-4" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-clinical-grey-600">
                          Rehab Stage
                        </p>
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className={
                              displayPatient.rehabStage === "Initial"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : displayPatient.rehabStage === "Intermediate"
                                ? "bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200"
                                : displayPatient.rehabStage === "Advanced"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-clinical-grey-100 text-clinical-grey-800 border-clinical-grey-200"
                            }
                          >
                            {displayPatient.rehabStage}
                          </Badge>
                        </div>
                      </div>
                      <Activity className="h-8 w-8 text-clinical-blue-600 flex-shrink-0 ml-4" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-clinical-grey-600">
                          Simulation Status
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {getStatusIcon(displayPatient.simulationStatus)}
                          <span className="text-sm font-medium text-clinical-grey-900">
                            {getStatusLabel(displayPatient.simulationStatus)}
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-clinical-blue-600 flex-shrink-0 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Affected Structures - Improved spacing: Consistent padding */}
              <Card>
                <CardHeader>
                  <CardTitle>Affected Structures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {displayPatient.affectedStructures.map((structure) => (
                      <Badge key={structure} variant="destructive">
                        {structure}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Patient Details - Improved spacing: Consistent padding and grid alignment */}
              {/* Patient-specific UI: Show "User Information" in Patient view, "Patient Information" in Clinician view */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isPatientView ? "User Information" : "Patient Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-clinical-grey-600">Name</p>
                        <p className="font-medium text-clinical-grey-900 truncate">
                          {displayPatient.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-clinical-grey-600">Age</p>
                        <p className="font-medium text-clinical-grey-900">
                          {displayPatient.age} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-clinical-grey-600">Gender</p>
                        <p className="font-medium text-clinical-grey-900">
                          {displayPatient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-clinical-grey-600">Height</p>
                        <p className="font-medium text-clinical-grey-900">
                          {displayPatient.height} cm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Weight className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-clinical-grey-600">Weight</p>
                        <p className="font-medium text-clinical-grey-900">
                          {displayPatient.weight} kg
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Evaluate Model Button */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleEvaluateModel}
                    disabled={isEvaluating}
                    className="w-full sm:w-auto bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Evaluating Model...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Evaluate Model
                      </>
                    )}
                  </Button>
                  {evaluationError && (
                    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-800">
                        <AlertCircle className="h-4 w-4 inline mr-2" />
                        {evaluationError}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Clinical Interpretation - Only show after evaluation */}
              {evaluationResults?.rag_interpretation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Clinical Interpretation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-clinical-grey-700">
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {evaluationResults.rag_interpretation}
                      </p>
                      {evaluationResults.data_sufficient === false && (
                        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <AlertCircle className="h-4 w-4 inline mr-2" />
                            Note: Limited data available in knowledge base.
                            Recommendations should be treated as general
                            guidelines only.
                          </p>
                        </div>
                      )}
                      {evaluationResults.gemini_feedback && (
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                          <p className="text-sm text-blue-800">
                            <Brain className="h-4 w-4 inline mr-2" />
                            <span className="font-medium">
                              AI Feedback:
                            </span>{" "}
                            {evaluationResults.gemini_feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Clinical Exercises - Only show after evaluation */}
              {evaluationResults && evaluationResults.exercises.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Exercises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {convertExercises(evaluationResults.exercises).map(
                        (exercise) => (
                          <ExerciseCard key={exercise.id} exercise={exercise} />
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* No exercises message */}
              {evaluationResults &&
                evaluationResults.exercises.length === 0 && (
                  <Card>
                    <CardContent className="py-12">
                      <div className="text-center">
                        <Activity className="h-12 w-12 text-clinical-grey-400 mx-auto mb-4" />
                        <p className="text-clinical-grey-600 font-medium">
                          No exercises recommended at this time
                        </p>
                        <p className="text-sm text-clinical-grey-500 mt-2">
                          The evaluation did not identify specific exercises for
                          this patient profile.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          )}
          </div>
        )}
      </div>
    </ClinicalLayout>
  );
}
