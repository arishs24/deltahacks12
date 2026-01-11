/**
 * Auth0 Configuration for Next.js App Router
 * 
 * This file provides a wrapper around Auth0 SDK to handle
 * authentication in Next.js 15+ with App Router.
 * 
 * Environment Variables Required:
 * - AUTH0_SECRET: Random string for encrypting session (min 32 chars)
 * - AUTH0_BASE_URL: Your app URL (http://localhost:3000 for dev)
 * - AUTH0_ISSUER_BASE_URL: Your Auth0 domain (https://xxx.auth0.com)
 * - AUTH0_CLIENT_ID: Auth0 application client ID
 * - AUTH0_CLIENT_SECRET: Auth0 application client secret
 * 
 * Auth0 Dashboard Configuration:
 * - Allowed Callback URLs: http://localhost:3000/api/auth/callback
 * - Allowed Logout URLs: http://localhost:3000
 * - Allowed Web Origins: http://localhost:3000
 */

// Validate required environment variables
const requiredEnvVars = [
  'AUTH0_SECRET',
  'AUTH0_BASE_URL',
  'AUTH0_ISSUER_BASE_URL',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required Auth0 environment variables: ${missingVars.join(', ')}\n` +
    'Please add them to your .env.local file.'
  );
}

export const auth0Config = {
  secret: process.env.AUTH0_SECRET!,
  baseURL: process.env.AUTH0_BASE_URL!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
  },
};
