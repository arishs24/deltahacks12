import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

/**
 * NextAuth Configuration for Auth0
 * 
 * This configures NextAuth.js (Auth.js v5) with Auth0 provider.
 * Supports Next.js App Router out of the box.
 * 
 * Environment variables required:
 * - AUTH0_CLIENT_ID
 * - AUTH0_CLIENT_SECRET
 * - AUTH0_ISSUER_BASE_URL (should be https://domain format)
 * - NEXTAUTH_SECRET (generate with: openssl rand -hex 32)
 * - NEXTAUTH_URL (http://localhost:3000 for development)
 * 
 * Auth0 Dashboard Configuration Required:
 * - Callback URLs: http://localhost:3000/api/auth/callback/auth0
 * - Logout URLs: http://localhost:3000
 * - Web Origins: http://localhost:3000
 */

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined. Please add it to your .env.local file.');
}

if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error('AUTH0_CLIENT_ID is not defined. Please add it to your .env.local file.');
}

if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error('AUTH0_CLIENT_SECRET is not defined. Please add it to your .env.local file.');
}

if (!process.env.AUTH0_ISSUER_BASE_URL) {
  throw new Error('AUTH0_ISSUER_BASE_URL is not defined. Please add it to your .env.local file.');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Add role from Auth0 user_metadata to token
      if (profile) {
        // Check multiple possible locations for the role
        const role =
          (profile as any)['https://knee-cds.com/role'] ||
          (profile as any).user_metadata?.role ||
          (profile as any).role ||
          'patient'; // Default to patient

        token.role = role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (token?.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/api/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});
