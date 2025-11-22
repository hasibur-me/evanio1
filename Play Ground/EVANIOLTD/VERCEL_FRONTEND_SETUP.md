# Vercel Frontend Deployment - Manual Configuration

## If Vite is NOT Auto-Detected

When importing your repository on Vercel, if Vite is not auto-detected, manually configure these settings:

### Step-by-Step Configuration

1. **Go to Vercel Dashboard**: [vercel.com/new](https://vercel.com/new)
2. **Import Repository**: `hasibur-me/evanio`
3. **Click "Configure Project"** or "Edit" button

### Manual Settings

#### **Root Directory**
```
client
```

#### **Framework Preset**
Select one of these options:
- **Other** (recommended)
- OR **Vite** (if available in dropdown)

#### **Build Command**
```
npm run build
```

#### **Output Directory**
```
dist
```

#### **Install Command**
```
npm install
```

#### **Development Command** (optional)
```
npm run dev
```

### Alternative: Use vercel.json

If manual configuration doesn't work, Vercel will automatically use the `client/vercel.json` file which has all the settings configured.

### After Configuration

1. Click **"Deploy"**
2. Wait for build to complete
3. Add environment variables:
   - Go to **Settings → Environment Variables**
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

### Troubleshooting

**If build fails:**
- Check that Root Directory is set to `client`
- Verify Build Command is `npm run build`
- Verify Output Directory is `dist`
- Check build logs in Vercel dashboard

**If Vite still not detected:**
- Select "Other" as Framework Preset
- Vercel will use the build command from `package.json`
- The `client/vercel.json` will provide additional configuration


