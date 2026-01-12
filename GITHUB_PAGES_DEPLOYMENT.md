# GitHub Pages Deployment Guide

This guide explains how to deploy your Next.js application to GitHub Pages.

## ⚠️ Important Limitations

**GitHub Pages only serves static files**. This means:

1. **Next.js API Routes won't work** - Routes like `/api/patients`, `/api/exercise-recommendation` require a Node.js server
2. **FastAPI backend must be deployed separately** - Deploy your `rag_api` backend to:
   - [Railway](https://railway.app)
   - [Render](https://render.com)
   - [Heroku](https://heroku.com)
   - [Fly.io](https://fly.io)
   - Or any other platform that supports Python/FastAPI

3. **MongoDB connections won't work** - Database operations require server-side code

## Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the changes

**📌 Note about Private Repositories**: 
- ✅ **You can deploy from a private repository** - Your repo can remain private
- ⚠️ **Your website will be publicly accessible** - Anyone with the URL can access your deployed site
- 🔒 To keep both repo and website private, you need **GitHub Enterprise** (paid plan)

### 2. Configure Repository Name (if needed)

If your repository name is not `deltahacks12`, you may need to update the basePath in `next.config.ts` or set it via environment variable.

### 3. Set Up Backend Deployment

Since your app uses API routes and a FastAPI backend, you need to:

#### Option A: Deploy FastAPI Backend Separately

Deploy your `rag_api` backend to a hosting service that supports Python:

**Example: Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd rag_api
railway init

# Deploy
railway up
```

Then update your frontend to point to the deployed backend URL:
- Update `RAG_API_URL` environment variable
- Update API routes to proxy to the deployed backend

#### Option B: Use a Different Hosting Platform

For a complete Next.js deployment with API routes:

- **[Vercel](https://vercel.com)** - Recommended for Next.js (made by Next.js creators)
- **[Netlify](https://netlify.com)** - Supports Next.js with serverless functions
- **[Railway](https://railway.app)** - Supports full-stack apps

### 4. Push to GitHub

The GitHub Actions workflow will automatically deploy when you push to `main` or `master`:

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 5. Monitor Deployment

1. Go to **Actions** tab in your GitHub repository
2. Watch the workflow run
3. Once complete, your site will be available at:
   - `https://<username>.github.io/<repository-name>/`

## Workflow Details

The `.github/workflows/deploy.yml` workflow:
1. Builds your Next.js app as a static export
2. Creates a `.nojekyll` file (prevents Jekyll processing)
3. Deploys to GitHub Pages

## Troubleshooting

### Issue: Pages not loading correctly

**Solution**: Ensure `basePath` matches your repository name in `next.config.ts`

### Issue: API routes return 404

**Solution**: API routes don't work on GitHub Pages. You need to:
1. Deploy backend separately
2. Update frontend to use external API URLs
3. Or use Vercel/Netlify for full Next.js support

### Issue: Images not loading

**Solution**: Ensure `images.unoptimized: true` is set in `next.config.ts` (already configured)

### Issue: Build fails

**Solution**: Check GitHub Actions logs for specific errors. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

## Alternative: Deploy to Vercel (Recommended)

For a complete Next.js deployment with all features working:

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect Next.js and configure everything
4. API routes will work automatically
5. Deploy with one click!

## Environment Variables

If you need environment variables for static export:

1. Create `.env.production` file
2. Variables starting with `NEXT_PUBLIC_` will be included in the build
3. For secrets, use Vercel/Netlify environment variable configuration

## Next Steps

1. ✅ GitHub Pages is configured
2. ⚠️ Deploy FastAPI backend separately
3. ⚠️ Update frontend API URLs to point to deployed backend
4. ⚠️ Consider Vercel/Netlify for full functionality
