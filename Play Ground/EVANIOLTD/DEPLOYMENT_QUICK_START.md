# 🚀 Quick Deployment Guide - Vercel

## Prerequisites Checklist

- [ ] Vercel account created
- [ ] GitHub repository pushed
- [ ] Backend hosting service chosen (Railway/Render/Heroku)
- [ ] MongoDB Atlas database set up
- [ ] All API keys ready (Stripe, Resend, UploadThing)

## Step 1: Deploy Backend (5 minutes)

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click "Add Service" → "GitHub Repo" → Select repo → Choose `server` directory
5. Go to "Variables" tab and add all environment variables (see below)
6. Railway will auto-deploy. Copy the URL (e.g., `https://evanio-api.railway.app`)

### Option B: Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `evanio-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy and copy the URL

## Step 2: Configure Backend Environment Variables

Add these in your backend hosting service:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=Evanio <hello@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com
```

**Important**: Update `FRONTEND_URL` after you deploy to Vercel (Step 3).

## Step 3: Deploy Frontend to Vercel (5 minutes)

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. Click "Deploy"
6. Wait for deployment to complete
7. Copy your Vercel URL (e.g., `https://evanio-ltd.vercel.app`)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
cd client
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? evanio-ltd
# - Directory? ./
```

## Step 4: Configure Frontend Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   ```
   Replace `your-backend-url.com` with your actual backend URL from Step 1
3. Click "Save"
4. Go to "Deployments" → Click "..." on latest deployment → "Redeploy"

## Step 5: Update Backend CORS

1. Go back to your backend hosting service
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
   Replace with your actual Vercel URL
3. Restart/redeploy the backend

## Step 6: Test Deployment

1. Visit your Vercel URL
2. Try to register/login
3. Check browser console for errors
4. Test API calls

## ✅ Post-Deployment Checklist

- [ ] Frontend loads at Vercel URL
- [ ] Backend responds at backend URL
- [ ] Login/Register works
- [ ] API calls work (check Network tab)
- [ ] No CORS errors in console
- [ ] Database connection works
- [ ] Environment variables are set

## 🐛 Common Issues

### CORS Error
**Fix**: Update `FRONTEND_URL` in backend environment variables to your Vercel URL

### API Not Found
**Fix**: Check `VITE_API_URL` is set correctly in Vercel environment variables

### Build Fails
**Fix**: Check build logs, ensure all dependencies are in `package.json`

### Database Connection Error
**Fix**: 
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Railway/Render)

## 📝 Environment Variables Reference

### Frontend (Vercel)
- `VITE_API_URL` - Your backend API URL

### Backend (Railway/Render)
- All variables from `server/env.example`
- `FRONTEND_URL` - Your Vercel frontend URL

## 🎉 You're Done!

Your app should now be live! 🚀

For detailed documentation, see `VERCEL_DEPLOYMENT.md`


