'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/**
 * useAuth Hook - NextAuth Integration
 * 
 * Client-side hook for accessing authenticated user data using NextAuth.
 * 
 * Returns:
 * - user: User object with name, email, role
 * - isLoading: Loading state
 * - error: Error state
 * - isAuthenticated: Boolean indicating if user is logged in
 * - role: User role ('clinician' | 'patient')
 * - isClinicianView: Boolean for clinician role
 * - isPatientView: Boolean for patient role
 */

export interface AuthUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: 'clinician' | 'patient';
  [key: string]: any;
}

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  role: 'clinician' | 'patient' | null;
  isClinicianView: boolean;
  isPatientView: boolean;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status} = useSession();
  const isLoading = status === 'loading';
  const user = session?.user as AuthUser | null;
  const role = user?.role || null;

  return {
    user,
    isLoading,
    error: null,
    isAuthenticated: !!session,
    role,
    isClinicianView: role === 'clinician',
    isPatientView: role === 'patient',
  };
}
