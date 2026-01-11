// Component extracted from: Viewer Page, Exercises Page
// Summary statistics for exercises

import { Card, CardContent } from '@/components/ui/card';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExerciseSummaryCardsProps {
  totalCount: number;
  safeCount: number;
  cautionCount: number;
}

export function ExerciseSummaryCards({
  totalCount,
  safeCount,
  cautionCount,
}: ExerciseSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">Total Exercises</p>
              <p className="mt-1 text-2xl font-bold text-clinical-grey-900">{totalCount}</p>
            </div>
            <div className="rounded-full bg-clinical-blue-100 p-3">
              <Activity className="h-6 w-6 text-clinical-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">Safe Exercises</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{safeCount}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">Caution Required</p>
              <p className="mt-1 text-2xl font-bold text-yellow-600">{cautionCount}</p>
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
