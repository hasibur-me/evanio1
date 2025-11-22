// Vercel Serverless Function Entry Point
// This file allows deploying the Express server as serverless functions on Vercel

import app from '../server/server.js';

// Vercel serverless function handler
export default async (req, res) => {
  // Ensure MongoDB is connected (connection is reused across invocations)
  const mongoose = (await import('mongoose')).default;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  
  // Handle the request with Express app
  return app(req, res);
};

