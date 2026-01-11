// Component extracted from: Viewer Page
// Displays selected patient information banner

import { Patient } from '@/types/clinical';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SelectedPatientInfoProps {
  patient: Patient;
}

export function SelectedPatientInfo({ patient }: SelectedPatientInfoProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-clinical-grey-900">{patient.name}</h3>
            <p className="text-sm text-clinical-grey-600">
              {patient.injuryType} • {patient.age} years, {patient.gender}
            </p>
          </div>
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
      </CardContent>
    </Card>
  );
}
