# Auth0 Authentication Setup

## Overview

This application uses Auth0 for authentication with role-based access control:
- **Clinician**: Full access, can add patients
- **Patient**: View-only access, no patient management

## Quick Setup

### 1. Environment Variables

Copy `.env.local.template` to `.env.local` or add these variables:

```bash
AUTH0_SECRET=c399a9296df939234ecd102ff900476f0c117c11b2e16f0b38cb6963c620d131
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://dev-wup3fgcwfjmpfmqa.us.auth0.com
AUTH0_CLIENT_ID=bAMqMYbHn3CimnJyVtCdGdEkp1eJaScj
AUTH0_CLIENT_SECRET=-pac_dgclZxg2AHK4xW91UWLXzLRm7k_bUvT4jgHON0PYY-yJWt_s5tKFUVm6lFe
```

### 2. Auth0 Dashboard Configuration

1. Go to https://manage.auth0.com/
2. Select your application
3. Configure these URLs:

```
Allowed Callback URLs: http://localhost:3000/api/auth/callback
Allowed Logout URLs: http://localhost:3000
Allowed Web Origins: http://localhost:3000
```

### 3. Set User Roles

**IMPORTANT**: You must set the role BEFORE logging in for the first time!

For each user in Auth0:

1. Go to **User Management** → **Users**
2. Click on the user (e.g., mihir.pullakhandam@gmail.com)
3. Scroll down to the **Metadata** section
4. Click on the **user_metadata** tab
5. In the JSON editor, add:

**For Clinician:**
```json
{
  "role": "clinician"
}
```

**For Patient:**
```json
{
  "role": "patient"
}
```

6. Click **Save** button at the bottom
7. **Log out completely** from your app (click Logout button)
8. **Log in again** - your role should now work!

**Troubleshooting:**
- If you're still seeing Patient view after setting role to "clinician":
  1. Make sure you saved the user_metadata in Auth0
  2. Log out completely from the app
  3. Clear your browser cookies for localhost:3000
  4. Log in again
- The role is captured during login, so you must log in AFTER setting the role

## Testing

```bash
npm run dev
```

Visit http://localhost:3000 and click **Login**.

## Architecture

### Authentication Flow

1. User clicks **Login** → `/api/auth/login`
2. Redirected to Auth0 Universal Login
3. After authentication → `/api/auth/callback`
4. Redirected to Dashboard

### Role-Based Access

- **Clinician users**:
  - See "Add Patient" tab
  - Can create patients
  - Full data access

- **Patient users**:
  - No "Add Patient" tab
  - View-only access
  - Redirected from clinician pages

### Files

- `lib/auth0-config.ts` - Auth0 configuration
- `app/api/auth/[auth0]/route.ts` - Auth routes
- `hooks/useAuth.ts` - Client-side auth hook
- `contexts/ViewContext.tsx` - Role-based view logic

## Notes

- Auth0 SDK v4.14.0 has limited App Router support
- Session management is simplified for hackathon use
- Full OAuth flow implementation pending
- API route protection is mocked (add real checks in production)

## Production Checklist

- [ ] Implement full OAuth code exchange in callback
- [ ] Add proper session management
- [ ] Protect API routes with Auth0 session checks
- [ ] Add CSRF protection
- [ ] Configure production URLs in Auth0 dashboard
- [ ] Use environment-specific secrets
