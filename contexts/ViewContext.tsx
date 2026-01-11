'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

/**
 * ViewContext - Auth0 Integrated
 * 
 * This context derives the view mode from Auth0 user role.
 * No manual toggle - view is determined by authentication.
 * 
 * Role-Based Views:
 * - Clinician: Full access, can add patients, see all data
 * - Patient: Limited access, view-only, no patient management
 * - Unauthenticated: Must login to access app
 */

type ViewMode = 'clinician' | 'patient';

interface ViewContextType {
  viewMode: ViewMode;
  isClinicianView: boolean;
  isPatientView: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
  const { role, isLoading, isAuthenticated } = useAuth();

  // View mode is determined by Auth0 user role
  // Default to 'patient' for unauthenticated users (they'll be redirected to login)
  const viewMode: ViewMode = role || 'patient';

  return (
    <ViewContext.Provider
      value={{
        viewMode,
        isClinicianView: viewMode === 'clinician',
        isPatientView: viewMode === 'patient',
        isLoading,
        isAuthenticated,
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
