import express from 'express';
import {
  getRevenueReport,
  getUserGrowthReport,
  getServicePerformanceReport,
  getComprehensiveAnalytics,
  exportDataAsCSV
} from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All analytics routes require admin access
router.get('/revenue', protect, admin, getRevenueReport);
router.get('/users', protect, admin, getUserGrowthReport);
router.get('/services', protect, admin, getServicePerformanceReport);
router.get('/comprehensive', protect, admin, getComprehensiveAnalytics);
router.get('/export', protect, admin, exportDataAsCSV);

export default router;


