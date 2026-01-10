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

// Available ligaments for multi-select
const AVAILABLE_LIGAMENTS = ['ACL', 'PCL', 'MCL', 'LCL', 'Meniscus'];

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
  affectedLigaments: string[];
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
    affectedLigaments: [],
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

  const handleLigamentToggle = (ligament: string) => {
    setFormData((prev) => {
      const currentLigaments = prev.affectedLigaments;
      const isSelected = currentLigaments.includes(ligament);
      
      return {
        ...prev,
        affectedLigaments: isSelected
          ? currentLigaments.filter((l) => l !== ligament)
          : [...currentLigaments, ligament],
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
      affectedLigaments: [],
    });
    
    alert('Patient data logged to console (see browser dev tools). MongoDB integration pending.');
  };

  return (
    <ClinicalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Add Patient</h1>
          <p className="mt-2 text-clinical-grey-600">
            Enter patient information to create a new clinical record
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Enter basic demographic and physical information for the patient
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
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

                {/* Age */}
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

                {/* Gender */}
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

                {/* Height */}
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

                {/* Weight */}
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

          <Card>
            <CardHeader>
              <CardTitle>Clinical Information</CardTitle>
              <CardDescription>
                Enter injury details and rehabilitation stage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Injury Type */}
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

              {/* Rehab Stage */}
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

              {/* Affected Ligaments */}
              <div className="space-y-3">
                <Label>
                  Affected Ligaments <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-clinical-grey-200 rounded-lg bg-clinical-grey-50">
                  {AVAILABLE_LIGAMENTS.map((ligament) => (
                    <div key={ligament} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ligament-${ligament}`}
                        checked={formData.affectedLigaments.includes(ligament)}
                        onCheckedChange={() => handleLigamentToggle(ligament)}
                      />
                      <Label
                        htmlFor={`ligament-${ligament}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {ligament}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.affectedLigaments.length === 0 && (
                  <p className="text-sm text-clinical-grey-500">
                    Please select at least one affected ligament
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
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
                  affectedLigaments: [],
                });
              }}
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              disabled={formData.affectedLigaments.length === 0}
              className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Patient
            </Button>
          </div>
        </form>

        {/* Information Note */}
        <Card className="bg-clinical-blue-50 border-clinical-blue-200">
          <CardContent className="p-4">
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
