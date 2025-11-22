import Webhook from '../models/Webhook.js';
import crypto from 'crypto';

// Create webhook
export const createWebhook = async (req, res) => {
  try {
    const { name, url, events, headers } = req.body;

    if (!name || !url || !events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ message: 'Name, URL, and events are required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Generate secret
    const secret = crypto.randomBytes(32).toString('hex');

    const webhook = await Webhook.create({
      name,
      url,
      secret,
      events,
      headers: headers || {},
      userId: req.user._id,
      isActive: true
    });

    res.status(201).json({
      message: 'Webhook created successfully',
      webhook: {
        _id: webhook._id,
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        secret: webhook.secret, // Only show secret once
        createdAt: webhook.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating webhook:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's webhooks
export const getMyWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.find({ userId: req.user._id })
      .select('-secret') // Don't send secret in list
      .sort({ createdAt: -1 });

    res.json(webhooks);
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all webhooks (admin)
export const getAllWebhooks = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const webhooks = await Webhook.find()
      .populate('userId', 'name email')
      .select('-secret')
      .sort({ createdAt: -1 });

    res.json(webhooks);
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single webhook
export const getWebhook = async (req, res) => {
  try {
    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Check permissions
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Only show secret if it's the owner or admin
    const webhookData = webhook.toObject();
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      delete webhookData.secret;
    }

    res.json(webhookData);
  } catch (error) {
    console.error('Error fetching webhook:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update webhook
export const updateWebhook = async (req, res) => {
  try {
    const { name, url, events, headers, isActive } = req.body;

    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Check permissions
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (name) webhook.name = name;
    if (url) {
      try {
        new URL(url);
        webhook.url = url;
      } catch (error) {
        return res.status(400).json({ message: 'Invalid URL format' });
      }
    }
    if (events && Array.isArray(events)) webhook.events = events;
    if (headers) webhook.headers = { ...webhook.headers, ...headers };
    if (typeof isActive === 'boolean') webhook.isActive = isActive;

    await webhook.save();

    res.json({
      message: 'Webhook updated successfully',
      webhook
    });
  } catch (error) {
    console.error('Error updating webhook:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete webhook
export const deleteWebhook = async (req, res) => {
  try {
    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Check permissions
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Webhook.findByIdAndDelete(req.params.id);

    res.json({ message: 'Webhook deleted successfully' });
  } catch (error) {
    console.error('Error deleting webhook:', error);
    res.status(500).json({ message: error.message });
  }
};

// Test webhook
export const testWebhook = async (req, res) => {
  try {
    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Check permissions
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Send test event
    const { sendWebhookEvent } = await import('../utils/webhookSender.js');
    const results = await sendWebhookEvent('test', {
      message: 'This is a test webhook event',
      timestamp: new Date().toISOString()
    });

    res.json({
      message: 'Test webhook sent',
      results
    });
  } catch (error) {
    console.error('Error testing webhook:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get webhook events
export const getWebhookEvents = async (req, res) => {
  try {
    const webhook = await Webhook.findById(req.params.id);

    if (!webhook) {
      return res.status(404).json({ message: 'Webhook not found' });
    }

    // Check permissions
    if (webhook.userId && webhook.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const events = webhook.events
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + parseInt(limit));

    res.json({
      events,
      total: webhook.events.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(webhook.events.length / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    res.status(500).json({ message: error.message });
  }
};

