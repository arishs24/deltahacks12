// Component extracted from: Viewer Page
// Gait scenario selection controls

import { GaitScenario } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ToggleGroup from '@/components/clinical/ToggleGroup';

interface GaitControlsPanelProps {
  gaitScenario: GaitScenario;
  onGaitChange: (scenario: GaitScenario) => void;
}

export function GaitControlsPanel({ gaitScenario, onGaitChange }: GaitControlsPanelProps) {
  const gaitOptions = [
    { value: 'standing', label: 'Standing' },
    { value: 'walking', label: 'Walking' },
    { value: 'running', label: 'Running' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gait Scenario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup
          options={gaitOptions}
          value={gaitScenario}
          onChange={(value) => onGaitChange(value as GaitScenario)}
          className="w-full flex-col"
        />
        <div className="p-4 bg-clinical-blue-50 rounded-lg border border-clinical-blue-100">
          <p className="text-sm text-clinical-grey-700">
            <span className="font-semibold">Current:</span>{' '}
            {gaitScenario.charAt(0).toUpperCase() + gaitScenario.slice(1)}
          </p>
          <p className="text-xs text-clinical-grey-600 mt-2">
            Switch between gait scenarios to view biomechanical changes
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
