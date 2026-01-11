/**
 * Mock Session Management for Hackathon Demo
 * 
 * This is a simplified session management system for demonstration purposes.
 * In production, you would use proper Auth0 session management with encrypted cookies.
 * 
 * For this hackathon, we're using a simple approach:
 * - Store user data in a cookie after Auth0 authentication
 * - Read from cookie to check authentication status
 * - Clear cookie on logout
 */

import { cookies } from 'next/headers';

export interface SessionUser {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  role: 'clinician' | 'patient';
}

const SESSION_COOKIE_NAME = 'demo_session';

/**
 * Create a session (call this after Auth0 callback)
 */
export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Get current session
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    const user = JSON.parse(sessionCookie.value) as SessionUser;
    return user;
  } catch (error) {
    console.error('Error reading session:', error);
    return null;
  }
}

/**
 * Clear session (logout)
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
