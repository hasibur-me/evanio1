// Vercel Serverless Function Entry Point
// This file allows deploying the Express server as serverless functions on Vercel

import app from '../server/server.js';

// MongoDB connection cache (reused across invocations)
let mongooseConnection = null;

// Vercel serverless function handler
export default async (req, res) => {
  // Ensure MongoDB is connected (connection is reused across invocations for better performance)
  const mongoose = (await import('mongoose')).default;
  
  // Check if already connected
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    try {
      // Use connection options optimized for serverless
      const connectionOptions = {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        maxPoolSize: 1, // Maintain up to 1 socket connection (serverless optimization)
        minPoolSize: 0, // Allow connection to close when idle
      };

      await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
      console.log('MongoDB connected (serverless function)');
      mongooseConnection = mongoose.connection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      // Return error response instead of continuing
      if (!res.headersSent) {
        return res.status(503).json({
          error: 'Database connection failed',
          message: 'Unable to connect to database. Please try again.',
        });
      }
    }
  } else if (mongoose.connection.readyState === 1) {
    // Already connected - reuse connection
    console.log('MongoDB connection reused');
  }
  
  // Handle the request with Express app
  try {
    return app(req, res);
  } catch (error) {
    console.error('Request handling error:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
};

