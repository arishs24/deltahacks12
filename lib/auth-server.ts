import { auth } from '@/lib/auth';

/**
 * Server-Side Authentication Utilities - NextAuth Integration
 * 
 * These functions should ONLY be used in Server Components or API Routes.
 * For client components, use the useAuth hook.
 */

export interface ServerUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'clinician' | 'patient';
  [key: string]: any;
}

/**
 * Get the current authenticated user (server-side only)
 * 
 * Usage in Server Components:
 *   const user = await getAuthUser();
 *   if (!user) redirect('/api/auth/signin');
 */
export async function getAuthUser(): Promise<ServerUser | null> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return null;
    }

    const user = session.user as any;
    const role = user.role || 'patient'; // Default to patient

    return {
      ...user,
      role: role as 'clinician' | 'patient',
    };
  } catch (error) {
    console.error('Error getting auth user:', error);
    return null;
  }
}

/**
 * Require authentication (server-side only)
 * 
 * Usage in Server Components or API Routes:
 *   const user = await requireAuth();
 *   // user is guaranteed to be defined or redirect happens
 */
export async function requireAuth(): Promise<ServerUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

/**
 * Require clinician role (server-side only)
 * 
 * Usage in API Routes:
 *   const clinician = await requireClinician();
 *   // Only clinicians can reach this point
 */
export async function requireClinician(): Promise<ServerUser> {
  const user = await requireAuth();
  if (user.role !== 'clinician') {
    throw new Error('Clinician access required');
  }
  return user;
}

/**
 * Check if user has clinician role
 */
export async function isClinicianUser(): Promise<boolean> {
  const user = await getAuthUser();
  return user?.role === 'clinician';
}

/**
 * Check if user has patient role
 */
export async function isPatientUser(): Promise<boolean> {
  const user = await getAuthUser();
  return user?.role === 'patient';
}
