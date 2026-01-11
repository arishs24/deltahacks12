'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecoveryPlan } from '@/lib/recovery-planner';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecoveryCalendarProps {
  recoveryPlan: RecoveryPlan;
  completedWorkouts: Set<string>;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function RecoveryCalendar({
  recoveryPlan,
  completedWorkouts,
  selectedDate,
  onDateSelect,
}: RecoveryCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInPlan = (date: Date) => {
    return recoveryPlan.dailyPlans.some(
      plan => plan.date.toDateString() === date.toDateString()
    );
  };

  const isDateCompleted = (date: Date) => {
    const dayPlan = recoveryPlan.dailyPlans.find(
      plan => plan.date.toDateString() === date.toDateString()
    );
    if (!dayPlan) return false;
    return dayPlan.workouts.every(w => completedWorkouts.has(w.id));
  };

  const getDayProgress = (date: Date) => {
    const dayPlan = recoveryPlan.dailyPlans.find(
      plan => plan.date.toDateString() === date.toDateString()
    );
    if (!dayPlan) return 0;
    const completed = dayPlan.workouts.filter(w => completedWorkouts.has(w.id)).length;
    return dayPlan.workouts.length > 0 ? (completed / dayPlan.workouts.length) * 100 : 0;
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (Date | null)[] = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-clinical-grey-600 p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="aspect-square" />;
            }

            const inPlan = isDateInPlan(date);
            const completed = isDateCompleted(date);
            const progress = getDayProgress(date);
            const selected = isSelected(date);

            return (
              <button
                key={index}
                onClick={() => inPlan && onDateSelect(date)}
                disabled={!inPlan}
                className={`
                  aspect-square p-2 rounded-lg border-2 transition-all
                  ${selected ? 'border-clinical-blue-600 bg-clinical-blue-50' : 'border-clinical-grey-200'}
                  ${inPlan ? 'hover:border-clinical-blue-400 cursor-pointer' : 'opacity-30 cursor-not-allowed'}
                  ${completed ? 'bg-green-50 border-green-300' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className={`text-sm font-medium ${selected ? 'text-clinical-blue-900' : 'text-clinical-grey-900'}`}>
                    {date.getDate()}
                  </span>
                  {inPlan && (
                    <div className="mt-1">
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                      ) : progress > 0 ? (
                        <div className="w-full bg-clinical-grey-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-clinical-blue-600 h-1.5 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      ) : (
                        <Circle className="h-4 w-4 text-clinical-grey-400 mx-auto" />
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-clinical-grey-600">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-clinical-blue-600 rounded" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 text-clinical-grey-400" />
            <span>Planned</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
