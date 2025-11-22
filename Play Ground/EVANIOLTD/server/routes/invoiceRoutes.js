import express from 'express';
import {
  generateInvoice,
  getMyInvoices,
  getInvoice,
  sendInvoice,
  getAllInvoices,
  updateInvoiceStatus
} from '../controllers/invoiceController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/generate', protect, generateInvoice);
router.get('/my-invoices', protect, getMyInvoices);
router.get('/:id', protect, getInvoice);
router.post('/:id/send', protect, sendInvoice);

// Admin routes
router.get('/admin/all', protect, admin, getAllInvoices);
router.patch('/admin/:id/status', protect, admin, updateInvoiceStatus);

export default router;


