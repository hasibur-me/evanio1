import express from 'express';
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getNewsletterSubscribers,
  sendNewsletter
} from '../controllers/newsletterController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribeNewsletter);
router.get('/unsubscribe', unsubscribeNewsletter);

// Admin routes
router.get('/subscribers', protect, admin, getNewsletterSubscribers);
router.post('/send', protect, admin, sendNewsletter);

export default router;


