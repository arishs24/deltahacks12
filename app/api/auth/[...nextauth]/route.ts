import { handlers } from '@/lib/auth';

/**
 * NextAuth Route Handler for Next.js App Router
 * 
 * This handles all authentication routes:
 * - GET/POST /api/auth/signin - Sign in
 * - GET/POST /api/auth/signout - Sign out
 * - GET/POST /api/auth/callback/auth0 - Auth0 callback
 * - GET /api/auth/session - Get session
 * - GET /api/auth/providers - List providers
 * - GET /api/auth/csrf - CSRF token
 * 
 * The [...nextauth] dynamic route catches all auth-related requests.
 */

export const { GET, POST } = handlers;
