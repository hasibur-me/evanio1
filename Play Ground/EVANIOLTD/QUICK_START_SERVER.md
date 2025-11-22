# Quick Start - Server Setup

## ⚠️ The server is starting in the background!

The server should now be running. Follow these steps:

### 1. Check if Server Started Successfully

Open a **new terminal** and run:
```bash
curl http://localhost:5000/api/health
```

Or open your browser and go to:
```
http://localhost:5000/api/health
```

You should see: `{"message":"Server is running"}`

### 2. If Server is Running ✅

- The frontend at `http://localhost:5173` should now be able to connect
- You can login with admin credentials:
  - Email: `admin@evanio.com`
  - Password: `Admin@2024!`

### 3. If Server is NOT Running ❌

**Manual Start Instructions:**

1. Open a terminal window
2. Navigate to server directory:
   ```bash
   cd "C:\Users\Cherl\Play Ground\EVANIOLTD\server"
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

4. Wait for these messages:
   ```
   MongoDB connected
   Server running on port 5000
   ```

5. **Keep the terminal window open** - The server must keep running!

### 4. Common Issues

**Issue: Port 5000 already in use**
- Solution: Kill the process using port 5000 or change PORT in `.env` file

**Issue: MongoDB connection error**
- Solution: Check your `MONGODB_URI` in `.env` file
- Make sure MongoDB Atlas cluster is running (if using Atlas)

**Issue: Cannot find module**
- Solution: Run `npm install` in the server directory

### 5. Check Server Logs

Look in the terminal where you started the server for:
- ✅ `MongoDB connected` - Database connected successfully
- ✅ `Server running on port 5000` - Server started successfully
- ❌ Any error messages - Check the error and fix accordingly

---

## 🎯 Summary

**Server should be running on:** `http://localhost:5000`

**Frontend should connect to:** `http://localhost:5000/api`

**Keep server running** while using the application!





