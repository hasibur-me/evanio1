import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import { sendTicketReplyEmail } from '../utils/email.js';

export const getTickets = async (req, res) => {
  try {
    const { status, priority, type, assignedTo, search } = req.query;
    let query = {};
    
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (type) query.type = type;
    if (assignedTo) query.assignedTo = assignedTo;
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { ticketNumber: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tickets = await Ticket.find(query)
      .populate('userId', 'name email')
      .populate('orderId', 'orderNumber service amount')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('orderId', 'orderNumber service amount package paymentStatus orderStatus createdAt')
      .populate('assignedTo', 'name email')
      .populate('replies.userId', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has access
    if (req.user.role !== 'admin' && ticket.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { subject, message, type, priority, attachments, orderId } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Please provide subject and message' });
    }

    // If orderId is provided, verify it belongs to the user
    if (orderId) {
      const Order = (await import('../models/Order.js')).default;
      const order = await Order.findById(orderId);
      if (!order || order.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Invalid order ID or order does not belong to you' });
      }
    }

    const ticket = await Ticket.create({
      userId: req.user._id,
      subject,
      message,
      type: type || 'support',
      priority: priority || 'medium',
      attachments: attachments || [],
      orderId: orderId || null
    });

    // Add to user's tickets array
    const user = await User.findById(req.user._id);
    if (user) {
      user.tickets.push(ticket._id);
      await user.save();
    }

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: error.message || 'Failed to create ticket. Please try again.' });
  }
};

export const replyToTicket = async (req, res) => {
  try {
    const { message, status, priority, attachments, internalNotes } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check access
    if (req.user.role !== 'admin' && ticket.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Add reply to conversation
    if (message) {
      ticket.replies.push({
        userId: req.user._id,
        message,
        isAdmin: req.user.role === 'admin',
        attachments: attachments || []
      });
    }

    // Update status and priority (admin only)
    if (req.user.role === 'admin') {
      if (status) ticket.status = status;
      if (priority) ticket.priority = priority;
      if (internalNotes !== undefined) ticket.internalNotes = internalNotes;
    }

    // Legacy field for backward compatibility
    if (message && req.user.role === 'admin') {
      ticket.adminResponse = message;
    }
    
    await ticket.save();

    // Populate the reply with user info
    await ticket.populate('replies.userId', 'name email');

    // Add notification to user (if admin replied)
    if (req.user.role === 'admin') {
      const user = await User.findById(ticket.userId);
      if (user) {
        user.notifications.push({
          message: `Admin responded to your ticket #${ticket.ticketNumber}: "${ticket.subject}"`,
          type: 'ticket',
          read: false
        });
        await user.save();

        // Send email notification
        await sendTicketReplyEmail(user.email, user.name, ticket.subject);
      }
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, priority, assignedTo, tags, internalNotes } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (assignedTo) ticket.assignedTo = assignedTo;
    if (tags) ticket.tags = tags;
    if (internalNotes !== undefined) ticket.internalNotes = internalNotes;

    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTicketStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const stats = {
      total: await Ticket.countDocuments(),
      open: await Ticket.countDocuments({ status: 'open' }),
      inProgress: await Ticket.countDocuments({ status: 'in-progress' }),
      resolved: await Ticket.countDocuments({ status: 'resolved' }),
      closed: await Ticket.countDocuments({ status: 'closed' }),
      urgent: await Ticket.countDocuments({ priority: 'urgent', status: { $ne: 'closed' } }),
      high: await Ticket.countDocuments({ priority: 'high', status: { $ne: 'closed' } }),
      byType: await Ticket.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]),
      byPriority: await Ticket.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ])
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


