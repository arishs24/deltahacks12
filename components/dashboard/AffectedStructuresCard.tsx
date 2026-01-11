// Component extracted from: Dashboard Page
// Displays the affected structures for a patient

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AffectedStructuresCardProps {
  structures: string[];
}

export function AffectedStructuresCard({ structures }: AffectedStructuresCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Affected Structures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {structures.map((structure) => (
            <Badge key={structure} variant="destructive">
              {structure}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
