'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { Info, AlertTriangle, Stethoscope, FileText, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ClinicalLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Settings & About</h1>
          <p className="mt-2 text-clinical-grey-600">
            Application information, disclaimers, and configuration
          </p>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Knee Injury CDS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-clinical-grey-700">
              <div className="flex items-start gap-3">
                <Stethoscope className="h-5 w-5 text-clinical-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-clinical-grey-900 mb-2">Application Purpose</h3>
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
                  <h3 className="font-semibold text-clinical-grey-900 mb-2">Version Information</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Version:</span> 1.0.0</p>
                    <p><span className="font-medium">Release Date:</span> 2024</p>
                    <p><span className="font-medium">Build:</span> Production</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-clinical-grey-900 mb-3">Important Disclaimer</h3>
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

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-clinical-grey-700">
              <div>
                <h4 className="font-semibold text-clinical-grey-900 mb-2">Frontend Technology</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Next.js 15 with React 19</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS for styling</li>
                  <li>shadcn/ui component library</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-clinical-grey-900 mb-2">Data Sources</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Finite Element Analysis (FEA) simulation outputs</li>
                  <li>Biomechanical models of knee joint tissues</li>
                  <li>Evidence-based rehabilitation protocols</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-clinical-grey-700">
              <p>
                For technical support, feature requests, or reporting issues, please contact the
                development team through your organization&apos;s IT support channels.
              </p>
              <div className="flex items-center gap-2 text-clinical-grey-600">
                <Shield className="h-4 w-4" />
                <span>All patient data is handled according to HIPAA compliance standards</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClinicalLayout>
  );
}
