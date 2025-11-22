# ✅ Backend Vercel-Ready Checklist

Your backend has been optimized for Vercel serverless deployment!

## 🎯 Changes Made

### 1. ✅ Serverless Function Entry Point (`api/index.js`)
- Optimized MongoDB connection with connection pooling for serverless
- Added proper error handling for database connection failures
- Connection reuse across invocations for better performance
- Timeout configuration optimized for serverless (5s connection timeout)

### 2. ✅ Express Server (`server/server.js`)
- **Static File Serving**: Disabled on Vercel (filesystem is read-only)
  - Uploads endpoint returns helpful message pointing to UploadThing API
  - Local development still uses `/uploads` folder
- **MongoDB Connection**: Only connects in non-serverless environments
  - On Vercel, connection handled in `api/index.js` per request
- **CORS Configuration**: Enhanced to allow all Vercel preview deployments
  - Pattern matching for `*.vercel.app` domains
  - Automatic detection of Vercel environment

### 3. ✅ PDF Generation (`server/utils/pdfGenerator.js`)
- **Vercel Support**: Uses `/tmp` directory (only writable location on Vercel)
- Returns buffer for external storage upload
- Local development unchanged (uses `uploads/invoices` folder)
- Note: PDFs on Vercel need to be uploaded to external storage (S3, UploadThing) for public access

### 4. ✅ Vercel Configuration (`vercel.json`)
- Removed conflicting `builds` property
- Modern configuration using `functions` property
- Proper routing for API and frontend

## 📋 Environment Variables Required

Make sure these are set in Vercel Dashboard:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

## 🚀 Deployment Steps

1. **Push to GitHub** (already done)
2. **Import to Vercel**: [vercel.com/new](https://vercel.com/new)
3. **Set Root Directory**: `.` (project root)
4. **Add Environment Variables**: Copy from `vercel-env-template.txt`
5. **Deploy**: Click "Deploy"

## ⚠️ Important Notes

### File Uploads
- **On Vercel**: Use UploadThing (already configured) or S3
- **Local**: Uses `/uploads` folder
- Static file serving disabled on Vercel (filesystem is read-only)

### PDF Generation
- **On Vercel**: PDFs saved to `/tmp` (temporary)
- **Next Step**: Upload PDF buffer to external storage (S3/UploadThing) for public access
- **Local**: PDFs saved to `server/uploads/invoices/`

### MongoDB Connection
- Connection is reused across invocations (warm connections)
- Automatic reconnection on failures
- Optimized connection pool for serverless (maxPoolSize: 1)

### Cold Starts
- First request after inactivity may be slower (~1-2s)
- MongoDB connection is cached for subsequent requests
- Consider using a cron job to keep functions warm

## 🧪 Testing After Deployment

1. **Health Check**: `https://your-app.vercel.app/api/health`
   - Should return: `{"message":"Server is running"}`

2. **API Root**: `https://your-app.vercel.app/api`
   - Should return API information

3. **MongoDB Connection**: Check Vercel function logs
   - Look for "MongoDB connected (serverless function)"

4. **CORS**: Test from frontend
   - Should allow requests from your Vercel frontend URL

## 🔧 Troubleshooting

### MongoDB Connection Fails
- ✅ Check `MONGODB_URI` is set correctly
- ✅ Verify MongoDB Atlas Network Access allows `0.0.0.0/0`
- ✅ Check function logs in Vercel Dashboard

### Static Files Not Working
- ✅ Expected on Vercel - use UploadThing or S3 instead
- ✅ Check `/api/documents/upload` endpoint

### PDF Generation Issues
- ✅ On Vercel, PDFs are in `/tmp` (temporary)
- ✅ Need to upload buffer to external storage for public access
- ✅ Local development works normally

### Function Timeout
- ✅ Current timeout: 30 seconds (configurable in `vercel.json`)
- ✅ Free tier: 10 seconds max
- ✅ Pro tier: 60 seconds max

## 📊 Performance Optimizations

1. **Connection Reuse**: MongoDB connections cached across invocations
2. **Connection Pooling**: Optimized for serverless (maxPoolSize: 1)
3. **Timeout Settings**: Reduced connection timeout (5s) for faster failures
4. **Error Handling**: Graceful degradation on connection failures

## ✅ Ready for Deployment!

Your backend is now fully optimized for Vercel serverless deployment. All file system operations are handled appropriately, MongoDB connections are optimized, and CORS is configured for Vercel domains.

**Next**: Deploy to Vercel and test! 🚀

