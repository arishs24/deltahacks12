// Component extracted from: Viewer Page
// Tissue visibility toggle controls

import { TissueType } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

interface TissueVisibilityPanelProps {
  visibleTissues: Set<TissueType>;
  onToggleTissue: (tissue: TissueType) => void;
}

export function TissueVisibilityPanel({
  visibleTissues,
  onToggleTissue,
}: TissueVisibilityPanelProps) {
  const tissues: Array<{ value: TissueType; label: string }> = [
    { value: 'ligaments', label: 'Ligaments' },
    { value: 'cartilage', label: 'Cartilage' },
    { value: 'bone', label: 'Bone' },
    { value: 'tendons', label: 'Tendons' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tissue Visibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tissues.map((tissue) => {
            const isVisible = visibleTissues.has(tissue.value);
            return (
              <button
                key={tissue.value}
                onClick={() => onToggleTissue(tissue.value)}
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
      </CardContent>
    </Card>
  );
}
