// Component extracted from: Add Patient Page
// Affected structures selection form section

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const STRUCTURE_GROUPS = [
  {
    type: 'Ligaments',
    structures: ['ACL', 'PCL', 'MCL', 'LCL'],
  },
  {
    type: 'Bones',
    structures: ['Femur', 'Tibia', 'Patella'],
  },
  {
    type: 'Cartilage',
    structures: ['Articular cartilage', 'Medial Meniscus', 'Lateral Meniscus'],
  },
  {
    type: 'Muscles',
    structures: ['Quadriceps', 'Hamstrings', 'Gastrocnemius'],
  },
];

interface AffectedStructuresSectionProps {
  selectedStructures: string[];
  onToggleStructure: (structure: string) => void;
}

export function AffectedStructuresSection({
  selectedStructures,
  onToggleStructure,
}: AffectedStructuresSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Affected Structures</CardTitle>
        <CardDescription>
          Select all knee structures affected by the injury
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-5 border border-clinical-grey-200 rounded-lg bg-clinical-grey-50 space-y-5">
          {STRUCTURE_GROUPS.map((group, groupIndex) => (
            <div
              key={group.type}
              className={groupIndex > 0 ? 'pt-5 border-t border-clinical-grey-200' : ''}
            >
              <h4 className="text-sm font-semibold text-clinical-grey-900 mb-3">
                {group.type}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {group.structures.map((structure) => (
                  <div key={structure} className="flex items-center space-x-2.5">
                    <Checkbox
                      id={`structure-${structure}`}
                      checked={selectedStructures.includes(structure)}
                      onCheckedChange={() => onToggleStructure(structure)}
                      className="flex-shrink-0"
                    />
                    <Label
                      htmlFor={`structure-${structure}`}
                      className="text-sm font-medium leading-normal cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {structure}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedStructures.length === 0 && (
          <p className="text-sm text-clinical-grey-500 italic">
            Please select at least one affected structure
          </p>
        )}
        {selectedStructures.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="text-sm font-medium text-clinical-grey-700">
              Selected ({selectedStructures.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedStructures.map((structure) => (
                <span
                  key={structure}
                  className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-clinical-blue-100 text-clinical-blue-800 border border-clinical-blue-200"
                >
                  {structure}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
