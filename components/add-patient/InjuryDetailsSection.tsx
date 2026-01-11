// Component extracted from: Add Patient Page
// Injury type and rehabilitation stage form section

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const REHAB_STAGES = ['Initial', 'Intermediate', 'Advanced'] as const;

interface InjuryDetailsSectionProps {
  formData: {
    injuryType: string;
    rehabStage: 'Initial' | 'Intermediate' | 'Advanced';
  };
  onInputChange: (field: string, value: string) => void;
  onRehabStageChange: (value: 'Initial' | 'Intermediate' | 'Advanced') => void;
}

export function InjuryDetailsSection({
  formData,
  onInputChange,
  onRehabStageChange,
}: InjuryDetailsSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Injury Details</CardTitle>
        <CardDescription>
          Enter injury type and rehabilitation stage information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Injury Type Field */}
        <div className="space-y-2">
          <Label htmlFor="injuryType">
            Injury Type <span className="text-red-500">*</span>
          </Label>
          <Input
            id="injuryType"
            type="text"
            placeholder="e.g., ACL Tear (Grade II), Meniscal Tear, etc."
            value={formData.injuryType}
            onChange={(e) => onInputChange('injuryType', e.target.value)}
            required
          />
        </div>

        {/* Rehab Stage Field */}
        <div className="space-y-2">
          <Label htmlFor="rehabStage">
            Rehab Stage <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.rehabStage} onValueChange={onRehabStageChange}>
            <SelectTrigger id="rehabStage">
              <SelectValue placeholder="Select rehabilitation stage" />
            </SelectTrigger>
            <SelectContent>
              {REHAB_STAGES.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
