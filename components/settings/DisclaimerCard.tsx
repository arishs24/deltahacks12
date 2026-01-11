// Component extracted from: Settings Page
// Important disclaimer section

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-clinical-grey-900 mb-3">
              Important Disclaimer
            </h3>
            <div className="space-y-3 text-sm text-clinical-grey-700 leading-relaxed bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-clinical-grey-900">
                Research Tool - Not a Medical Device
              </p>
              <p>
                This application is a research and educational tool intended to support clinical
                decision-making. It is <strong>not</strong> a medical device and should not be
                used as the sole basis for diagnostic or treatment decisions.
              </p>
              <p>
                Healthcare providers must exercise their professional judgment and consider
                individual patient circumstances, clinical history, and all available medical
                information when making treatment decisions.
              </p>
              <p>
                The biomechanical simulations and exercise recommendations provided by this tool
                are based on computational models and should be interpreted within the context of
                comprehensive clinical evaluation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
