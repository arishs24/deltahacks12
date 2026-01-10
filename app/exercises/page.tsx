'use client';

import { useState } from 'react';
import { mockExercises } from '@/data/mockData';
import ExerciseCard from '@/components/clinical/ExerciseCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { Activity, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

type SafetyFilter = 'all' | 'safe' | 'caution';
type LoadFilter = 'all' | 'Low' | 'Moderate' | 'High';

export default function ExercisesPage() {
  const [safetyFilter, setSafetyFilter] = useState<SafetyFilter>('all');
  const [loadFilter, setLoadFilter] = useState<LoadFilter>('all');

  const filteredExercises = mockExercises.filter((exercise) => {
    if (safetyFilter !== 'all' && exercise.safetyStatus !== safetyFilter) {
      return false;
    }
    if (loadFilter !== 'all' && exercise.loadLevel !== loadFilter) {
      return false;
    }
    return true;
  });

  const safeCount = mockExercises.filter((e) => e.safetyStatus === 'safe').length;
  const cautionCount = mockExercises.filter((e) => e.safetyStatus === 'caution').length;

  return (
    <ClinicalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Exercise Recommendations</h1>
          <p className="mt-2 text-clinical-grey-600">
            AI-assisted rehabilitation exercise recommendations based on biomechanical analysis
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clinical-grey-600">Total Exercises</p>
                  <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                    {mockExercises.length}
                  </p>
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
                  <p className="mt-1 text-2xl font-bold text-green-600">
                    {safeCount}
                  </p>
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
                  <p className="mt-1 text-2xl font-bold text-yellow-600">
                    {cautionCount}
                  </p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-clinical-grey-600" />
                <span className="font-medium text-clinical-grey-900">Filters:</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-clinical-grey-600">Safety:</span>
                <div className="flex gap-2">
                  {(['all', 'safe', 'caution'] as SafetyFilter[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSafetyFilter(filter)}
                      className={`
                        px-3 py-1 rounded-md text-sm font-medium transition-colors
                        ${
                          safetyFilter === filter
                            ? 'bg-clinical-blue-600 text-white'
                            : 'bg-clinical-grey-100 text-clinical-grey-700 hover:bg-clinical-grey-200'
                        }
                      `}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-clinical-grey-600">Load:</span>
                <div className="flex gap-2">
                  {(['all', 'Low', 'Moderate', 'High'] as LoadFilter[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setLoadFilter(filter)}
                      className={`
                        px-3 py-1 rounded-md text-sm font-medium transition-colors
                        ${
                          loadFilter === filter
                            ? 'bg-clinical-blue-600 text-white'
                            : 'bg-clinical-grey-100 text-clinical-grey-700 hover:bg-clinical-grey-200'
                        }
                      `}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {filteredExercises.length !== mockExercises.length && (
                <Badge variant="outline" className="bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200">
                  Showing {filteredExercises.length} of {mockExercises.length}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Cards */}
        <div className="space-y-6">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))
          ) : (
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
          )}
        </div>
      </div>
    </ClinicalLayout>
  );
}
