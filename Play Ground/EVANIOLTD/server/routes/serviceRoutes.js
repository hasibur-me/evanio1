import express from 'express';
import { createServiceRequest, getServiceRequests } from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Public route (no authentication required)
router.post('/request', upload.array('files', 10), createServiceRequest);

// Admin route to view all service requests
router.get('/requests', protect, admin, getServiceRequests);

export default router;




