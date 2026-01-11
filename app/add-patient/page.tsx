'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { UserPlus, Save } from 'lucide-react';

// Available structures grouped by type
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

// Rehab stage options
const REHAB_STAGES = ['Initial', 'Intermediate', 'Advanced'] as const;

interface PatientFormData {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  height: string;
  weight: string;
  injuryType: string;
  rehabStage: 'Initial' | 'Intermediate' | 'Advanced';
  affectedStructures: string[];
}

export default function AddPatientPage() {
  // Form state
  // TODO: Replace with MongoDB save operation when backend is integrated
  // Future: const { mutate: savePatient } = useMutation(savePatientToMongoDB)
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    injuryType: '',
    rehabStage: 'Initial',
    affectedStructures: [],
  });

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (value: 'Male' | 'Female' | 'Other') => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleRehabStageChange = (value: 'Initial' | 'Intermediate' | 'Advanced') => {
    setFormData((prev) => ({
      ...prev,
      rehabStage: value,
    }));
  };

  const handleStructureToggle = (structure: string) => {
    setFormData((prev) => {
      const currentStructures = prev.affectedStructures;
      const isSelected = currentStructures.includes(structure);
      
      return {
        ...prev,
        affectedStructures: isSelected
          ? currentStructures.filter((s) => s !== structure)
          : [...currentStructures, structure],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with MongoDB save operation when backend is integrated
    // Future: await savePatientToMongoDB(formData)
    // For now, log to console for testing
    console.log('Patient Form Data:', {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      height: '',
      weight: '',
      injuryType: '',
      rehabStage: 'Initial',
      affectedStructures: [],
    });
    
    alert('Patient data logged to console (see browser dev tools). MongoDB integration pending.');
  };

  return (
    <ClinicalLayout>
      {/* Layout: Centered form with max-width for readability, consistent vertical spacing */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-clinical-grey-900">Add Patient</h1>
          <p className="text-clinical-grey-600">
            Enter patient information to create a new clinical record
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Patient Information - Clear visual separation with Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Enter basic demographic and physical information for the patient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form Fields: Standardized spacing with grid layout for responsive alignment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field: Standardized spacing (space-y-2) for label-input pairs */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter patient full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                    onChange={(e) => handleInputChange('age', e.target.value)}
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
                  <Select value={formData.gender} onValueChange={handleGenderChange}>
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
                    onChange={(e) => handleInputChange('height', e.target.value)}
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
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Injury Details - Separate section for better visual grouping */}
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
                  onChange={(e) => handleInputChange('injuryType', e.target.value)}
                  required
                />
              </div>

              {/* Rehab Stage Field */}
              <div className="space-y-2">
                <Label htmlFor="rehabStage">
                  Rehab Stage <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.rehabStage}
                  onValueChange={handleRehabStageChange}
                >
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

          {/* Section 3: Affected Structures - Enhanced spacing and visual grouping */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Affected Structures</CardTitle>
              <CardDescription>
                Select all knee structures affected by the injury
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Structure Groups: Improved spacing with consistent padding and visual separation */}
              <div className="p-5 border border-clinical-grey-200 rounded-lg bg-clinical-grey-50 space-y-5">
                {STRUCTURE_GROUPS.map((group, groupIndex) => (
                  <div key={group.type} className={groupIndex > 0 ? 'pt-5 border-t border-clinical-grey-200' : ''}>
                    {/* Group Header: Clear visual separation with consistent styling */}
                    <h4 className="text-sm font-semibold text-clinical-grey-900 mb-3">
                      {group.type}
                    </h4>
                    {/* Structure Options: Consistent spacing and alignment for checkboxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {group.structures.map((structure) => (
                        <div key={structure} className="flex items-center space-x-2.5">
                          <Checkbox
                            id={`structure-${structure}`}
                            checked={formData.affectedStructures.includes(structure)}
                            onCheckedChange={() => handleStructureToggle(structure)}
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

              {/* Selected Structures Display: Improved spacing and styling */}
              {formData.affectedStructures.length === 0 && (
                <p className="text-sm text-clinical-grey-500 italic">
                  Please select at least one affected structure
                </p>
              )}
              {formData.affectedStructures.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-sm font-medium text-clinical-grey-700">
                    Selected ({formData.affectedStructures.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.affectedStructures.map((structure) => (
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

          {/* Submit Actions: Improved spacing and alignment */}
          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  name: '',
                  age: '',
                  gender: 'Male',
                  height: '',
                  weight: '',
                  injuryType: '',
                  rehabStage: 'Initial',
                  affectedStructures: [],
                });
              }}
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              disabled={formData.affectedStructures.length === 0}
              className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Patient
            </Button>
          </div>
        </form>

        {/* Information Note: Consistent spacing with form sections */}
        <Card className="bg-clinical-blue-50 border-clinical-blue-200">
          <CardContent className="p-5">
            <p className="text-sm text-clinical-grey-700">
              <strong>Note:</strong> This form currently saves data to the browser console for testing.
              MongoDB integration will be added in a future update to persist patient records.
            </p>
          </CardContent>
        </Card>
      </div>
    </ClinicalLayout>
  );
}
