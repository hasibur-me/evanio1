import express from 'express';
import {
  createReview,
  getReviews,
  getReviewStats,
  getMyReviews,
  markHelpful,
  getAllReviews,
  updateReviewStatus,
  respondToReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.get('/stats', getReviewStats);

// User routes
router.post('/', protect, createReview);
router.get('/my-reviews', protect, getMyReviews);
router.post('/:id/helpful', protect, markHelpful);

// Admin routes
router.get('/admin/all', protect, admin, getAllReviews);
router.patch('/admin/:id/status', protect, admin, updateReviewStatus);
router.post('/admin/:id/respond', protect, admin, respondToReview);

export default router;


