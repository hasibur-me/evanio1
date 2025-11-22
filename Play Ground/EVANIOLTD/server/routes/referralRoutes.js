import express from 'express';
import {
  getMyReferralCode,
  getMyReferrals,
  getLoyaltyPoints,
  getLoyaltyTransactions,
  redeemLoyaltyPoints,
  getAllReferrals
} from '../controllers/referralController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.get('/my-code', protect, getMyReferralCode);
router.get('/my-referrals', protect, getMyReferrals);
router.get('/loyalty', protect, getLoyaltyPoints);
router.get('/loyalty/transactions', protect, getLoyaltyTransactions);
router.post('/loyalty/redeem', protect, redeemLoyaltyPoints);

// Admin routes
router.get('/admin/all', protect, admin, getAllReferrals);

export default router;


