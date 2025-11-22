# Vercel Deployment Guide

This guide will help you deploy the Evanio application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket Account**: For connecting your repository
3. **Backend Hosting**: You'll need to deploy the backend separately (see options below)

## 🚀 Deployment Options

### Option 1: Frontend on Vercel + Backend on Separate Service (Recommended)

This is the recommended approach for this MERN stack application.

#### Step 1: Deploy Backend First

Choose one of these services for your backend:

**Option A: Railway** (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Add a new service → Select your repo → Choose `server` directory
5. Set environment variables (see below)
6. Deploy

**Option B: Render**
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Root Directory: `server`
5. Set environment variables
6. Deploy

**Option C: Heroku**
1. Go to [heroku.com](https://heroku.com)
2. Create a new app
3. Connect GitHub repository
4. Set buildpack: `heroku/nodejs`
5. Set environment variables
6. Deploy

#### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional, you can also use the web interface):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the project root**:
   ```bash
   vercel
   ```
   
   Or use the web interface:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

4. **Set Environment Variables in Vercel**:
   - Go to your project settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```
     Replace `your-backend-url.com` with your actual backend URL

5. **Redeploy** after adding environment variables

### Option 2: Full Stack on Vercel (Advanced)

This requires converting the Express server to Vercel serverless functions. This is more complex but keeps everything in one place.

**Note**: This option requires significant code restructuring and is not recommended for this setup.

## 🔧 Environment Variables

### Frontend (Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (Railway/Render/Heroku)

Add all variables from `server/env.example`:

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (your Vercel URL)
FRONTEND_URL=https://your-app.vercel.app

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
```

## 📝 Step-by-Step Deployment

### 1. Prepare Your Code

1. **Ensure all changes are committed**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Verify build works locally**:
   ```bash
   cd client
   npm run build
   ```

### 2. Deploy Backend

1. Choose your backend hosting service (Railway recommended)
2. Connect your repository
3. Set root directory to `server`
4. Add all environment variables
5. Deploy and note the URL (e.g., `https://evanio-api.railway.app`)

### 3. Deploy Frontend to Vercel

#### Using Vercel CLI:

```bash
# From project root
cd client
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? evanio-ltd
# - Directory? ./
# - Override settings? No
```

#### Using Vercel Dashboard:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click "Deploy"

### 4. Configure Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
3. Redeploy (Settings → Deployments → Redeploy)

### 5. Update CORS in Backend

Update your backend's CORS settings to include your Vercel URL:

```javascript
const allowedOrigins = [
  'https://your-app.vercel.app',
  'https://your-app-git-main.vercel.app', // Preview deployments
  // ... other origins
];
```

## 🔍 Post-Deployment Checklist

- [ ] Frontend is accessible at your Vercel URL
- [ ] Backend is accessible and responding to `/api/health`
- [ ] API calls from frontend work (check browser console)
- [ ] Authentication works (login/register)
- [ ] Database connection is working
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] SSL certificates are active (automatic on Vercel)

## 🐛 Troubleshooting

### Issue: API calls failing with CORS error

**Solution**: 
1. Check backend CORS configuration includes your Vercel URL
2. Verify `VITE_API_URL` is set correctly in Vercel
3. Check backend logs for CORS errors

### Issue: Build fails on Vercel

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure `package.json` has correct build script
3. Verify all dependencies are in `package.json`
4. Check Node.js version compatibility

### Issue: Environment variables not working

**Solution**:
1. Ensure variables start with `VITE_` for Vite to expose them
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Issue: Backend not connecting to database

**Solution**:
1. Verify `MONGODB_URI` is set correctly
2. Check MongoDB Atlas IP whitelist includes your backend hosting IP
3. Verify database credentials

### Issue: Static files not loading

**Solution**:
1. Check `vercel.json` configuration
2. Verify file paths in code match deployment structure
3. Check browser console for 404 errors

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your main branch. For preview deployments:

- Push to any branch → Preview deployment
- Merge to main → Production deployment

## 📊 Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Check Vercel logs
3. **Performance**: Use Vercel Speed Insights

## 🔐 Security Checklist

- [ ] All secrets are in environment variables (not in code)
- [ ] CORS is properly configured
- [ ] JWT secrets are strong and unique
- [ ] Database credentials are secure
- [ ] API keys are not exposed in frontend code
- [ ] HTTPS is enabled (automatic on Vercel)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check backend logs
3. Review browser console for errors
4. Verify all environment variables are set

---

**Ready to deploy?** Start with deploying your backend, then deploy the frontend to Vercel!


