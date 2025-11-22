import Referral from '../models/Referral.js';
import Loyalty from '../models/Loyalty.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import crypto from 'crypto';

// Generate unique referral code
const generateReferralCode = async () => {
  let code;
  let exists = true;
  
  while (exists) {
    code = crypto.randomBytes(4).toString('hex').toUpperCase();
    const existing = await Referral.findOne({ referralCode: code });
    exists = !!existing;
  }
  
  return code;
};

// Get or create user's referral code
export const getMyReferralCode = async (req, res) => {
  try {
    let referral = await Referral.findOne({ referrerId: req.user._id });
    
    if (!referral) {
      const code = await generateReferralCode();
      referral = await Referral.create({
        referrerId: req.user._id,
        referralCode: code
      });
    }

    // Get referral stats
    const stats = await getReferralStats(req.user._id);

    res.json({
      referralCode: referral.referralCode,
      referralLink: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/register?ref=${referral.referralCode}`,
      stats
    });
  } catch (error) {
    console.error('Error getting referral code:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get referral stats
const getReferralStats = async (userId) => {
  const totalReferrals = await Referral.countDocuments({ referrerId: userId });
  const completedReferrals = await Referral.countDocuments({ 
    referrerId: userId, 
    status: 'completed' 
  });
  const totalRewards = await Referral.aggregate([
    { $match: { referrerId: userId, rewardStatus: 'earned' } },
    { $group: { _id: null, total: { $sum: '$rewardAmount' } } }
  ]);

  return {
    totalReferrals,
    completedReferrals,
    pendingReferrals: totalReferrals - completedReferrals,
    totalRewards: totalRewards[0]?.total || 0
  };
};

// Get user's referrals
export const getMyReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({ referrerId: req.user._id })
      .populate('referredUserId', 'name email createdAt')
      .populate('referredUserFirstOrder', 'orderNumber amount')
      .sort({ createdAt: -1 });

    const stats = await getReferralStats(req.user._id);

    res.json({
      referrals,
      stats
    });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ message: error.message });
  }
};

// Process referral when user registers
export const processReferral = async (userId, referralCode, email) => {
  try {
    if (!referralCode) return null;

    const referral = await Referral.findOne({ 
      referralCode: referralCode.toUpperCase() 
    });

    if (!referral) return null;

    // Check if already used by this email
    if (referral.email && referral.email.toLowerCase() === email.toLowerCase()) {
      return referral;
    }

    // Update referral
    referral.referredUserId = userId;
    referral.email = email;
    referral.status = 'pending'; // Will be completed when first order is placed

    await referral.save();
    return referral;
  } catch (error) {
    console.error('Error processing referral:', error);
    return null;
  }
};

// Complete referral when referred user places first order
export const completeReferral = async (orderId, userId) => {
  try {
    const referral = await Referral.findOne({ 
      referredUserId: userId,
      status: 'pending'
    });

    if (!referral) return null;

    const order = await Order.findById(orderId);
    if (!order) return null;

    // Mark referral as completed
    referral.status = 'completed';
    referral.completedAt = new Date();
    referral.referredUserFirstOrder = orderId;

    // Calculate reward (e.g., 10% of first order or fixed amount)
    const rewardAmount = Math.max(10, Math.floor(order.amount * 0.1)); // Minimum $10 or 10% of order
    referral.rewardAmount = rewardAmount;
    referral.rewardStatus = 'earned';

    await referral.save();

    // Add loyalty points to referrer
    await addLoyaltyPoints(referral.referrerId, rewardAmount, 'referral', `Referral reward for ${order.orderNumber}`, referral._id);

    // Add loyalty points to referred user (welcome bonus)
    await addLoyaltyPoints(userId, 50, 'bonus', 'Welcome bonus for signing up with referral', null);

    return referral;
  } catch (error) {
    console.error('Error completing referral:', error);
    return null;
  }
};

// Add loyalty points helper
const addLoyaltyPoints = async (userId, points, type, description, referenceId) => {
  try {
    let loyalty = await Loyalty.findOne({ userId });
    
    if (!loyalty) {
      loyalty = await Loyalty.create({ userId });
    }

    loyalty.totalPoints += points;
    loyalty.availablePoints += points;
    loyalty.lifetimePoints += points;
    loyalty.updateTier();

    loyalty.transactions.push({
      userId,
      type,
      points,
      description,
      referralId: type === 'referral' ? referenceId : null,
      orderId: type === 'earned' ? referenceId : null
    });

    await loyalty.save();
    return loyalty;
  } catch (error) {
    console.error('Error adding loyalty points:', error);
    return null;
  }
};

// Get loyalty points
export const getLoyaltyPoints = async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ userId: req.user._id });

    if (!loyalty) {
      loyalty = await Loyalty.create({ userId: req.user._id });
    }

    res.json(loyalty);
  } catch (error) {
    console.error('Error fetching loyalty points:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get loyalty transactions
export const getLoyaltyTransactions = async (req, res) => {
  try {
    const loyalty = await Loyalty.findOne({ userId: req.user._id });

    if (!loyalty) {
      return res.json({ transactions: [] });
    }

    res.json({ transactions: loyalty.transactions.sort((a, b) => b.createdAt - a.createdAt) });
  } catch (error) {
    console.error('Error fetching loyalty transactions:', error);
    res.status(500).json({ message: error.message });
  }
};

// Redeem loyalty points (create discount code or apply to order)
export const redeemLoyaltyPoints = async (req, res) => {
  try {
    const { points, type } = req.body; // type: 'discount' or 'order'

    if (!points || points <= 0) {
      return res.status(400).json({ message: 'Invalid points amount' });
    }

    const loyalty = await Loyalty.findOne({ userId: req.user._id });

    if (!loyalty || loyalty.availablePoints < points) {
      return res.status(400).json({ message: 'Insufficient loyalty points' });
    }

    // Calculate discount value (e.g., 100 points = $1)
    const discountValue = points / 100;

    loyalty.availablePoints -= points;
    loyalty.transactions.push({
      userId: req.user._id,
      type: 'redeemed',
      points: -points,
      description: `Redeemed ${points} points for $${discountValue.toFixed(2)} discount`
    });

    await loyalty.save();

    res.json({
      message: 'Points redeemed successfully',
      discountValue,
      remainingPoints: loyalty.availablePoints
    });
  } catch (error) {
    console.error('Error redeeming loyalty points:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all referrals
export const getAllReferrals = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const referrals = await Referral.find()
      .populate('referrerId', 'name email')
      .populate('referredUserId', 'name email')
      .sort({ createdAt: -1 });

    res.json(referrals);
  } catch (error) {
    console.error('Error fetching all referrals:', error);
    res.status(500).json({ message: error.message });
  }
};

