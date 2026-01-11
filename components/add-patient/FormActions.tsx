// Component extracted from: Add Patient Page
// Form action buttons (Clear and Save)

import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface FormActionsProps {
  onClear: () => void;
  isDisabled: boolean;
}

export function FormActions({ onClear, isDisabled }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4 pt-2">
      <Button type="button" variant="outline" onClick={onClear}>
        Clear Form
      </Button>
      <Button
        type="submit"
        disabled={isDisabled}
        className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Patient
      </Button>
    </div>
  );
}
