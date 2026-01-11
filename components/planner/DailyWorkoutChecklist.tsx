'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyPlan } from '@/lib/recovery-planner';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DailyWorkoutChecklistProps {
  dayPlan: DailyPlan;
  completedWorkouts: Set<string>;
  onWorkoutComplete: (workoutId: string) => void;
  onWorkoutUncomplete: (workoutId: string) => void;
}

export function DailyWorkoutChecklist({
  dayPlan,
  completedWorkouts,
  onWorkoutComplete,
  onWorkoutUncomplete,
}: DailyWorkoutChecklistProps) {
  const totalWorkouts = dayPlan.workouts.length;
  const completedCount = dayPlan.workouts.filter(w => completedWorkouts.has(w.id)).length;
  const progress = totalWorkouts > 0 ? (completedCount / totalWorkouts) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-clinical-grey-100 text-clinical-grey-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Day {dayPlan.dayNumber} Workouts</CardTitle>
        <p className="text-sm text-clinical-grey-600 mt-1">
          {dayPlan.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-clinical-grey-700">
              Progress: {completedCount} / {totalWorkouts} workouts
            </span>
            <span className="text-sm font-semibold text-clinical-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-clinical-grey-200 rounded-full h-2.5">
            <div
              className="bg-clinical-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Workout Checklist */}
        <div className="space-y-4">
          {dayPlan.workouts.map((workout) => {
            const isCompleted = completedWorkouts.has(workout.id);

            return (
              <div
                key={workout.id}
                className={`
                  border rounded-lg p-4 transition-all
                  ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-clinical-grey-200'}
                `}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onWorkoutComplete(workout.id);
                      } else {
                        onWorkoutUncomplete(workout.id);
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className={`font-semibold ${isCompleted ? 'line-through text-clinical-grey-500' : 'text-clinical-grey-900'}`}>
                          {workout.name}
                        </h4>
                        <p className="text-sm text-clinical-grey-600 mt-1">
                          {workout.description}
                        </p>
                      </div>
                      <Badge className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>

                    {/* Workout Details */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-clinical-grey-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{workout.duration} min</span>
                      </div>
                      {workout.sets && workout.reps && (
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{workout.sets} sets × {workout.reps} reps</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{workout.targetLigament}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Day Completion Message */}
        {completedCount === totalWorkouts && totalWorkouts > 0 && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-sm font-semibold text-green-800 text-center">
              🎉 All workouts completed for today!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
