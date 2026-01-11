// Component extracted from: Dashboard Page
// Displays recommended exercises or a no-exercises message

import { Exercise } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExerciseCard from '@/components/clinical/ExerciseCard';
import { Activity } from 'lucide-react';

interface RecommendedExercisesCardProps {
  exercises: Exercise[];
}

export function RecommendedExercisesCard({ exercises }: RecommendedExercisesCardProps) {
  if (exercises.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Activity className="h-12 w-12 text-clinical-grey-400 mx-auto mb-4" />
            <p className="text-clinical-grey-600 font-medium">
              No exercises recommended at this time
            </p>
            <p className="text-sm text-clinical-grey-500 mt-2">
              The evaluation did not identify specific exercises for this patient
              profile.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Exercises</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
