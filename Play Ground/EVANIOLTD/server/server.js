import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import twoFactorRoutes from './routes/twoFactorRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import socialAuthRoutes from './routes/socialAuthRoutes.js';
import apiDocsRoutes from './routes/apiDocsRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import socialProofRoutes from './routes/socialProofRoutes.js';

dotenv.config();

const app = express();

// Middleware
const isVercel = process.env.VERCEL || process.env.VERCEL_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  // Add Vercel deployment URLs
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.VERCEL ? [process.env.VERCEL] : []),
  // Allow all Vercel preview deployments
  ...(isVercel ? [/^https:\/\/.*\.vercel\.app$/] : []),
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    })) {
      callback(null, true);
    } else {
      // Allow Vercel preview deployments (pattern: *.vercel.app)
      if (origin.includes('.vercel.app')) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        // In production, you might want to be stricter:
        // callback(new Error('Not allowed by CORS'));
        callback(null, true); // Allow all for now - change in production
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (invoices, etc.) - Only in non-serverless environments
// On Vercel, use external storage (UploadThing, S3, etc.) instead
if (!process.env.VERCEL && !process.env.VERCEL_URL) {
  app.use('/uploads', express.static(join(__dirname, 'uploads')));
} else {
  // On Vercel, provide a message for uploads endpoint
  app.use('/uploads', (req, res) => {
    res.status(404).json({ 
      message: 'File uploads are handled via UploadThing. Use the upload API endpoints instead.',
      uploadEndpoint: '/api/documents/upload'
    });
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/theme', themeRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/2fa', twoFactorRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/auth/social', socialAuthRoutes);
app.use('/api/docs', apiDocsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api', socialProofRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Evanio API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      documents: '/api/documents',
      tickets: '/api/tickets',
      payments: '/api/payments',
      orders: '/api/orders',
      users: '/api/users',
      contact: '/api/contact',
      services: '/api/services',
      theme: '/api/theme',
      email: '/api/email',
      analytics: '/api/analytics',
      appointments: '/api/appointments',
      '2fa': '/api/2fa',
      newsletter: '/api/newsletter',
      webhooks: '/api/webhooks',
      'social-auth': '/api/auth/social',
      'api-docs': '/api/docs',
      reviews: '/api/reviews',
      referrals: '/api/referrals',
      blog: '/api/blog',
      invoices: '/api/invoices'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Database connection - only connect if not running on Vercel (serverless)
// On Vercel, connection is handled in api/index.js per request
const isVercel = process.env.VERCEL || process.env.VERCEL_URL;

if (!isVercel) {
  // Local/development server - start listening
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evanio-ltd')
    .then(() => {
      console.log('MongoDB connected');
      const PORT = process.env.PORT || 5000;
      const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      
      // Handle port errors gracefully
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use. Please free the port or use a different port.`);
          console.error('To free the port, run: Get-NetTCPConnection -LocalPort ' + PORT + ' | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force');
          process.exit(1);
        } else {
          throw error;
        }
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
} else {
  // On Vercel - don't connect here, connection handled in api/index.js
  console.log('Running on Vercel - MongoDB connection handled per request');
}

export default app;


