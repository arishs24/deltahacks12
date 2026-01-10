import { useState } from 'react';
import Card from '../components/ui/Card';
import ToggleGroup from '../components/ui/ToggleGroup';
import { GaitScenario, TissueType } from '../types';
import { Box, Layers, Eye, EyeOff } from 'lucide-react';

export default function KneeModelViewer() {
  const [gaitScenario, setGaitScenario] = useState<GaitScenario>('standing');
  const [visibleTissues, setVisibleTissues] = useState<Set<TissueType>>(
    new Set(['ligaments', 'cartilage', 'bone', 'tendons'])
  );

  const gaitOptions = [
    { value: 'standing', label: 'Standing' },
    { value: 'walking', label: 'Walking' },
    { value: 'running', label: 'Running' },
  ];

  const tissues: Array<{ value: TissueType; label: string }> = [
    { value: 'ligaments', label: 'Ligaments' },
    { value: 'cartilage', label: 'Cartilage' },
    { value: 'bone', label: 'Bone' },
    { value: 'tendons', label: 'Tendons' },
  ];

  const toggleTissue = (tissue: TissueType) => {
    const newVisible = new Set(visibleTissues);
    if (newVisible.has(tissue)) {
      newVisible.delete(tissue);
    } else {
      newVisible.add(tissue);
    }
    setVisibleTissues(newVisible);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-clinical-grey-900">Knee Model Viewer</h1>
        <p className="mt-2 text-clinical-grey-600">
          Interactive 3D visualization of knee biomechanics under different gait scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">
              Gait Scenario
            </h3>
            <ToggleGroup
              options={gaitOptions}
              value={gaitScenario}
              onChange={(value) => setGaitScenario(value as GaitScenario)}
              className="w-full flex-col"
            />
            <div className="mt-4 p-4 bg-clinical-blue-50 rounded-lg border border-clinical-blue-100">
              <p className="text-sm text-clinical-grey-700">
                <span className="font-semibold">Current:</span> {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
              </p>
              <p className="text-xs text-clinical-grey-600 mt-2">
                Switch between gait scenarios to view biomechanical changes
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">
              Tissue Visibility
            </h3>
            <div className="space-y-2">
              {tissues.map((tissue) => {
                const isVisible = visibleTissues.has(tissue.value);
                return (
                  <button
                    key={tissue.value}
                    onClick={() => toggleTissue(tissue.value)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors
                      ${
                        isVisible
                          ? 'border-clinical-blue-600 bg-clinical-blue-50'
                          : 'border-clinical-grey-200 hover:border-clinical-grey-300'
                      }
                    `}
                  >
                    <span className="font-medium text-clinical-grey-900">
                      {tissue.label}
                    </span>
                    {isVisible ? (
                      <Eye className="h-5 w-5 text-clinical-blue-600" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-clinical-grey-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* 3D Viewer Placeholder */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
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
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-clinical-grey-200">
                  <p className="text-sm text-clinical-grey-600 mb-2">
                    <span className="font-semibold">Gait Scenario:</span> {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
                  </p>
                  <p className="text-sm text-clinical-grey-600">
                    <span className="font-semibold">Visible Tissues:</span>{' '}
                    {Array.from(visibleTissues)
                      .map((t) => tissues.find((ts) => ts.value === t)?.label)
                      .join(', ') || 'None'}
                  </p>
                </div>
                <p className="text-xs text-clinical-grey-500 max-w-md">
                  This placeholder will be replaced with an interactive 3D visualization
                  showing stress/strain distributions across knee tissues in real-time.
                </p>
              </div>

              {/* Simulated biomechanical data overlay */}
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
