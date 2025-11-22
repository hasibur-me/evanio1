import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referrerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referredUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired'],
    default: 'pending'
  },
  rewardStatus: {
    type: String,
    enum: ['pending', 'earned', 'redeemed'],
    default: 'pending'
  },
  rewardAmount: {
    type: Number,
    default: 0
  },
  referredUserFirstOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
  }
}, {
  timestamps: true
});

// Indexes (referralCode already has unique: true which creates an index)
referralSchema.index({ referrerId: 1 });
referralSchema.index({ email: 1 });
referralSchema.index({ status: 1 });

export default mongoose.model('Referral', referralSchema);

