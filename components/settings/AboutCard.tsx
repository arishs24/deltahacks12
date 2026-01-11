// Component extracted from: Settings Page
// About section with application information

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Info, FileText } from 'lucide-react';

export function AboutCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Knee Injury CDS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-clinical-grey-700">
          <div className="flex items-start gap-3">
            <Stethoscope className="h-5 w-5 text-clinical-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-clinical-grey-900 mb-2">
                Application Purpose
              </h3>
              <p className="leading-relaxed">
                The Knee Injury Clinical Decision Support (CDS) tool is designed to assist
                healthcare professionals in diagnosing knee injuries and planning rehabilitation
                programs. The application integrates biomechanical simulation data from finite
                element analysis (FEA) with clinical decision-making frameworks to provide
                evidence-based recommendations for patient care.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-clinical-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-clinical-grey-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 leading-relaxed ml-2">
                <li>Biomechanical data visualization from FEA simulations</li>
                <li>Interactive 3D knee model viewer for stress/strain analysis</li>
                <li>AI-assisted exercise recommendation system</li>
                <li>Gait scenario comparison (standing, walking, running)</li>
                <li>Longitudinal tracking of rehabilitation progress</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-clinical-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-clinical-grey-900 mb-2">
                Version Information
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Version:</span> 1.0.0
                </p>
                <p>
                  <span className="font-medium">Release Date:</span> 2024
                </p>
                <p>
                  <span className="font-medium">Build:</span> Production
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
