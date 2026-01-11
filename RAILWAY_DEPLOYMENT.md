# Railway Deployment Guide

This document explains how to deploy the FastAPI RAG server to Railway.

## 🚀 Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Railway deployment config"
   git push origin main
   ```

2. **Deploy to Railway**:
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select this repository
   - Railway will auto-detect Python and deploy

3. **Add Environment Variables** in Railway:
   - `MOORCHEH_API_KEY` - Your Moorcheh API key
   - `GOOGLE_API_KEY` - Your Google Gemini API key
   - `MOORCHEH_NAMESPACE` - `Deltahacks12Text` (or your namespace)
   - `GEMINI_MODEL` - `gemini-2.5-flash` (optional, has default)

4. **Generate Domain** in Railway:
   - Go to Settings → Domains
   - Click "Generate Domain"
   - Copy your URL (e.g., `https://your-app.up.railway.app`)

5. **Update Vercel Environment Variables**:
   - Go to your Vercel project settings
   - Add environment variable:
     - Key: `RAG_API_URL`
     - Value: Your Railway URL (from step 4)
   - Redeploy your Next.js app

## 📁 Deployment Files

- **`Procfile`** - Tells Railway how to start the server
- **`runtime.txt`** - Specifies Python version
- **`requirements.txt`** - Python dependencies
- **`.railwayignore`** - Files to exclude from deployment (saves space & time)

## 🔍 Testing Your Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-app.up.railway.app/health

# Root endpoint
curl https://your-app.up.railway.app/

# API docs (interactive)
https://your-app.up.railway.app/docs
```

## 🐛 Troubleshooting

**Build fails with missing dependencies:**
- Check that all imports in `rag_api/` are in `requirements.txt`
- View build logs in Railway dashboard

**API returns 500 errors:**
- Check Railway logs for error messages
- Verify all environment variables are set correctly

**CORS errors in browser:**
- Check `rag_api/main.py` CORS settings include your Vercel domain
- Redeploy after making changes

**Timeout errors:**
- Gemini API calls can be slow on first request
- Railway free tier may have cold starts (15-30 seconds)

## 💰 Pricing

- **Free tier**: $5 credit/month
- **After free tier**: ~$5-10/month for typical usage
- Railway charges based on:
  - vCPU usage
  - Memory usage
  - Network egress

## 🔗 Architecture

```
User Browser
    ↓
Next.js on Vercel (/api/exercise-recommendation)
    ↓
FastAPI on Railway (/exercise-recommendation)
    ↓
Moorcheh RAG + Google Gemini
```

## 📊 Monitoring

View logs and metrics in Railway dashboard:
- Real-time logs: Deployments → View Logs
- Metrics: Observability tab
- Usage/Costs: Usage tab
