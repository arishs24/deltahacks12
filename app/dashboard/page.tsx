'use client';

import { useState, useMemo, useEffect } from 'react';
import { Patient } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { useView } from '@/contexts/ViewContext';
import { usePatients } from '@/hooks/usePatients';
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
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const { isPatientView } = useView();
  
  // Fetch live patient data from MongoDB via /api/patients
  const { patients, loading, error, refetch } = usePatients();
  
  // In Patient view, always show John Smith (filter by name)
  // In a real app, this would be the authenticated user's patient record
  const johnSmith = useMemo(() => 
    patients.find(p => p.name === 'John Smith') || patients[0], 
    [patients]
  );
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Set initial selected patient once data is loaded
  useEffect(() => {
    if (!loading && patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [loading, patients, selectedPatient]);
  
  // Determine which patient to display based on view mode
  const displayPatient = isPatientView ? johnSmith : selectedPatient;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'processing':
        return <Activity className="h-5 w-5 text-clinical-blue-600 animate-pulse" />;
      default:
        return <XCircle className="h-5 w-5 text-clinical-grey-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };

  return (
    <ClinicalLayout currentPatient={displayPatient?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Dashboard</h1>
          <p className="mt-2 text-clinical-grey-600">
            {isPatientView 
              ? 'View your clinical summary and simulation status'
              : 'Select a patient to view their clinical summary and simulation status'
            }
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
          <div className={`grid grid-cols-1 ${isPatientView ? '' : 'lg:grid-cols-3'} gap-6`}>
            {/* Patient Selector - Only show in Clinician view - Data from MongoDB */}
            {!isPatientView && (
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Patient List ({patients.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-colors
                        ${
                          selectedPatient?.id === patient.id
                            ? 'border-clinical-blue-600 bg-clinical-blue-50'
                            : 'border-clinical-grey-200 hover:border-clinical-grey-300 hover:bg-clinical-grey-50'
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
            <div className={isPatientView ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
              {/* Summary Cards - Improved spacing: Consistent gap-4, aligned card heights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-clinical-grey-600">Injury Type</p>
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
                        <p className="text-sm font-medium text-clinical-grey-600">Rehab Stage</p>
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className={
                              displayPatient.rehabStage === 'Initial'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                : displayPatient.rehabStage === 'Intermediate'
                                ? 'bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200'
                                : displayPatient.rehabStage === 'Advanced'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-clinical-grey-100 text-clinical-grey-800 border-clinical-grey-200'
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
                        <p className="text-sm font-medium text-clinical-grey-600">Simulation Status</p>
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
                  <CardTitle>{isPatientView ? 'User Information' : 'Patient Information'}</CardTitle>
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
            </div>
          )}
          </div>
        )}
      </div>
    </ClinicalLayout>
  );
}
