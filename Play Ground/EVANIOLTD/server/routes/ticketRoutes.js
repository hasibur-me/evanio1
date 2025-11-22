import express from 'express';
import { 
  getTickets, 
  getTicket,
  createTicket, 
  replyToTicket,
  updateTicket,
  getTicketStats
} from '../controllers/ticketController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Stats route (admin only)
router.get('/stats', protect, admin, getTicketStats);

// Get all tickets with filters
router.get('/', protect, getTickets);

// Get single ticket
router.get('/:id', protect, getTicket);

// Create ticket
router.post('/', protect, createTicket);

// Reply to ticket (users and admins)
router.post('/:id/reply', protect, replyToTicket);

// Update ticket (admin only)
router.put('/:id', protect, admin, updateTicket);

export default router;




