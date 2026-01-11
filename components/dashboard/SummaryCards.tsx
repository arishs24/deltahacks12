// Component extracted from: Dashboard Page
// Displays summary cards for injury type, rehab stage, and simulation status

import { Patient } from '@/types/clinical';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  Activity,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

interface SummaryCardsProps {
  patient: Patient;
}

export function SummaryCards({ patient }: SummaryCardsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-clinical-grey-600">
                Injury Type
              </p>
              <p className="mt-1 text-lg font-semibold text-clinical-grey-900">
                {patient.injuryType}
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
                    patient.rehabStage === 'Initial'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      : patient.rehabStage === 'Intermediate'
                      ? 'bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200'
                      : patient.rehabStage === 'Advanced'
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-clinical-grey-100 text-clinical-grey-800 border-clinical-grey-200'
                  }
                >
                  {patient.rehabStage}
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
                {getStatusIcon(patient.simulationStatus)}
                <span className="text-sm font-medium text-clinical-grey-900">
                  {getStatusLabel(patient.simulationStatus)}
                </span>
              </div>
            </div>
            <CheckCircle2 className="h-8 w-8 text-clinical-blue-600 flex-shrink-0 ml-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
