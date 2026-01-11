// Component extracted from: Viewer Page, Exercises Page
// Exercise filtering controls

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

type SafetyFilter = 'all' | 'safe' | 'caution';
type LoadFilter = 'all' | 'Low' | 'Moderate' | 'High';

interface ExerciseFiltersProps {
  safetyFilter: SafetyFilter;
  loadFilter: LoadFilter;
  onSafetyFilterChange: (filter: SafetyFilter) => void;
  onLoadFilterChange: (filter: LoadFilter) => void;
  filteredCount: number;
  totalCount: number;
}

export function ExerciseFilters({
  safetyFilter,
  loadFilter,
  onSafetyFilterChange,
  onLoadFilterChange,
  filteredCount,
  totalCount,
}: ExerciseFiltersProps) {
  return (
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
                  onClick={() => onSafetyFilterChange(filter)}
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
                  onClick={() => onLoadFilterChange(filter)}
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

          {filteredCount !== totalCount && (
            <Badge
              variant="outline"
              className="bg-clinical-blue-100 text-clinical-blue-800 border-clinical-blue-200"
            >
              Showing {filteredCount} of {totalCount}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
