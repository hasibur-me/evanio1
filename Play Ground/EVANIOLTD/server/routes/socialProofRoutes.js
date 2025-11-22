import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get recent purchases for social proof
router.get('/orders/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const orders = await Order.find({
      paymentStatus: 'completed',
      orderStatus: { $ne: 'cancelled' }
    })
      .select('service customerDetails createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'name email')
      .lean();

    const purchases = orders.map(order => {
      const location = order.customerDetails?.company || 'Global';
      const timeAgo = getTimeAgo(order.createdAt);
      
      return {
        service: order.service,
        location: location,
        time: timeAgo,
        customer: order.userId?.name || 'Anonymous'
      };
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error fetching recent purchases:', error);
    res.status(500).json({ error: 'Failed to fetch recent purchases' });
  }
});

// Get recent activities for social proof
router.get('/activities/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const activities = [];

    // Get recent reviews
    const recentReviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(2)
      .populate('userId', 'name')
      .lean();

    recentReviews.forEach(review => {
      if (review.rating >= 4) {
        activities.push({
          type: 'review',
          message: `${review.userId?.name || 'Someone'} left a ${review.rating}-star review`,
          time: getTimeAgo(review.createdAt),
          icon: 'Award'
        });
      }
    });

    // Get recent orders
    const recentOrders = await Order.find({
      paymentStatus: 'completed',
      orderStatus: { $ne: 'cancelled' }
    })
      .sort({ createdAt: -1 })
      .limit(2)
      .populate('userId', 'name')
      .lean();

    recentOrders.forEach(order => {
      activities.push({
        type: 'purchase',
        message: `New order: ${order.service}`,
        time: getTimeAgo(order.createdAt),
        icon: 'ShoppingBag'
      });
    });

    // Get recent signups
    const recentSignups = await User.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .select('name createdAt')
      .lean();

    recentSignups.forEach(user => {
      activities.push({
        type: 'signup',
        message: `${user.name || 'Someone'} just signed up`,
        time: getTimeAgo(user.createdAt),
        icon: 'Users'
      });
    });

    // Sort by time and limit
    activities.sort((a, b) => {
      const timeA = getTimeInMinutes(a.time);
      const timeB = getTimeInMinutes(b.time);
      return timeA - timeB;
    });

    res.json(activities.slice(0, limit));
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ error: 'Failed to fetch recent activities' });
  }
});

// Get live visitor count (mock for now, can be integrated with analytics)
router.get('/visitors/count', async (req, res) => {
  try {
    // In production, this would come from analytics service
    const baseCount = 42;
    const variation = Math.floor(Math.random() * 15) - 7;
    const count = Math.max(1, baseCount + variation);

    res.json({ count, timestamp: new Date() });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

// Helper function to get time ago string
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(date).toLocaleDateString();
}

// Helper function to convert time string to minutes for sorting
function getTimeInMinutes(timeStr) {
  if (timeStr === 'just now') return 0;
  const match = timeStr.match(/(\d+)\s*(minute|hour|day)/);
  if (!match) return 999999;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  if (unit === 'minute') return value;
  if (unit === 'hour') return value * 60;
  if (unit === 'day') return value * 1440;
  return 999999;
}

export default router;


