// Component extracted from: Viewer Page
// 3D Model viewer placeholder with biomechanical data overlay

import { GaitScenario, TissueType, Patient } from '@/types/clinical';
import { Card, CardContent } from '@/components/ui/card';
import { Box, Layers } from 'lucide-react';

interface Model3DViewerProps {
  gaitScenario: GaitScenario;
  visibleTissues: Set<TissueType>;
  selectedPatient?: Patient;
  isPatientView: boolean;
}

export function Model3DViewer({
  gaitScenario,
  visibleTissues,
  selectedPatient,
  isPatientView,
}: Model3DViewerProps) {
  const tissues = [
    { value: 'ligaments', label: 'Ligaments' },
    { value: 'cartilage', label: 'Cartilage' },
    { value: 'bone', label: 'Bone' },
    { value: 'tendons', label: 'Tendons' },
  ];

  return (
    <Card>
      <CardContent className="p-6 h-[600px]">
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-clinical-grey-50 to-clinical-grey-100 rounded-lg border-2 border-dashed border-clinical-grey-300 relative overflow-hidden">
          {/* Placeholder 3D visualization area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Box className="h-48 w-48 text-clinical-grey-300" />
          </div>

          {/* Overlay information */}
          <div className="relative z-10 text-center space-y-4 p-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-clinical-grey-200">
              <Layers className="h-5 w-5 text-clinical-blue-600" />
              <span className="font-semibold text-clinical-grey-900">
                3D Knee Model Viewer
              </span>
            </div>
            {/* Clinician-only: Show detailed labels and patient information */}
            {!isPatientView && (
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-clinical-grey-200">
                <p className="text-sm text-clinical-grey-600 mb-2">
                  <span className="font-semibold">Patient:</span> {selectedPatient?.name}
                </p>
                <p className="text-sm text-clinical-grey-600 mb-2">
                  <span className="font-semibold">Gait Scenario:</span>{' '}
                  {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
                </p>
                <p className="text-sm text-clinical-grey-600">
                  <span className="font-semibold">Visible Tissues:</span>{' '}
                  {Array.from(visibleTissues)
                    .map((t) => tissues.find((ts) => ts.value === t)?.label)
                    .join(', ') || 'None'}
                </p>
              </div>
            )}
            {/* Patient-specific: Simplified description without technical details */}
            <p className="text-xs text-clinical-grey-500 max-w-md">
              {isPatientView
                ? 'Interactive 3D visualization of your knee model for rehabilitation planning.'
                : 'This placeholder will be replaced with an interactive 3D visualization showing stress/strain distributions across knee tissues in real-time.'}
            </p>
          </div>

          {/* Simulated biomechanical data overlay - Clinician-only */}
          {!isPatientView && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-clinical-grey-200 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-clinical-grey-600">Peak Stress</p>
                  <p className="text-lg font-semibold text-clinical-grey-900">
                    {gaitScenario === 'standing' ? '2.4' : gaitScenario === 'walking' ? '8.7' : '15.2'} MPa
                  </p>
                </div>
                <div>
                  <p className="text-xs text-clinical-grey-600">Max Strain</p>
                  <p className="text-lg font-semibold text-clinical-grey-900">
                    {gaitScenario === 'standing' ? '0.03' : gaitScenario === 'walking' ? '0.12' : '0.24'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-clinical-grey-600">Load Factor</p>
                  <p className="text-lg font-semibold text-clinical-grey-900">
                    {gaitScenario === 'standing' ? '1.0x' : gaitScenario === 'walking' ? '2.8x' : '5.2x'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
