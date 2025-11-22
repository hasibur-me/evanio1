import User from '../models/User.js';
import { sendCustomEmail, sendEmail } from '../utils/email.js';

// Get user email preferences
export const getEmailPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('emailPreferences');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      emailPreferences: user.emailPreferences || {
        receiveWelcomeEmails: true,
        receiveOrderEmails: true,
        receivePaymentEmails: true,
        receiveDocumentEmails: true,
        receiveTicketEmails: true,
        receiveMarketingEmails: false,
        receiveSystemEmails: true,
        receiveCriticalEmails: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user email preferences
export const updateEmailPreferences = async (req, res) => {
  try {
    const {
      receiveWelcomeEmails,
      receiveOrderEmails,
      receivePaymentEmails,
      receiveDocumentEmails,
      receiveTicketEmails,
      receiveMarketingEmails,
      receiveSystemEmails,
      receiveCriticalEmails
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize emailPreferences if it doesn't exist
    if (!user.emailPreferences) {
      user.emailPreferences = {};
    }

    // Update preferences (only if provided)
    if (typeof receiveWelcomeEmails === 'boolean') {
      user.emailPreferences.receiveWelcomeEmails = receiveWelcomeEmails;
    }
    if (typeof receiveOrderEmails === 'boolean') {
      user.emailPreferences.receiveOrderEmails = receiveOrderEmails;
    }
    if (typeof receivePaymentEmails === 'boolean') {
      user.emailPreferences.receivePaymentEmails = receivePaymentEmails;
    }
    if (typeof receiveDocumentEmails === 'boolean') {
      user.emailPreferences.receiveDocumentEmails = receiveDocumentEmails;
    }
    if (typeof receiveTicketEmails === 'boolean') {
      user.emailPreferences.receiveTicketEmails = receiveTicketEmails;
    }
    if (typeof receiveMarketingEmails === 'boolean') {
      user.emailPreferences.receiveMarketingEmails = receiveMarketingEmails;
    }
    if (typeof receiveSystemEmails === 'boolean') {
      user.emailPreferences.receiveSystemEmails = receiveSystemEmails;
    }
    // Critical emails should always be enabled, but allow setting
    if (typeof receiveCriticalEmails === 'boolean') {
      user.emailPreferences.receiveCriticalEmails = receiveCriticalEmails;
    }

    await user.save();

    res.json({
      message: 'Email preferences updated successfully',
      emailPreferences: user.emailPreferences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Send custom email to user(s)
export const sendCustomEmailToUser = async (req, res) => {
  try {
    const { userId, email, subject, message, actionUrl, actionText } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    let targetEmail = email;
    let targetUser = null;

    // If userId is provided, get user email
    if (userId) {
      targetUser = await User.findById(userId).select('email name');
      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      targetEmail = targetUser.email;
    }

    if (!targetEmail) {
      return res.status(400).json({ message: 'Email or userId is required' });
    }

    const result = await sendCustomEmail(targetEmail, subject, message, actionUrl, actionText);

    if (result.success) {
      res.json({
        message: 'Email sent successfully',
        emailId: result.id
      });
    } else if (result.skipped) {
      res.json({
        message: 'Email skipped due to user preferences',
        skipped: true
      });
    } else {
      res.status(500).json({
        message: 'Failed to send email',
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Send bulk email to multiple users
export const sendBulkEmail = async (req, res) => {
  try {
    const { userIds, userRole, subject, message, actionUrl, actionText } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    let users = [];

    // Get users based on criteria
    if (userIds && userIds.length > 0) {
      users = await User.find({ _id: { $in: userIds } }).select('email name emailPreferences');
    } else if (userRole) {
      users = await User.find({ role: userRole }).select('email name emailPreferences');
    } else {
      return res.status(400).json({ message: 'userIds or userRole is required' });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    const results = {
      sent: 0,
      skipped: 0,
      failed: 0,
      errors: []
    };

    // Send emails to all users
    for (const user of users) {
      const result = await sendCustomEmail(user.email, subject, message, actionUrl, actionText);
      
      if (result.success) {
        results.sent++;
      } else if (result.skipped) {
        results.skipped++;
      } else {
        results.failed++;
        results.errors.push({
          email: user.email,
          error: result.error
        });
      }
    }

    res.json({
      message: `Bulk email completed: ${results.sent} sent, ${results.skipped} skipped, ${results.failed} failed`,
      results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get email templates list
export const getEmailTemplates = async (req, res) => {
  try {
    const templates = [
      {
        id: 'welcome',
        name: 'Welcome Email',
        description: 'Sent when a new user registers',
        variables: ['name']
      },
      {
        id: 'orderConfirmation',
        name: 'Order Confirmation',
        description: 'Sent when an order is placed',
        variables: ['name', 'orderNumber', 'service', 'amount', 'status']
      },
      {
        id: 'orderStatusUpdate',
        name: 'Order Status Update',
        description: 'Sent when order status changes',
        variables: ['name', 'orderNumber', 'service', 'status', 'message']
      },
      {
        id: 'paymentSuccess',
        name: 'Payment Success',
        description: 'Sent when payment is successful',
        variables: ['name', 'amount', 'orderNumber', 'paymentMethod']
      },
      {
        id: 'documentUploaded',
        name: 'Document Uploaded',
        description: 'Sent when a document is uploaded',
        variables: ['name', 'documentTitle', 'description']
      },
      {
        id: 'ticketReply',
        name: 'Ticket Reply',
        description: 'Sent when admin replies to a ticket',
        variables: ['name', 'ticketNumber', 'ticketSubject', 'message']
      },
      {
        id: 'custom',
        name: 'Custom Email',
        description: 'Custom email with custom content',
        variables: ['subject', 'message', 'actionUrl', 'actionText']
      }
    ];

    res.json({ templates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

