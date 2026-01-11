/**
 * Server-Side Authentication Utilities - Auth0 Integration
 * 
 * These functions should ONLY be used in Server Components or API Routes.
 * For client components, use the useAuth hook.
 * 
 * Note: Since @auth0/nextjs-auth0 v4 doesn't have full App Router support,
 * these are placeholder utilities. In production, you would:
 * 1. Use getSession() from @auth0/nextjs-auth0
 * 2. Validate JWT tokens
 * 3. Extract user data from session
 */

export interface ServerUser {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  role: 'clinician' | 'patient';
  [key: string]: any;
}

/**
 * Get the current authenticated user (server-side only)
 * 
 * Usage in API Routes:
 *   const user = await getAuthUser();
 *   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 * 
 * TODO: Implement with proper Auth0 session retrieval
 * For now, this is a placeholder that returns null
 */
export async function getAuthUser(): Promise<ServerUser | null> {
  // TODO: Implement Auth0 session retrieval
  // const session = await getSession();
  // if (!session || !session.user) return null;
  // Extract role and return user
  
  return null;
}

/**
 * Require authentication (server-side only)
 * 
 * Usage in API Routes:
 *   const user = await requireAuth();
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
