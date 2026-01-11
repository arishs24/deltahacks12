// Component extracted from: Dashboard Page
// Displays a list of patients with their injury type and simulation status

import { Patient } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle2,
  Clock,
  Activity,
  XCircle,
} from 'lucide-react';

interface PatientListCardProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onPatientSelect: (patient: Patient) => void;
}

export function PatientListCard({ patients, selectedPatient, onPatientSelect }: PatientListCardProps) {
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

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Patient List ({patients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => onPatientSelect(patient)}
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
  );
}
