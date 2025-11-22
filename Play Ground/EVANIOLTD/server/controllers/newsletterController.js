import Newsletter from '../models/Newsletter.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    let newsletter = await Newsletter.findOne({ email: email.toLowerCase().trim() });

    if (newsletter) {
      if (newsletter.status === 'subscribed') {
        return res.status(400).json({ message: 'Email is already subscribed' });
      } else {
        // Resubscribe
        newsletter.status = 'subscribed';
        newsletter.subscribedAt = new Date();
        newsletter.unsubscribedAt = null;
        if (name) newsletter.name = name;
        if (req.user) newsletter.userId = req.user._id;
        await newsletter.save();
      }
    } else {
      // Create new subscription
      newsletter = await Newsletter.create({
        email: email.toLowerCase().trim(),
        name: name || '',
        userId: req.user?._id || null,
        source: req.user ? 'dashboard' : 'website'
      });
    }

    // Update user's newsletter preference if logged in
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.newsletterSubscribed = true;
        user.newsletterSubscribedAt = new Date();
        await user.save();
      }
    }

    // Send welcome email
    await sendEmail(newsletter.email, 'custom', {
      subject: 'Welcome to Evanio Newsletter',
      message: `Hi ${newsletter.name || 'there'},\n\nThank you for subscribing to our newsletter! You'll receive updates about our latest services, tips, and special offers.\n\nBest regards,\nThe Evanio Team`
    });

    res.json({
      message: 'Successfully subscribed to newsletter',
      newsletter: {
        email: newsletter.email,
        subscribedAt: newsletter.subscribedAt
      }
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ message: error.message });
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email, token } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const newsletter = await Newsletter.findOne({ email: email.toLowerCase().trim() });

    if (!newsletter) {
      return res.status(404).json({ message: 'Email not found in newsletter list' });
    }

    newsletter.status = 'unsubscribed';
    newsletter.unsubscribedAt = new Date();
    await newsletter.save();

    // Update user's newsletter preference if logged in
    if (newsletter.userId) {
      const user = await User.findById(newsletter.userId);
      if (user) {
        user.newsletterSubscribed = false;
        await user.save();
      }
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get newsletter subscribers (admin)
export const getNewsletterSubscribers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, page = 1, limit = 50 } = req.query;
    
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter)
        .populate('userId', 'name email')
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Newsletter.countDocuments(filter)
    ]);

    res.json({
      subscribers,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send newsletter (admin)
export const sendNewsletter = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { subject, message, segment } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    let filter = { status: 'subscribed' };
    if (segment === 'users') {
      filter.userId = { $ne: null };
    } else if (segment === 'guests') {
      filter.userId = null;
    }

    const subscribers = await Newsletter.find(filter);

    const results = {
      sent: 0,
      failed: 0,
      errors: []
    };

    for (const subscriber of subscribers) {
      try {
        await sendEmail(subscriber.email, 'custom', {
          subject,
          message: message.replace('{{name}}', subscriber.name || 'there')
        });
        results.sent++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: subscriber.email,
          error: error.message
        });
      }
    }

    res.json({
      message: `Newsletter sent: ${results.sent} sent, ${results.failed} failed`,
      results
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    res.status(500).json({ message: error.message });
  }
};


