// Component extracted from: Viewer Page, Exercises Page
// List of exercise cards with empty state

import { Exercise } from '@/types/clinical';
import { Card, CardContent } from '@/components/ui/card';
import ExerciseCard from '@/components/clinical/ExerciseCard';
import { Activity } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Activity className="h-12 w-12 text-clinical-grey-400 mx-auto mb-4" />
            <p className="text-clinical-grey-600 font-medium">
              No exercises match the current filters
            </p>
            <p className="text-sm text-clinical-grey-500 mt-2">
              Try adjusting your filter criteria
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
