'use client';

import { generateBiomechanicsData } from '@/data/mockData';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { BiomechanicsStatsCards } from '@/components/viewer/BiomechanicsStatsCards';
import { BiomechanicsChartsSection } from '@/components/viewer/BiomechanicsChartsSection';
import { BiomechanicsInterpretationCard } from '@/components/viewer/BiomechanicsInterpretationCard';

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
        <BiomechanicsStatsCards
          avgStress={avgStress}
          avgStrain={avgStrain}
          avgStiffness={avgStiffness}
        />

        {/* Charts */}
        <BiomechanicsChartsSection
          ligamentStressData={ligamentStressData}
          strainData={strainData}
          stiffnessData={stiffnessData}
        />

        {/* Data Interpretation */}
        <BiomechanicsInterpretationCard />
      </div>
    </ClinicalLayout>
  );
}
