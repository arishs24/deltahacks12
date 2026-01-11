"use client";

import { useState, useMemo, useEffect } from "react";
import { Patient } from "@/types/clinical";
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

  // Determine which patient to display based on view mode
  const displayPatient = isPatientView ? johnSmith : selectedPatient;

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

              {/* Note: Model Evaluation section has been moved to the Model Viewer tab for better integration with 3D visualization and biomechanics data */}
            </div>
          )}
          </div>
        )}
      </div>
    </ClinicalLayout>
  );
}
