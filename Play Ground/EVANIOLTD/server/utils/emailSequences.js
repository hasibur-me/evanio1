// Automated Email Sequences System
// Handles automatic email sending based on events

import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail, sendEmail } from './email.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// Email sequence configurations
const emailSequences = {
  // Order placed sequence
  orderPlaced: async (orderId) => {
    try {
      const order = await Order.findById(orderId).populate('userId', 'email name');
      if (!order || !order.userId) return;

      // Send order confirmation immediately
      await sendOrderConfirmationEmail(
        order.userId.email,
        order.userId.name,
        order.orderNumber,
        order.service,
        order.amount,
        order.orderStatus
      );
    } catch (error) {
      console.error('Error in orderPlaced sequence:', error);
    }
  },

  // Order status changed sequence
  orderStatusChanged: async (orderId, oldStatus, newStatus) => {
    try {
      const order = await Order.findById(orderId).populate('userId', 'email name');
      if (!order || !order.userId) return;

      // Only send if status actually changed
      if (oldStatus === newStatus) return;

      // Send status update email
      await sendOrderStatusUpdateEmail(
        order.userId.email,
        order.userId.name,
        order.orderNumber,
        order.service,
        newStatus,
        getStatusMessage(newStatus)
      );
    } catch (error) {
      console.error('Error in orderStatusChanged sequence:', error);
    }
  },

  // Payment completed sequence
  paymentCompleted: async (paymentId, orderId) => {
    try {
      const order = await Order.findById(orderId).populate('userId', 'email name');
      if (!order || !order.userId) return;

      // Send payment success email (handled by payment controller)
      // This is just a placeholder for future sequences
    } catch (error) {
      console.error('Error in paymentCompleted sequence:', error);
    }
  },

  // Welcome sequence (can be extended with follow-ups)
  welcomeSequence: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      // Welcome email is sent during registration
      // Future: Can add follow-up emails here (e.g., after 3 days, 7 days)
    } catch (error) {
      console.error('Error in welcomeSequence:', error);
    }
  },

  // Abandoned cart sequence (future)
  abandonedCart: async (userId, cartItems) => {
    // Future implementation
    console.log('Abandoned cart sequence - to be implemented');
  },

  // Order completion follow-up sequence
  orderCompletedFollowUp: async (orderId) => {
    try {
      const order = await Order.findById(orderId).populate('userId', 'email name');
      if (!order || !order.userId) return;

      // Send follow-up email after order completion
      await sendEmail(order.userId.email, 'custom', {
        subject: 'How was your experience?',
        message: `Hi ${order.userId.name},\n\nThank you for choosing Evanio! We hope you're satisfied with your ${order.service} service.\n\nWe'd love to hear your feedback. If you have any questions or need further assistance, please don't hesitate to reach out.\n\nBest regards,\nThe Evanio Team`,
        actionUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/orders`,
        actionText: 'View Order'
      });
    } catch (error) {
      console.error('Error in orderCompletedFollowUp sequence:', error);
    }
  }
};

// Helper function to get status messages
const getStatusMessage = (status) => {
  const messages = {
    'pending': 'Your order is pending confirmation. We will process it shortly.',
    'confirmed': 'Your order has been confirmed and is now in our queue.',
    'in-progress': 'Your order is currently being processed by our team.',
    'completed': 'Your order has been completed successfully!',
    'cancelled': 'Your order has been cancelled. If you have any questions, please contact support.'
  };
  return messages[status] || 'Your order status has been updated.';
};

// Trigger email sequence
export const triggerEmailSequence = async (sequenceName, ...args) => {
  try {
    if (emailSequences[sequenceName]) {
      await emailSequences[sequenceName](...args);
    } else {
      console.warn(`Email sequence "${sequenceName}" not found`);
    }
  } catch (error) {
    console.error(`Error triggering email sequence "${sequenceName}":`, error);
  }
};

// Schedule delayed email (for future implementation with job queue)
export const scheduleEmail = async (email, template, variables, delayMs) => {
  // Future: Implement with Bull, Agenda, or similar job queue
  setTimeout(async () => {
    await sendEmail(email, template, variables);
  }, delayMs);
};

export default emailSequences;


