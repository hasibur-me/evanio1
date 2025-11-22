# 🔐 Vercel Environment Variables Setup

## Your Environment Variables

**⚠️ IMPORTANT**: Your actual environment variables are stored locally in `vercel-env-template.txt`. 
**DO NOT commit this file to GitHub** - it contains sensitive secrets.

Copy the values from `vercel-env-template.txt` and paste them into Vercel Dashboard → Settings → Environment Variables

### Required Variables

Add these variables to Vercel (use values from your `vercel-env-template.txt` file):

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_ACCESS_SECRET=your_jwt_access_secret

JWT_REFRESH_SECRET=your_jwt_refresh_secret

UPLOADTHING_SECRET=your_uploadthing_secret

UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### Optional Variables (Add if needed)

```env
# Frontend URL (will be auto-set by Vercel, but you can override)
FRONTEND_URL=https://your-app.vercel.app

# Email Service (if using Resend)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=Evanio <hello@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

# Stripe (if using payments)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server
NODE_ENV=production
PORT=5000
```

## 📝 Step-by-Step: Adding to Vercel

### Method 1: During Initial Deployment

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository: `hasibur-me/evanio1`
3. Before clicking "Deploy", click **"Environment Variables"**
4. Add each variable one by one:
   - Click "Add Another"
   - Enter the **Name** (e.g., `MONGODB_URI`)
   - Enter the **Value** (paste your value)
   - Select environments: **Production, Preview, Development** (or just Production)
   - Click "Save"
5. Repeat for all variables
6. Click "Deploy"

### Method 2: After Deployment

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: `evanio1`
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add each variable:
   - **Name**: `MONGODB_URI`
   - **Value**: (Copy from `vercel-env-template.txt` - your MongoDB connection string)
   - **Environments**: Select all (Production, Preview, Development)
   - Click **"Save"**
6. Repeat for all variables
7. **Redeploy**: Go to **Deployments** → Click **"..."** on latest → **"Redeploy"**

## ⚠️ Important Notes

### 1. Remove Quotes from UPLOADTHING Values
When adding to Vercel, **DO NOT include the quotes**:
- ❌ Wrong: `UPLOADTHING_SECRET='sk_live_...'`
- ✅ Correct: `UPLOADTHING_SECRET=sk_live_...`

### 2. MongoDB Atlas Network Access
Make sure your MongoDB Atlas cluster allows connections from:
- **IP Address**: `0.0.0.0/0` (allow from anywhere)
- Or add Vercel's IP ranges (more secure but complex)

To check/update:
1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (for testing)
5. Or add specific IPs for production

### 3. FRONTEND_URL
After your first deployment:
1. Note your Vercel URL (e.g., `https://evanio1.vercel.app`)
2. Add/Update `FRONTEND_URL` environment variable with this URL
3. Redeploy

### 4. Environment Selection
For each variable, select:
- ✅ **Production** (for main branch deployments)
- ✅ **Preview** (for branch/PR deployments)
- ✅ **Development** (optional, for local dev)

## 🧪 Testing After Setup

1. **Check API Health**:
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return: `{"message":"Server is running"}`

2. **Check MongoDB Connection**:
   - Go to Vercel Dashboard → Your Project → **Functions** tab
   - Check function logs for "MongoDB connected" message
   - If errors, check MongoDB network access settings

3. **Test API Endpoints**:
   ```
   https://your-app.vercel.app/api
   ```
   Should return API information

## 🔍 Troubleshooting

### MongoDB Connection Fails
- ✅ Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- ✅ Verify `MONGODB_URI` is correct (no extra spaces)
- ✅ Check MongoDB Atlas cluster is running
- ✅ Verify username/password in connection string

### JWT Errors
- ✅ Ensure all three JWT secrets are set
- ✅ No extra spaces or quotes in values
- ✅ Secrets are long enough (yours look good!)

### UploadThing Not Working
- ✅ Remove quotes from `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`
- ✅ Verify values are correct
- ✅ Check UploadThing dashboard for active status

### Environment Variables Not Loading
- ✅ Redeploy after adding variables
- ✅ Check variable names match exactly (case-sensitive)
- ✅ Verify you selected the right environment (Production/Preview)

## 📋 Quick Checklist

- [ ] MongoDB URI added (no quotes)
- [ ] JWT_SECRET added
- [ ] JWT_ACCESS_SECRET added
- [ ] JWT_REFRESH_SECRET added
- [ ] UPLOADTHING_SECRET added (no quotes)
- [ ] UPLOADTHING_APP_ID added (no quotes)
- [ ] MongoDB Atlas Network Access configured
- [ ] All variables set for Production environment
- [ ] Redeployed after adding variables
- [ ] Tested `/api/health` endpoint

## 🚀 Next Steps

1. ✅ Add all environment variables to Vercel
2. ✅ Configure MongoDB Atlas network access
3. ✅ Deploy/Redeploy your project
4. ✅ Test API endpoints
5. ✅ Update `FRONTEND_URL` with your Vercel URL
6. ✅ Test full application functionality

---

**Need help?** Check Vercel function logs in Dashboard → Your Project → Functions tab

