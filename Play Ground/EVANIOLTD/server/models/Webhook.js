import mongoose from 'mongoose';

const webhookEventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  responseCode: {
    type: Number,
    default: null
  },
  responseBody: {
    type: String,
    default: null
  },
  attempts: {
    type: Number,
    default: 0
  },
  lastAttemptAt: {
    type: Date,
    default: null
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const webhookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  secret: {
    type: String,
    required: true,
    trim: true
  },
  events: [{
    type: String,
    enum: [
      'order.created',
      'order.updated',
      'order.completed',
      'order.cancelled',
      'payment.completed',
      'payment.failed',
      'user.created',
      'user.updated',
      'ticket.created',
      'ticket.updated',
      'ticket.resolved',
      'document.uploaded',
      'appointment.created',
      'appointment.cancelled'
    ]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null means system webhook
  },
  headers: {
    type: Map,
    of: String,
    default: {}
  },
  events: [webhookEventSchema],
  stats: {
    totalRequests: {
      type: Number,
      default: 0
    },
    successfulRequests: {
      type: Number,
      default: 0
    },
    failedRequests: {
      type: Number,
      default: 0
    },
    lastTriggeredAt: {
      type: Date,
      default: null
    }
  }
}, {
  timestamps: true
});

// Indexes
webhookSchema.index({ userId: 1 });
webhookSchema.index({ isActive: 1 });
webhookSchema.index({ 'events.event': 1 });

export default mongoose.model('Webhook', webhookSchema);

