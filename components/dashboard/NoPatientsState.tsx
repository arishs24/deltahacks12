// Component extracted from: Dashboard Page, Viewer Page
// Displays a message when no patients are found in the database

import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NoPatientsStateProps {
  isPatientView: boolean;
}

export function NoPatientsState({ isPatientView }: NoPatientsStateProps) {
  return (
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
  );
}
