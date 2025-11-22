# Backend Deployment to Vercel - Complete Guide

This guide will help you deploy your Express.js backend to Vercel as serverless functions.

## 📋 Prerequisites

- ✅ Code pushed to GitHub (already done)
- ✅ Vercel account
- ✅ MongoDB Atlas database
- ✅ All API keys ready

## 🚀 Deployment Steps

### Step 1: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select `hasibur-me/evanio`
4. Click "Import"

### Step 2: Configure Project Settings

**Important**: Configure these settings:

- **Framework Preset**: Other (or leave blank)
- **Root Directory**: `.` (project root - **THIS IS CRITICAL**)
  - ✅ Correct: `.` (root directory)
  - ❌ Wrong: `server` or `api` or any subdirectory
  - The `api/index.js` file must be at the root level for Vercel to detect it
- **Build Command**: Leave empty (or `echo "No build needed"`)
- **Output Directory**: Leave empty
- **Install Command**: `cd server && npm install` (installs server dependencies)

**OR** use the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **evanio-api** (or your choice)
- Directory? **./**
- Override settings? **No**

### Step 3: Set Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add **ALL** these variables:

```env
# Server
NODE_ENV=production
PORT=5000

# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (will be your Vercel frontend URL)
FRONTEND_URL=https://your-frontend.vercel.app

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# UploadThing
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Resend
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=Evanio <hello@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

# Vercel (auto-set, but you can verify)
VERCEL=1
```

**Important Notes:**
- Replace all placeholder values with your actual keys
- `FRONTEND_URL` should be your frontend Vercel URL (set after frontend deployment)
- MongoDB Atlas connection string should allow connections from anywhere (`0.0.0.0/0`)

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for deployment to complete (2-5 minutes)
3. Copy your API URL (e.g., `https://evanio-api.vercel.app`)

### Step 5: Test Your API

Test the health endpoint:
```bash
curl https://your-api-url.vercel.app/api/health
```

Expected response:
```json
{
  "message": "Server is running",
  "environment": "Vercel Serverless",
  "timestamp": "2025-01-XX..."
}
```

## 🔧 Configuration Details

### How It Works

1. **Serverless Functions**: Each API route becomes a serverless function
2. **Entry Point**: `api/index.js` handles all `/api/*` routes
3. **MongoDB Connection**: Connection is reused across invocations (warm connections)
4. **CORS**: Automatically configured for Vercel domains

### File Structure

```
/ (Root Directory = ".")
├── api/
│   └── index.js          # Vercel serverless function entry point (MUST be at root/api/)
├── server/
│   ├── server.js         # Express app (modified for serverless)
│   ├── routes/           # All API routes
│   ├── controllers/      # Controllers
│   ├── models/          # MongoDB models
│   └── ...
├── vercel.json           # Vercel configuration (at root)
└── package.json          # Root package.json
```

**Why Root Directory = "."?**
- Vercel looks for `api/` folder at the root level
- The `api/index.js` file is the serverless function entry point
- `vercel.json` must be at the root to configure routes
- Server code in `server/` is imported by `api/index.js`

### Vercel Configuration (`vercel.json`)

The `vercel.json` file routes:
- `/api/*` → `api/index.js` (serverless function)
- `/*` → Frontend static files (if deploying both)

## 🐛 Troubleshooting

### Issue: "MongoDB connection error"

**Solution:**
1. Check `MONGODB_URI` is set correctly
2. Verify MongoDB Atlas Network Access allows `0.0.0.0/0`
3. Check MongoDB Atlas connection string format

### Issue: "Function timeout"

**Solution:**
- Vercel free tier: 10 seconds max
- Vercel Pro: 60 seconds max
- Check `vercel.json` has `maxDuration: 30` (or increase)

### Issue: "CORS errors"

**Solution:**
1. Update `FRONTEND_URL` in environment variables
2. Check `allowedOrigins` in `api/index.js` includes your frontend URL
3. Vercel preview deployments are automatically allowed

### Issue: "Module not found"

**Solution:**
1. Ensure all dependencies are in `package.json`
2. Check `node_modules` is not in `.gitignore` (it shouldn't be)
3. Vercel will install dependencies automatically

### Issue: "Environment variables not working"

**Solution:**
1. Ensure variables are set in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

## 📊 Monitoring

### View Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on a deployment
3. Click **"Functions"** tab
4. View real-time logs

### Check Function Performance

- Go to **Analytics** tab
- View function execution times
- Check error rates

## 🔄 Updating Your Backend

### Method 1: Automatic (Recommended)

1. Push changes to GitHub
2. Vercel automatically redeploys
3. Preview deployments for each branch
4. Production deployment on `main` branch

### Method 2: Manual

```bash
vercel --prod
```

## ⚠️ Important Considerations

### Cold Starts

- First request after inactivity may be slower (cold start)
- MongoDB connection is reused (warm connections)
- Consider keeping functions warm with a cron job

### Function Timeouts

- Free tier: 10 seconds
- Pro tier: 60 seconds
- For long operations, consider:
  - Breaking into smaller functions
  - Using background jobs
  - Increasing timeout in `vercel.json`

### Database Connections

- MongoDB connections are reused across invocations
- Connection pooling is handled automatically
- No need to close connections manually

### File Uploads

- Vercel has 4.5MB request body limit
- For larger files, use:
  - UploadThing (already configured)
  - Direct S3 uploads
  - Chunked uploads

## 🎯 Next Steps

After backend is deployed:

1. **Deploy Frontend** (separate Vercel project)
2. **Update Environment Variables**:
   - Frontend: Set `VITE_API_URL` to your backend URL
   - Backend: Set `FRONTEND_URL` to your frontend URL
3. **Test Integration**: Test login, API calls, etc.
4. **Monitor**: Check logs and analytics

## 📚 Additional Resources

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [MongoDB Atlas Connection](https://www.mongodb.com/docs/atlas/connect-to-cluster/)

## ✅ Deployment Checklist

- [ ] Project imported to Vercel
- [ ] All environment variables set
- [ ] MongoDB Atlas configured and accessible
- [ ] Deployment successful
- [ ] Health endpoint working (`/api/health`)
- [ ] CORS configured correctly
- [ ] Frontend URL updated in backend env vars
- [ ] Test API endpoints working

---

**Your backend is now ready for Vercel deployment!** 🚀


