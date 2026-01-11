// Component extracted from: Viewer Page, Biomechanics Page
// Clinical interpretation of biomechanical data

import { Card, CardContent } from '@/components/ui/card';

interface BiomechanicsInterpretationCardProps {
  isPatientView?: boolean;
}

export function BiomechanicsInterpretationCard({
  isPatientView = false,
}: BiomechanicsInterpretationCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-clinical-grey-900 mb-4">
          Clinical Interpretation
        </h3>
        <div className="space-y-4 text-sm text-clinical-grey-700">
          <div>
            <h4 className="font-semibold text-clinical-grey-900 mb-2">Stress Trends</h4>
            <p>
              {isPatientView
                ? 'Ligament stress shows a gradual decrease over the monitoring period, indicating positive healing response. Progress is within acceptable ranges for your current rehabilitation stage.'
                : 'Ligament stress shows a gradual decrease over the 30-day monitoring period, indicating positive healing response. Current values are within acceptable ranges for intermediate rehabilitation stage.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-clinical-grey-900 mb-2">Strain Analysis</h4>
            <p>
              {isPatientView
                ? 'Tissue strain demonstrates progressive reduction, suggesting improved tissue integrity and load distribution. Monitor for any sudden changes which may indicate overloading.'
                : 'Tissue strain demonstrates progressive reduction, suggesting improved tissue integrity and load distribution. Monitor for any sudden increases which may indicate overloading.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-clinical-grey-900 mb-2">
              Stiffness Progression
            </h4>
            <p>
              {isPatientView
                ? 'Increasing stiffness reflects tissue healing and remodeling processes. These changes are consistent with expected rehabilitation progression for ligament injuries.'
                : 'Increasing stiffness values reflect tissue healing and remodeling processes. These changes are consistent with expected rehabilitation progression for ligament injuries.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
