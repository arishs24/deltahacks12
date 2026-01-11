// Component extracted from: Dashboard Page
// Displays AI-generated clinical interpretation and feedback

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Brain } from 'lucide-react';

interface ClinicalInterpretationCardProps {
  interpretation: string;
  dataSufficient: boolean;
  geminiFeedback?: string;
}

export function ClinicalInterpretationCard({
  interpretation,
  dataSufficient,
  geminiFeedback,
}: ClinicalInterpretationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Interpretation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-clinical-grey-700">
          <p className="leading-relaxed whitespace-pre-wrap">{interpretation}</p>
          {!dataSufficient && (
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Note: Limited data available in knowledge base. Recommendations
                should be treated as general guidelines only.
              </p>
            </div>
          )}
          {geminiFeedback && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-800">
                <Brain className="h-4 w-4 inline mr-2" />
                <span className="font-medium">AI Feedback:</span> {geminiFeedback}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
