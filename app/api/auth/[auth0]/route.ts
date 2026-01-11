/**
 * Auth0 Authentication Routes for Next.js App Router
 * 
 * This dynamic route handler manages all Auth0 authentication endpoints:
 * - GET /api/auth/login - Initiates Auth0 login flow
 * - GET /api/auth/logout - Logs out user and clears session
 * - GET /api/auth/callback - Handles OAuth callback from Auth0
 * - GET /api/auth/me - Returns current user session data
 * 
 * The dynamic [auth0] segment catches all auth-related routes.
 * 
 * Note: This is a simplified implementation for hackathon demo.
 * In production, use proper OAuth token exchange and encrypted sessions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth0Config } from '@/lib/auth0-config';
import { createSession, getSession, clearSession } from '@/lib/mock-session';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ auth0: string }> }
) {
  const { auth0: route } = await params;
  const baseUrl = auth0Config.baseURL;
  const issuer = auth0Config.issuerBaseURL;
  const clientId = auth0Config.clientID;
  const clientSecret = auth0Config.clientSecret;

  try {
    switch (route) {
      case 'login':
        // Redirect to Auth0 Universal Login
        const loginUrl = new URL(`${issuer}/authorize`);
        loginUrl.searchParams.set('response_type', 'code');
        loginUrl.searchParams.set('client_id', clientId);
        loginUrl.searchParams.set('redirect_uri', `${baseUrl}/api/auth/callback`);
        loginUrl.searchParams.set('scope', 'openid profile email');
        
        // Return to dashboard after login
        loginUrl.searchParams.set('state', encodeURIComponent('/dashboard'));
        
        return NextResponse.redirect(loginUrl.toString());

      case 'logout':
        // Clear session
        await clearSession();
        
        // Redirect to Auth0 logout
        const logoutUrl = new URL(`${issuer}/v2/logout`);
        logoutUrl.searchParams.set('client_id', clientId);
        logoutUrl.searchParams.set('returnTo', baseUrl);
        
        return NextResponse.redirect(logoutUrl.toString());

      case 'callback':
        // Handle OAuth callback
        const code = request.nextUrl.searchParams.get('code');
        
        if (!code) {
          return NextResponse.redirect(`${baseUrl}?error=no_code`);
        }

        try {
          // Exchange authorization code for tokens
          const tokenResponse = await fetch(`${issuer}/oauth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'authorization_code',
              client_id: clientId,
              client_secret: clientSecret,
              code,
              redirect_uri: `${baseUrl}/api/auth/callback`,
            }),
          });

          if (!tokenResponse.ok) {
            console.error('Token exchange failed:', await tokenResponse.text());
            return NextResponse.redirect(`${baseUrl}?error=token_exchange_failed`);
          }

          const tokens = await tokenResponse.json();

          // Get user info
          const userInfoResponse = await fetch(`${issuer}/userinfo`, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });

          if (!userInfoResponse.ok) {
            console.error('User info fetch failed');
            return NextResponse.redirect(`${baseUrl}?error=userinfo_failed`);
          }

          const userInfo = await userInfoResponse.json();

          // Extract role from user_metadata
          // Auth0 returns user_metadata in the ID token, not userinfo endpoint
          // So we need to decode the ID token
          const idTokenPayload = JSON.parse(
            Buffer.from(tokens.id_token.split('.')[1], 'base64').toString()
          );

          // Debug logging
          console.log('=== Auth0 Debug Info ===');
          console.log('User Info:', JSON.stringify(userInfo, null, 2));
          console.log('ID Token Payload:', JSON.stringify(idTokenPayload, null, 2));
          console.log('Looking for role in:');
          console.log('  - Custom claim:', idTokenPayload['https://knee-cds.com/role']);
          console.log('  - user_metadata:', idTokenPayload.user_metadata);
          console.log('  - Direct role:', idTokenPayload.role);

          // Try to get role from ID token first
          let role = 
            idTokenPayload['https://knee-cds.com/role'] ||
            idTokenPayload.user_metadata?.role ||
            idTokenPayload.role;

          // If no role found, fetch user details from Management API to get user_metadata
          if (!role) {
            console.log('No role in token, fetching from Management API...');
            try {
              // Get Management API token
              const mgmtTokenResponse = await fetch(`${issuer}/oauth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  grant_type: 'client_credentials',
                  client_id: clientId,
                  client_secret: clientSecret,
                  audience: `${issuer}/api/v2/`,
                }),
              });

              console.log('Management API token response status:', mgmtTokenResponse.status);

              if (mgmtTokenResponse.ok) {
                const mgmtToken = await mgmtTokenResponse.json();
                console.log('Got Management API token');
                
                // Fetch user details including metadata
                const userUrl = `${issuer}/api/v2/users/${encodeURIComponent(userInfo.sub)}`;
                console.log('Fetching user details from:', userUrl);
                
                const userDetailsResponse = await fetch(userUrl, {
                  headers: {
                    Authorization: `Bearer ${mgmtToken.access_token}`,
                  },
                });

                console.log('User details response status:', userDetailsResponse.status);

                if (userDetailsResponse.ok) {
                  const userDetails = await userDetailsResponse.json();
                  console.log('Full user details:', JSON.stringify(userDetails, null, 2));
                  console.log('user_metadata:', userDetails.user_metadata);
                  console.log('app_metadata:', userDetails.app_metadata);
                  role = userDetails.user_metadata?.role;
                  console.log('Role from user_metadata:', role);
                } else {
                  const errorText = await userDetailsResponse.text();
                  console.error('Failed to fetch user details:', errorText);
                }
              } else {
                const errorText = await mgmtTokenResponse.text();
                console.error('Failed to get Management API token:', errorText);
              }
            } catch (error) {
              console.error('Error fetching user metadata:', error);
            }
          }

          // Default to patient if still no role
          role = role || 'patient';
          
          console.log('Final role assigned:', role);
          console.log('=======================');

          // Create session
          await createSession({
            sub: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            role: role as 'clinician' | 'patient',
          });

          // Redirect to dashboard
          return NextResponse.redirect(`${baseUrl}/dashboard`);
        } catch (error) {
          console.error('Callback error:', error);
          return NextResponse.redirect(`${baseUrl}?error=callback_failed`);
        }

      case 'me':
        // Return current user session
        const session = await getSession();
        
        if (!session) {
          return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
          );
        }

        return NextResponse.json(session);

      default:
        return NextResponse.json(
          { error: 'Route not found' },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error('Auth0 route error:', error);
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 500 }
    );
  }
}
