'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { SuccessToast, ErrorToast } from '@/components/ui/success-toast';
import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { PatientInformationSection } from '@/components/add-patient/PatientInformationSection';
import { InjuryDetailsSection } from '@/components/add-patient/InjuryDetailsSection';
import { AffectedStructuresSection } from '@/components/add-patient/AffectedStructuresSection';
import { FormActions } from '@/components/add-patient/FormActions';

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
  const router = useRouter();
  
  // Form state - Client-side state management
  // Server-side MongoDB operations are handled via /api/patients API route
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

  // Toast notification state
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.affectedStructures.length === 0) {
      setErrorMessage('Please select at least one affected structure');
      setShowErrorToast(true);
      return;
    }

    try {
      // Send POST request to server-side API route
      // Server-side code handles MongoDB connection and data persistence
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle error response from API
        throw new Error(data.error || 'Failed to save patient');
      }

      // Success - reset form and show success toast
      const patientName = formData.name;
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
      
      // Show success toast notification
      setShowSuccessToast(true);
      
      // Redirect to dashboard after 2 seconds to show the success toast
      // Dashboard will automatically fetch the updated patient list from MongoDB
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      // Handle network errors or API errors
      console.error('Error saving patient:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to save patient. Please try again.';
      setErrorMessage(errorMsg);
      setShowErrorToast(true);
    }
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
          {/* Section 1: Patient Information */}
          <PatientInformationSection
            formData={{
              name: formData.name,
              age: formData.age,
              gender: formData.gender,
              height: formData.height,
              weight: formData.weight,
            }}
            onInputChange={handleInputChange}
            onGenderChange={handleGenderChange}
          />

          {/* Section 2: Injury Details */}
          <InjuryDetailsSection
            formData={{
              injuryType: formData.injuryType,
              rehabStage: formData.rehabStage,
            }}
            onInputChange={handleInputChange}
            onRehabStageChange={handleRehabStageChange}
          />

          {/* Section 3: Affected Structures */}
          <AffectedStructuresSection
            selectedStructures={formData.affectedStructures}
            onToggleStructure={handleStructureToggle}
          />

          {/* Submit Actions */}
          <FormActions
            onClear={() => {
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
            isDisabled={formData.affectedStructures.length === 0}
          />
        </form>

        {/* Information Note: Consistent spacing with form sections */}
        <Card className="bg-clinical-blue-50 border-clinical-blue-200">
          <CardContent className="p-5">
            <p className="text-sm text-clinical-grey-700">
              <strong>Note:</strong> Patient data is saved to MongoDB Atlas. All information is securely stored in the database.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Success Toast Notification */}
      <SuccessToast
        isVisible={showSuccessToast}
        title="Patient Successfully Added"
        description="The patient has been saved to the database and is now available in the system."
        onDismiss={() => setShowSuccessToast(false)}
        duration={5000}
      />

      {/* Error Toast Notification */}
      <ErrorToast
        isVisible={showErrorToast}
        title="Error Saving Patient"
        description={errorMessage}
        onDismiss={() => setShowErrorToast(false)}
        duration={7000}
      />
    </ClinicalLayout>
  );
}
