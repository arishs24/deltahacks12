import { useState } from 'react';
import { mockPatients } from '../data/mockData';
import { Patient } from '../types';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { 
  User, 
  Calendar, 
  AlertCircle, 
  Activity, 
  CheckCircle2, 
  Clock,
  XCircle 
} from 'lucide-react';

export default function Dashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-clinical-grey-900">Dashboard</h1>
        <p className="mt-2 text-clinical-grey-600">
          Select a patient to view their clinical summary and simulation status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selector */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">
            Patient List
          </h3>
          <div className="space-y-2">
            {mockPatients.map((patient) => (
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
        </Card>

        {/* Patient Summary */}
        {selectedPatient && (
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Injury Type</p>
                    <p className="mt-1 text-lg font-semibold text-clinical-grey-900">
                      {selectedPatient.injuryType}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-clinical-blue-600" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Rehab Stage</p>
                    <div className="mt-2">
                      <Badge
                        variant={
                          selectedPatient.rehabStage === 'Initial'
                            ? 'warning'
                            : selectedPatient.rehabStage === 'Intermediate'
                            ? 'info'
                            : selectedPatient.rehabStage === 'Advanced'
                            ? 'success'
                            : 'default'
                        }
                      >
                        {selectedPatient.rehabStage}
                      </Badge>
                    </div>
                  </div>
                  <Activity className="h-8 w-8 text-clinical-blue-600" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-clinical-grey-600">Simulation Status</p>
                    <div className="mt-2 flex items-center gap-2">
                      {getStatusIcon(selectedPatient.simulationStatus)}
                      <span className="text-sm font-medium text-clinical-grey-900">
                        {getStatusLabel(selectedPatient.simulationStatus)}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-clinical-blue-600" />
                </div>
              </Card>
            </div>

            {/* Affected Ligaments */}
            <Card title="Affected Ligaments">
              <div className="flex flex-wrap gap-2">
                {selectedPatient.affectedLigaments.map((ligament) => (
                  <Badge key={ligament} variant="danger">
                    {ligament}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Patient Details */}
            <Card title="Patient Information">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-clinical-grey-400" />
                  <div>
                    <p className="text-sm text-clinical-grey-600">Name</p>
                    <p className="font-medium text-clinical-grey-900">
                      {selectedPatient.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-clinical-grey-400" />
                  <div>
                    <p className="text-sm text-clinical-grey-600">Age / Gender</p>
                    <p className="font-medium text-clinical-grey-900">
                      {selectedPatient.age} years, {selectedPatient.gender}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
