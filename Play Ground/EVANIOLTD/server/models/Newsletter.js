import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'bounced'],
    default: 'subscribed'
  },
  source: {
    type: String,
    enum: ['website', 'dashboard', 'admin', 'import'],
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  unsubscribedAt: {
    type: Date,
    default: null
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes (email already has unique: true which creates an index)
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ userId: 1 });

export default mongoose.model('Newsletter', newsletterSchema);

