import express from 'express';
import { createCheckoutSession, paymentSuccess, getPayments, stripeWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/success', paymentSuccess);
router.get('/', protect, getPayments);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;





