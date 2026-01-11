// Component extracted from: Viewer Page, Biomechanics Page
// Summary statistics for biomechanical data

import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

interface BiomechanicsStatsCardsProps {
  avgStress: number;
  avgStrain: number;
  avgStiffness: number;
  isPatientView?: boolean;
}

export function BiomechanicsStatsCards({
  avgStress,
  avgStrain,
  avgStiffness,
  isPatientView = false,
}: BiomechanicsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">
                Average Ligament Stress
              </p>
              {!isPatientView && (
                <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                  {avgStress.toFixed(1)} MPa
                </p>
              )}
            </div>
            <div className="rounded-full bg-clinical-blue-100 p-3">
              <BarChart3 className="h-6 w-6 text-clinical-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">Average Strain</p>
              {!isPatientView && (
                <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                  {(avgStrain * 100).toFixed(2)}%
                </p>
              )}
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-clinical-grey-600">
                Average Stiffness
              </p>
              {!isPatientView && (
                <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                  {avgStiffness.toFixed(0)} N/m
                </p>
              )}
            </div>
            <div className="rounded-full bg-yellow-100 p-3">
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
