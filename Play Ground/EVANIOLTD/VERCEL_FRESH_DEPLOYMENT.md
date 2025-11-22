# 🚀 Fresh Vercel Deployment Guide - Complete Setup

This guide will help you deploy your full-stack application (frontend + backend) to Vercel in one deployment.

## ✅ Pre-Deployment Checklist

### 1. Code Status
- ✅ All hardcoded localhost URLs removed
- ✅ Environment variables properly configured
- ✅ API endpoints use relative paths (`/api`)
- ✅ MongoDB connection optimized for serverless
- ✅ Static file serving disabled on Vercel
- ✅ CORS configured for Vercel domains

### 2. Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

#### Backend Variables (Required)
**⚠️ IMPORTANT**: Your actual environment variables are in `vercel-env-template.txt` (local file, not committed).

Add these variables to Vercel (copy values from `vercel-env-template.txt`):

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
NODE_ENV=production
```

#### Frontend Variables (Optional - defaults to `/api`)
```env
VITE_API_URL=/api
# Or set to full URL if deploying frontend separately:
# VITE_API_URL=https://your-backend.vercel.app/api
```

#### Additional Variables (If using)
```env
FRONTEND_URL=https://your-app.vercel.app
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=Evanio <hello@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 📋 Deployment Steps

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Save

### Step 2: Deploy to Vercel

1. **Go to Vercel**: [https://vercel.com/new](https://vercel.com/new)
2. **Sign in** with your GitHub account
3. **Import Repository**:
   - Click "Import Git Repository"
   - Select `hasibur-me/evanio1`
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Leave as "Other" or blank
   - **Root Directory**: `.` (project root - **IMPORTANT**)
   - **Build Command**: `cd client && npm install && npm run build` (already in vercel.json)
   - **Output Directory**: `client/dist` (already in vercel.json)
   - **Install Command**: `cd client && npm install && cd ../server && npm install` (already in vercel.json)

5. **Environment Variables**:
   - Click **"Environment Variables"** before deploying
   - Add all variables from the list above
   - Select environments: **Production, Preview, Development**
   - Click "Save" for each variable

6. **Deploy**: Click **"Deploy"**

### Step 3: Post-Deployment Configuration

1. **Get Your Vercel URL**:
   - After deployment, note your URL: `https://your-app.vercel.app`

2. **Update Environment Variables** (if needed):
   - Go to **Settings** → **Environment Variables**
   - Update `FRONTEND_URL` with your Vercel URL
   - Redeploy if you changed it

3. **Test Your Deployment**:
   - Frontend: `https://your-app.vercel.app`
   - API Health: `https://your-app.vercel.app/api/health`
   - API Root: `https://your-app.vercel.app/api`

## 🔧 How It Works

### Architecture
```
Vercel Deployment
├── Frontend (Static)
│   └── Built from: client/
│   └── Served from: client/dist/
│   └── Routes: All routes → /index.html (SPA)
│
└── Backend (Serverless Functions)
    └── Entry: api/index.js
    └── Routes: /api/* → api/index.js
    └── Express app: server/server.js
```

### Request Flow
1. **Frontend Request**: `https://your-app.vercel.app/` → Serves `client/dist/index.html`
2. **API Request**: `https://your-app.vercel.app/api/health` → Routes to `api/index.js` → Express app
3. **Static Assets**: `https://your-app.vercel.app/assets/*` → Served from `client/dist/assets/`

### Build Process
1. Vercel runs: `cd client && npm install && npm run build`
2. Frontend builds to: `client/dist/`
3. Backend dependencies installed: `cd ../server && npm install`
4. Serverless function created from: `api/index.js`

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] API health endpoint works: `/api/health`
- [ ] API returns JSON: `/api`
- [ ] MongoDB connection successful (check function logs)
- [ ] Login/Register works
- [ ] No CORS errors in browser console
- [ ] Static assets load correctly
- [ ] No console errors

## 🐛 Troubleshooting

### Issue: Build Fails

**Check:**
- Build logs in Vercel Dashboard
- All dependencies in `package.json`
- Node.js version (Vercel uses 18.x by default)

**Solution:**
- Verify `client/package.json` has all dependencies
- Check `server/package.json` has all dependencies
- Ensure build command is correct

### Issue: API Not Working

**Check:**
- Environment variables are set correctly
- MongoDB connection string is valid
- Function logs in Vercel Dashboard

**Solution:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Review function logs for errors

### Issue: CORS Errors

**Check:**
- Frontend URL matches `FRONTEND_URL` env var
- CORS configuration in `server/server.js`

**Solution:**
- CORS is configured to allow all `.vercel.app` domains
- If issues persist, check browser console for specific errors

### Issue: Frontend Can't Connect to API

**Check:**
- `VITE_API_URL` environment variable
- API routes are working (`/api/health`)

**Solution:**
- Default is `/api` (relative path) - should work automatically
- If using separate frontend/backend, set `VITE_API_URL` to full backend URL

### Issue: MongoDB Connection Fails

**Check:**
- `MONGODB_URI` is set correctly
- MongoDB Atlas Network Access configured
- Function logs for connection errors

**Solution:**
- Verify connection string format
- Check MongoDB Atlas allows connections from anywhere
- Review connection timeout settings in `api/index.js`

## 📊 Performance Optimizations

### Already Implemented:
- ✅ MongoDB connection reuse (warm connections)
- ✅ Connection pooling optimized for serverless
- ✅ Frontend code splitting (React vendor chunks)
- ✅ Static asset caching (1 year)
- ✅ Serverless function timeout: 30 seconds

### Recommendations:
- Monitor function execution times
- Use Vercel Analytics for performance insights
- Consider edge caching for static content
- Optimize images and assets

## 🔄 Continuous Deployment

Vercel automatically:
- **Deploys on push to `main`** → Production
- **Creates preview deployments** for branches/PRs
- **Runs builds** automatically
- **Updates environment variables** (requires redeploy)

## 📝 Environment Variable Reference

### Required for Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_ACCESS_SECRET` | JWT access token secret | `your-access-secret` |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | `your-refresh-secret` |
| `UPLOADTHING_SECRET` | UploadThing API secret | `sk_live_...` |
| `UPLOADTHING_APP_ID` | UploadThing app ID | `your-app-id` |

### Optional for Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL | `/api` |
| `VITE_UPLOADTHING_TOKEN` | UploadThing token | - |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | - |

### Optional for Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `FRONTEND_URL` | Frontend URL for CORS | Auto-detected |
| `NODE_ENV` | Environment | `production` |
| `RESEND_API_KEY` | Email service API key | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | - |

## 🎯 Next Steps After Deployment

1. ✅ Test all major features
2. ✅ Set up custom domain (optional)
3. ✅ Configure monitoring and alerts
4. ✅ Set up error tracking
5. ✅ Test file uploads (UploadThing)
6. ✅ Test payment processing (if using Stripe)
7. ✅ Verify email functionality (if using Resend)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [MongoDB Atlas Connection](https://www.mongodb.com/docs/atlas/connect-to-cluster/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Your application is now ready for Vercel deployment!** 🚀

All code has been optimized, hardcoded URLs removed, and configuration verified.

