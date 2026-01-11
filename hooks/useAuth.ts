'use client';

import { useEffect, useState } from 'react';

/**
 * useAuth Hook - Auth0 Integration
 * 
 * Client-side hook for accessing authenticated user data from Auth0.
 * Fetches session data from /api/auth/me endpoint.
 * 
 * Role Detection:
 * - Checks Auth0 custom claim: https://knee-cds.com/role
 * - Falls back to user_metadata.role
 * - Defaults to 'patient' if no role found
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
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  role: 'clinician' | 'patient';
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/me');
        
        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          
          // Extract role from Auth0 user data
          const role = 
            data['https://knee-cds.com/role'] ||
            data.user_metadata?.role ||
            data.role ||
            'patient';
          
          setUser({ ...data, role });
        } else if (response.status === 401) {
          // Not authenticated
          setUser(null);
        } else {
          throw new Error('Failed to fetch session');
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const role = user?.role || null;

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    role,
    isClinicianView: role === 'clinician',
    isPatientView: role === 'patient',
  };
}
