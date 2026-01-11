// Component extracted from: Dashboard Page, Viewer Page
// Displays an error message with retry button when data fetching fails

import { XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="py-6">
        <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Failed to load patients</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={onRetry}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
