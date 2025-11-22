import Review from '../models/Review.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// Create a review
export const createReview = async (req, res) => {
  try {
    const { orderId, rating, title, comment, images, tags } = req.body;

    if (!orderId || !rating || !comment) {
      return res.status(400).json({ message: 'Order ID, rating, and comment are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to review this order' });
    }

    // Check if order is completed
    if (order.orderStatus !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed orders' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ orderId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this order' });
    }

    const review = await Review.create({
      userId: req.user._id,
      orderId,
      serviceSlug: order.serviceSlug,
      serviceName: order.service,
      rating,
      title: title || '',
      comment,
      images: images || [],
      tags: tags || [],
      status: 'pending' // Requires admin approval
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get reviews (public)
export const getReviews = async (req, res) => {
  try {
    const { serviceSlug, status, rating, page = 1, limit = 10, sort = 'newest' } = req.query;

    let filter = { status: 'approved' }; // Only show approved reviews

    if (serviceSlug) {
      filter.serviceSlug = serviceSlug;
    }

    if (rating) {
      filter.rating = parseInt(rating);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortOption = {};
    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'highest') {
      sortOption = { rating: -1 };
    } else if (sort === 'lowest') {
      sortOption = { rating: 1 };
    } else if (sort === 'helpful') {
      sortOption = { helpfulCount: -1 };
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate('userId', 'name email profilePicture')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      Review.countDocuments(filter)
    ]);

    res.json({
      reviews,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get review statistics
export const getReviewStats = async (req, res) => {
  try {
    const { serviceSlug } = req.query;

    let filter = { status: 'approved' };
    if (serviceSlug) {
      filter.serviceSlug = serviceSlug;
    }

    const reviews = await Review.find(filter);
    
    const stats = {
      total: reviews.length,
      average: reviews.length > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0,
      distribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching review stats:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's reviews
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('orderId', 'orderNumber service')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark review as helpful
export const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const userId = req.user._id.toString();
    const isAlreadyHelpful = review.helpfulUsers.some(u => u.toString() === userId);

    if (isAlreadyHelpful) {
      // Remove helpful
      review.helpfulUsers = review.helpfulUsers.filter(u => u.toString() !== userId);
      review.helpfulCount = Math.max(0, review.helpfulCount - 1);
    } else {
      // Add helpful
      review.helpfulUsers.push(req.user._id);
      review.helpfulCount += 1;
    }

    await review.save();
    res.json({ helpfulCount: review.helpfulCount, isHelpful: !isAlreadyHelpful });
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all reviews (including pending)
export const getAllReviews = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate('userId', 'name email')
        .populate('orderId', 'orderNumber')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Review.countDocuments(filter)
    ]);

    res.json({
      reviews,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve/Reject review
export const updateReviewStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    res.json({ message: `Review ${status} successfully`, review });
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Respond to review
export const respondToReview = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Response message is required' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.adminResponse = {
      message: message.trim(),
      respondedBy: req.user._id,
      respondedAt: new Date()
    };

    await review.save();
    res.json({ message: 'Response added successfully', review });
  } catch (error) {
    console.error('Error responding to review:', error);
    res.status(500).json({ message: error.message });
  }
};

