import express from 'express';
import {
  createOrder,
  createCheckoutSession,
  processBankTransfer,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updateOrderWorkflowSteps,
  addOrderNote,
  updateEstimatedDeliveryDate,
  getOrderTimeline,
  stripeWebhook
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Stripe webhook (must be before protect middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Protected routes (specific routes first to avoid conflicts)
router.post('/', protect, createOrder);
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/bank-transfer', protect, processBankTransfer);
router.get('/my-orders', protect, getMyOrders);

// Admin routes (before :id route to avoid conflicts)
router.get('/admin/all', protect, admin, getAllOrders);
router.get('/admin/:id', protect, admin, getOrder);
router.patch('/admin/:id/status', protect, admin, updateOrderStatus);
router.patch('/admin/:id/workflow', protect, admin, updateOrderWorkflowSteps);
router.patch('/admin/:id/delivery-date', protect, admin, updateEstimatedDeliveryDate);

// Order notes and timeline (users and admins)
router.post('/:id/notes', protect, addOrderNote);
router.get('/:id/timeline', protect, getOrderTimeline);

// Get single order (user can access their own, admin can access any)
router.get('/single/:id', protect, getOrder);

export default router;

