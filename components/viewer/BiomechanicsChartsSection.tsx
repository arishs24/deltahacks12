// Component extracted from: Viewer Page, Biomechanics Page
// Biomechanics charts display section

import ChartPlaceholder from '@/components/clinical/ChartPlaceholder';

interface BiomechanicsChartsSectionProps {
  ligamentStressData: Array<{ x: number; y: number }>;
  strainData: Array<{ x: number; y: number }>;
  stiffnessData: Array<{ x: number; y: number }>;
  hideNumbers?: boolean;
}

export function BiomechanicsChartsSection({
  ligamentStressData,
  strainData,
  stiffnessData,
  hideNumbers = false,
}: BiomechanicsChartsSectionProps) {
  return (
    <div className="space-y-6">
      <ChartPlaceholder
        title="Ligament Stress Over Time"
        yAxisLabel="Stress"
        xAxisLabel="Days since initial assessment"
        data={ligamentStressData}
        trend="down"
        unit="MPa"
        hideNumbers={hideNumbers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Strain Analysis"
          yAxisLabel="Strain"
          xAxisLabel="Days since initial assessment"
          data={strainData}
          trend="down"
          unit="%"
          hideNumbers={hideNumbers}
        />

        <ChartPlaceholder
          title="Tissue Stiffness"
          yAxisLabel="Stiffness"
          xAxisLabel="Days since initial assessment"
          data={stiffnessData}
          trend="up"
          unit="N/m"
          hideNumbers={hideNumbers}
        />
      </div>
    </div>
  );
}
