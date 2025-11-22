import express from 'express';
import { 
  submitContact, 
  getContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public route (no authentication required)
router.post('/', submitContact);

// Admin routes (require authentication and admin role)
router.get('/admin', protect, admin, getContacts);
router.get('/admin/:id', protect, admin, getContact);
router.put('/admin/:id', protect, admin, updateContact);
router.delete('/admin/:id', protect, admin, deleteContact);

export default router;




