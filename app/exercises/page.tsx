'use client';

import { useState } from 'react';
import { mockExercises } from '@/data/mockData';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { ExerciseSummaryCards } from '@/components/exercises/ExerciseSummaryCards';
import { ExerciseFilters } from '@/components/exercises/ExerciseFilters';
import { ExerciseList } from '@/components/exercises/ExerciseList';

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
        <ExerciseSummaryCards
          totalCount={mockExercises.length}
          safeCount={safeCount}
          cautionCount={cautionCount}
        />

        {/* Filters */}
        <ExerciseFilters
          safetyFilter={safetyFilter}
          loadFilter={loadFilter}
          onSafetyFilterChange={setSafetyFilter}
          onLoadFilterChange={setLoadFilter}
          filteredCount={filteredExercises.length}
          totalCount={mockExercises.length}
        />

        {/* Exercise Cards */}
        <ExerciseList exercises={filteredExercises} />
      </div>
    </ClinicalLayout>
  );
}
