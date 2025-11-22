# 🚀 Quick Vercel Deployment Guide

Your code has been pushed to: **https://github.com/hasibur-me/evanio1.git**

## Step 1: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**: [https://vercel.com/new](https://vercel.com/new)
2. **Sign in** with your GitHub account
3. **Import Repository**:
   - Click "Import Git Repository"
   - Select `hasibur-me/evanio1`
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: Leave as root (`.`)
   - **Build Command**: `cd client && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `cd client && npm install && cd ../server && npm install`

5. **Environment Variables**:
   Click "Environment Variables" and add:

   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_atlas_connection_string
   
   # JWT Secrets
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
   
   # Frontend URL (will be set automatically, but you can override)
   FRONTEND_URL=https://your-app.vercel.app
   
   # Stripe (if using payments)
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # UploadThing (if using file uploads)
   UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   
   # Resend (for emails)
   RESEND_API_KEY=re_your_resend_api_key
   EMAIL_FROM=Evanio <hello@yourdomain.com>
   ADMIN_EMAIL=admin@yourdomain.com
   ```

6. **Deploy**: Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? evanio1
# - Directory? ./
# - Override settings? No
```

## Step 2: Verify Deployment

After deployment, Vercel will provide you with:
- **Production URL**: `https://your-app.vercel.app`
- **Preview URLs**: For each branch/PR

### Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **API Health**: `https://your-app.vercel.app/api/health`
3. **API Root**: `https://your-app.vercel.app/api`

## Step 3: Update Environment Variables (if needed)

After first deployment, you may need to:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `FRONTEND_URL` with your actual Vercel URL
3. Redeploy (Settings → Deployments → Redeploy latest)

## 📋 Important Notes

### MongoDB Connection
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
- The connection is handled automatically in serverless functions

### CORS
- CORS is already configured to allow `.vercel.app` domains
- All Vercel preview deployments are automatically allowed

### Serverless Functions
- Your Express server runs as serverless functions
- MongoDB connection is reused across invocations for better performance
- Function timeout is set to 30 seconds (configurable in `vercel.json`)

### Build Process
- Frontend builds from `client/` directory
- Backend API runs as serverless functions from `api/index.js`
- Both are deployed together in one project

## 🔄 Continuous Deployment

Vercel automatically:
- Deploys on every push to `main` branch → Production
- Creates preview deployments for other branches/PRs

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)

### API Not Working
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check function logs in Vercel Dashboard

### CORS Errors
- CORS is configured to allow all Vercel domains
- If issues persist, check browser console for specific errors

## 📚 Next Steps

1. ✅ Code pushed to GitHub
2. ✅ Deploy to Vercel (follow steps above)
3. ✅ Set environment variables
4. ✅ Test deployment
5. ✅ Update domain (optional) in Vercel settings

---

**Your repository**: https://github.com/hasibur-me/evanio1.git

**Ready to deploy?** Go to [vercel.com/new](https://vercel.com/new) and import your repository!

