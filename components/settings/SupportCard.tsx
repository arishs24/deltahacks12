// Component extracted from: Settings Page
// Support and contact information section

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export function SupportCard() {
  return (
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
  );
}
