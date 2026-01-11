'use client';

import { Bell, User, LogOut, LogIn } from 'lucide-react';
import { useView } from '@/contexts/ViewContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

/**
 * ClinicalHeader - Auth0 Integrated
 * 
 * Header component with Auth0 authentication controls.
 * 
 * Features:
 * - Displays authenticated user's name and role badge
 * - Login button for unauthenticated users → /api/auth/login
 * - Logout button for authenticated users → /api/auth/logout
 * - Shows current patient for clinicians only
 * - No manual role toggle (role comes from Auth0)
 */

interface ClinicalHeaderProps {
  currentPatient?: string;
}

export default function ClinicalHeader({ currentPatient }: ClinicalHeaderProps) {
  const { isPatientView, isClinicianView, isAuthenticated } = useView();
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-clinical-grey-200 bg-white px-6 shadow-sm">
      {/* Left side: Current Patient (Clinician view only) */}
      <div className="flex items-center">
        {currentPatient && isClinicianView && (
          <div className="text-sm">
            <span className="text-clinical-grey-500">Current Patient:</span>
            <span className="ml-2 font-medium text-clinical-grey-900">{currentPatient}</span>
          </div>
        )}
      </div>

      {/* Right side: User info and authentication controls */}
      <div className="flex items-center gap-4">
        {/* Notifications - only for authenticated users */}
        {isAuthenticated && (
          <button
            type="button"
            className="rounded-lg p-2 text-clinical-grey-600 hover:bg-clinical-grey-100 hover:text-clinical-grey-900"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
        )}

        {/* User Info and Role Badge */}
        {isAuthenticated && !isLoading && user && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-clinical-grey-50">
            <User className="h-5 w-5 text-clinical-grey-600" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-clinical-grey-900">
                {user.name || user.email}
              </span>
              <span className="text-xs text-clinical-grey-500">
                {isClinicianView ? 'Clinician' : 'Patient'}
              </span>
            </div>
          </div>
        )}

        {/* Authentication Buttons */}
        {!isLoading && (
          <>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/api/auth/logout'}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => window.location.href = '/api/auth/login'}
                className="flex items-center gap-2 bg-clinical-blue-600 hover:bg-clinical-blue-700"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
