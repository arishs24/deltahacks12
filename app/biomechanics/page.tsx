'use client';

import { generateBiomechanicsData } from '@/data/mockData';
import ChartPlaceholder from '@/components/clinical/ChartPlaceholder';
import { Card, CardContent } from '@/components/ui/card';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

export default function BiomechanicsPage() {
  const biomechanicsData = generateBiomechanicsData();

  // Process data for charts
  const ligamentStressData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.ligamentStress,
  }));

  const strainData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.strain * 100, // Convert to percentage
  }));

  const stiffnessData = biomechanicsData.map((d, i) => ({
    x: i,
    y: d.stiffness,
  }));

  // Calculate statistics
  const avgStress =
    biomechanicsData.reduce((sum, d) => sum + d.ligamentStress, 0) /
    biomechanicsData.length;
  const avgStrain =
    biomechanicsData.reduce((sum, d) => sum + d.strain, 0) /
    biomechanicsData.length;
  const avgStiffness =
    biomechanicsData.reduce((sum, d) => sum + d.stiffness, 0) /
    biomechanicsData.length;

  return (
    <ClinicalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Biomechanics Data Panel</h1>
          <p className="mt-2 text-clinical-grey-600">
            Detailed analysis of ligament stress, strain, and tissue stiffness over time
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clinical-grey-600">Average Ligament Stress</p>
                  <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                    {avgStress.toFixed(1)} MPa
                  </p>
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
                  <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                    {(avgStrain * 100).toFixed(2)}%
                  </p>
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
                  <p className="text-sm font-medium text-clinical-grey-600">Average Stiffness</p>
                  <p className="mt-1 text-2xl font-bold text-clinical-grey-900">
                    {avgStiffness.toFixed(0)} N/m
                  </p>
                </div>
                <div className="rounded-full bg-yellow-100 p-3">
                  <Activity className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <ChartPlaceholder
            title="Ligament Stress Over Time"
            yAxisLabel="Stress"
            xAxisLabel="Days since initial assessment"
            data={ligamentStressData}
            trend="down"
            unit="MPa"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder
              title="Strain Analysis"
              yAxisLabel="Strain"
              xAxisLabel="Days since initial assessment"
              data={strainData}
              trend="down"
              unit="%"
            />

            <ChartPlaceholder
              title="Tissue Stiffness"
              yAxisLabel="Stiffness"
              xAxisLabel="Days since initial assessment"
              data={stiffnessData}
              trend="up"
              unit="N/m"
            />
          </div>
        </div>

        {/* Data Interpretation */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">Clinical Interpretation</h3>
            <div className="space-y-4 text-sm text-clinical-grey-700">
              <div>
                <h4 className="font-semibold text-clinical-grey-900 mb-2">
                  Stress Trends
                </h4>
                <p>
                  Ligament stress shows a gradual decrease over the 30-day monitoring period,
                  indicating positive healing response. Current values are within acceptable
                  ranges for intermediate rehabilitation stage.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-clinical-grey-900 mb-2">
                  Strain Analysis
                </h4>
                <p>
                  Tissue strain demonstrates progressive reduction, suggesting improved tissue
                  integrity and load distribution. Monitor for any sudden increases which may
                  indicate overloading.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-clinical-grey-900 mb-2">
                  Stiffness Progression
                </h4>
                <p>
                  Increasing stiffness values reflect tissue healing and remodeling processes.
                  These changes are consistent with expected rehabilitation progression for
                  ligament injuries.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClinicalLayout>
  );
}
