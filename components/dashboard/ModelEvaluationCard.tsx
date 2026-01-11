// Component extracted from: Dashboard Page
// Provides UI for evaluating the biomechanical model

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, AlertCircle } from 'lucide-react';

interface ModelEvaluationCardProps {
  onEvaluate: () => void;
  isEvaluating: boolean;
  error: string | null;
}

export function ModelEvaluationCard({ onEvaluate, isEvaluating, error }: ModelEvaluationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onEvaluate}
          disabled={isEvaluating}
          className="w-full sm:w-auto bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
        >
          {isEvaluating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Evaluating Model...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Evaluate Model
            </>
          )}
        </Button>
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-800">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
