import mongoose from 'mongoose';

const loyaltyTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['earned', 'redeemed', 'expired', 'bonus', 'referral'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  referralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Referral',
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const loyaltySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  availablePoints: {
    type: Number,
    default: 0
  },
  lifetimePoints: {
    type: Number,
    default: 0
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    default: 'bronze'
  },
  transactions: [loyaltyTransactionSchema],
  nextTierPoints: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate tier based on lifetime points
loyaltySchema.methods.updateTier = function() {
  if (this.lifetimePoints >= 10000) {
    this.tier = 'platinum';
    this.nextTierPoints = 0;
  } else if (this.lifetimePoints >= 5000) {
    this.tier = 'gold';
    this.nextTierPoints = 10000 - this.lifetimePoints;
  } else if (this.lifetimePoints >= 1000) {
    this.tier = 'silver';
    this.nextTierPoints = 5000 - this.lifetimePoints;
  } else {
    this.tier = 'bronze';
    this.nextTierPoints = 1000 - this.lifetimePoints;
  }
};

// Indexes (userId already has unique: true which creates an index)
loyaltySchema.index({ tier: 1 });

export default mongoose.model('Loyalty', loyaltySchema);

