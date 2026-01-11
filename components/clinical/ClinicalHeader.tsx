'use client';

import { Bell, User } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';
import { useRouter } from 'next/navigation';

interface ClinicalHeaderProps {
  currentPatient?: string;
}

export default function ClinicalHeader({ currentPatient }: ClinicalHeaderProps) {
  const { toggleView, isPatientView } = useView();
  const router = useRouter();

  // Navigate to Dashboard when switching views
  const handleToggleView = () => {
    toggleView();
    router.push('/dashboard');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-clinical-grey-200 bg-white px-6 shadow-sm">
      {/* Patient-specific UI: Hide "Current Patient" label in Patient view - the app implicitly represents the signed-in patient */}
      <div className="flex items-center">
        {currentPatient && !isPatientView && (
          <div className="text-sm">
            <span className="text-clinical-grey-500">Current Patient:</span>
            <span className="ml-2 font-medium text-clinical-grey-900">{currentPatient}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-clinical-grey-600 hover:bg-clinical-grey-100 hover:text-clinical-grey-900"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        {/* Patient-specific UI: Show "Patient" instead of "Patient View" for cleaner UI */}
        <button
          type="button"
          onClick={handleToggleView}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-clinical-grey-600 hover:bg-clinical-grey-100 hover:text-clinical-grey-900 transition-colors cursor-pointer"
          aria-label="Toggle view mode"
        >
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">
            {isPatientView ? 'Patient' : 'Clinician'}
          </span>
        </button>
      </div>
    </header>
  );
}
