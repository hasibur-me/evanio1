import express from 'express';
import {
  getEmailPreferences,
  updateEmailPreferences,
  sendCustomEmailToUser,
  sendBulkEmail,
  getEmailTemplates
} from '../controllers/emailController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// User routes (protected)
router.get('/preferences', protect, getEmailPreferences);
router.put('/preferences', protect, updateEmailPreferences);

// Admin routes
router.post('/send', protect, admin, sendCustomEmailToUser);
router.post('/send-bulk', protect, admin, sendBulkEmail);
router.get('/templates', protect, admin, getEmailTemplates);

export default router;

