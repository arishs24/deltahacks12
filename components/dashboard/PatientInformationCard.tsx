// Component extracted from: Dashboard Page
// Displays detailed patient information including demographics and physical measurements

import { Patient } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Ruler, Weight } from 'lucide-react';

interface PatientInformationCardProps {
  patient: Patient;
  isPatientView: boolean;
}

export function PatientInformationCard({ patient, isPatientView }: PatientInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isPatientView ? 'User Information' : 'Patient Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-clinical-grey-600">Name</p>
              <p className="font-medium text-clinical-grey-900 truncate">
                {patient.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-clinical-grey-600">Age</p>
              <p className="font-medium text-clinical-grey-900">
                {patient.age} years
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-clinical-grey-600">Gender</p>
              <p className="font-medium text-clinical-grey-900">
                {patient.gender}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Ruler className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-clinical-grey-600">Height</p>
              <p className="font-medium text-clinical-grey-900">
                {patient.height} cm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Weight className="h-5 w-5 text-clinical-grey-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-clinical-grey-600">Weight</p>
              <p className="font-medium text-clinical-grey-900">
                {patient.weight} kg
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
