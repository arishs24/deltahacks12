// Component extracted from: Settings Page
// Technical specifications section

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TechnicalInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm text-clinical-grey-700">
          <div>
            <h4 className="font-semibold text-clinical-grey-900 mb-2">
              Frontend Technology
            </h4>
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
  );
}
