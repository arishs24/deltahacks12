// Component extracted from: Dashboard Page, Viewer Page
// Displays a loading spinner with message while fetching patient data

import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading patient data from MongoDB...' }: LoadingStateProps) {
  return (
    <Card>
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-clinical-blue-600 mb-4" />
          <p className="text-clinical-grey-600 font-medium">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
