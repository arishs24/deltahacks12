// Component extracted from: Add Patient Page
// Patient demographic information form section

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PatientInformationSectionProps {
  formData: {
    name: string;
    age: string;
    gender: 'Male' | 'Female' | 'Other';
    height: string;
    weight: string;
  };
  onInputChange: (field: string, value: string) => void;
  onGenderChange: (value: 'Male' | 'Female' | 'Other') => void;
}

export function PatientInformationSection({
  formData,
  onInputChange,
  onGenderChange,
}: PatientInformationSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Patient Information</CardTitle>
        <CardDescription>
          Enter basic demographic and physical information for the patient
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter patient full name"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              required
            />
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age in years"
              value={formData.age}
              onChange={(e) => onInputChange('age', e.target.value)}
              min="0"
              max="150"
              required
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <Label htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.gender} onValueChange={onGenderChange}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Height Field */}
          <div className="space-y-2">
            <Label htmlFor="height">
              Height (cm) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height in centimeters"
              value={formData.height}
              onChange={(e) => onInputChange('height', e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Weight Field */}
          <div className="space-y-2">
            <Label htmlFor="weight">
              Weight (kg) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight in kilograms"
              value={formData.weight}
              onChange={(e) => onInputChange('weight', e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
