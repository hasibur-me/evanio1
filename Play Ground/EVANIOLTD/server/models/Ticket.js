import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    type: String
  }]
}, {
  timestamps: true
});

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  type: {
    type: String,
    enum: ['support', 'order', 'inquiry', 'technical', 'billing', 'feature'],
    default: 'support'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    type: String
  }],
  replies: [replySchema],
  // Legacy field for backward compatibility
  adminResponse: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  internalNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
ticketSchema.index({ userId: 1, createdAt: -1 });
ticketSchema.index({ status: 1, priority: 1 });
ticketSchema.index({ assignedTo: 1, status: 1 });
// ticketNumber already has unique: true which creates an index
ticketSchema.index({ orderId: 1 });

export default mongoose.model('Ticket', ticketSchema);


