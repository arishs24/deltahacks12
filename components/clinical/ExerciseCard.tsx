'use client';

import { Exercise } from '@/types/clinical';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Target, Dumbbell, Clock, Repeat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-clinical-grey-900 mb-2">
              {exercise.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200">
                {exercise.targetTissue}
              </Badge>
              <Badge
                variant="outline"
                className={
                  exercise.loadLevel === 'Low'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : exercise.loadLevel === 'Moderate'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    : 'bg-red-100 text-red-800 border-red-200'
                }
              >
                Load: {exercise.loadLevel}
              </Badge>
              <Badge
                variant="outline"
                className={exercise.safetyStatus === 'safe' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
              >
                {exercise.safetyStatus === 'safe' ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Safe
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Caution
                  </span>
                )}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2 text-sm text-clinical-grey-600">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-clinical-blue-600" />
            <span>
              <span className="font-medium">Target:</span> {exercise.targetTissue}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-clinical-blue-600" />
            <span>
              <span className="font-medium">Duration:</span> {exercise.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-clinical-blue-600" />
            <span>
              <span className="font-medium">Sets/Reps:</span> {exercise.sets} sets × {exercise.reps} reps
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-clinical-blue-600" />
            <span>
              <span className="font-medium">Load Level:</span> {exercise.loadLevel}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-clinical-blue-50 p-4 border border-clinical-blue-100">
          <h4 className="text-sm font-semibold text-clinical-grey-900 mb-2">
            Clinical Justification
          </h4>
          <p className="text-sm text-clinical-grey-700 leading-relaxed">
            {exercise.justification}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
