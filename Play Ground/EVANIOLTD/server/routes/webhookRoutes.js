import express from 'express';
import {
  createWebhook,
  getMyWebhooks,
  getAllWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  testWebhook,
  getWebhookEvents
} from '../controllers/webhookController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', protect, createWebhook);
router.get('/my-webhooks', protect, getMyWebhooks);
router.get('/:id', protect, getWebhook);
router.patch('/:id', protect, updateWebhook);
router.delete('/:id', protect, deleteWebhook);
router.post('/:id/test', protect, testWebhook);
router.get('/:id/events', protect, getWebhookEvents);

// Admin routes
router.get('/all', protect, admin, getAllWebhooks);

export default router;

