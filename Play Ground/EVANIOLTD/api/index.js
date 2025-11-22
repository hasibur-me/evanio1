// Vercel Serverless Function Entry Point
// This file allows deploying the Express server as serverless functions on Vercel

import app from '../server/server.js';

// Vercel serverless function handler
export default async (req, res) => {
  // Ensure MongoDB is connected (connection is reused across invocations)
  const mongoose = (await import('mongoose')).default;
  
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      });
      console.log('MongoDB connected (serverless function)');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      // Continue anyway - connection might be established on next invocation
    }
  }
  
  // Handle the request with Express app
  return app(req, res);
};

