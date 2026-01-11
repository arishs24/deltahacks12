'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'clinician' | 'patient';

interface ViewContextType {
  viewMode: ViewMode;
  toggleView: () => void;
  isClinicianView: boolean;
  isPatientView: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
  // TODO: Replace with proper authentication/user context when backend is integrated
  // Future: const { user, role } = useAuth(); viewMode based on user.role
  const [viewMode, setViewMode] = useState<ViewMode>('clinician');

  const toggleView = () => {
    setViewMode((prev) => (prev === 'clinician' ? 'patient' : 'clinician'));
  };

  return (
    <ViewContext.Provider
      value={{
        viewMode,
        toggleView,
        isClinicianView: viewMode === 'clinician',
        isPatientView: viewMode === 'patient',
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}
