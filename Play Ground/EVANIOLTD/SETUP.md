# Quick Setup Guide

## ✅ Your Credentials (Ready to Use)

Your credentials have been configured:
- ✅ UploadThing: Secret and App ID configured
- ✅ JWT: Access and Refresh secrets configured  
- ✅ MongoDB: Connection string configured

## Server Environment Variables

Create a `.env` file in the `server` directory with the following content:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB (Your configured connection)
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT (Your configured secrets)
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Stripe (Add your Stripe keys here)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# UploadThing (Your configured credentials)
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Resend (Add your Resend API key here)
RESEND_API_KEY=your_resend_api_key
```

**✅ MongoDB Connection String:** Add your MongoDB Atlas connection string

## Client Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_UPLOADTHING_TOKEN=your_uploadthing_token
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Steps to Run

1. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Create the `.env` files** as shown above

4. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

## Additional Configuration Needed

You still need to configure:
- **Stripe**: Get your API keys from https://dashboard.stripe.com/apikeys
- **Resend**: Get your API key from https://resend.com/api-keys
- **UploadThing Token**: Get from your UploadThing dashboard for client-side uploads

The application should now be ready to run!

