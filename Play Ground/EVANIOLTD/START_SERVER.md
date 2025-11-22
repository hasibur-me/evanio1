# Starting the Server

If you're seeing "Cannot connect to server" error, follow these steps:

## Quick Start

### 1. Open a Terminal/Command Prompt

### 2. Navigate to Server Directory

```bash
cd "C:\Users\Cherl\Play Ground\EVANIOLTD\server"
```

### 3. Check if .env file exists

Make sure you have a `.env` file in the `server` directory with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
UPLOADTHING_SECRET=sk_live_your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
RESEND_API_KEY=re_your_resend_api_key
```

### 4. Install Dependencies (if not done)

```bash
npm install
```

### 5. Start the Server

**Option A: Development mode (with auto-reload)**
```bash
npm run dev
```

**Option B: Production mode**
```bash
npm start
```

### 6. Verify Server is Running

You should see:
```
MongoDB connected
Server running on port 5000
```

### 7. Test Server Health

Open browser and go to: `http://localhost:5000/api/health`

You should see: `{"message":"Server is running"}`

## Troubleshooting

### MongoDB Connection Error

If you see "MongoDB connection error":
1. Check your `.env` file has the correct `MONGODB_URI`
2. Make sure MongoDB Atlas cluster is running (if using Atlas)
3. Check if MongoDB is running (if using local MongoDB)
4. Verify your MongoDB connection string is correct

### Port Already in Use

If you see "Port 5000 is already in use":
1. Find what's using port 5000:
   ```bash
   netstat -ano | findstr :5000
   ```
2. Kill that process or change PORT in `.env` file

### Module Not Found Errors

Run:
```bash
npm install
```

### Environment Variables Not Loading

Make sure:
1. `.env` file exists in `server` directory
2. `.env` file is not in `.gitignore` (but never commit it!)
3. You're running the server from the `server` directory

## Keep Server Running

Keep the terminal window open while using the application. The server needs to be running for the frontend to work.

To stop the server, press `Ctrl+C` in the terminal.





