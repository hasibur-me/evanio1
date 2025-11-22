import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  serviceSlug: {
    type: String,
    required: true,
    trim: true
  },
  package: {
    type: String,
    trim: true,
    default: ''
  },
  addons: [{
    name: String,
    price: Number
  }],
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'bank_transfer'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    default: null
  },
  stripeSessionId: {
    type: String,
    default: null
  },
  bankTransferDetails: {
    transactionId: String,
    bankName: String,
    accountNumber: String,
    notes: String,
    proofOfPayment: String
  },
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  projectBrief: {
    type: String,
    default: ''
  },
  adminNotes: {
    type: String,
    default: ''
  },
  workflowSteps: {
    type: [{
      stepId: {
        type: String,
        required: true
      },
      stepName: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'skipped'],
        default: 'pending'
      },
      completedAt: {
        type: Date,
        default: null
      },
      notes: {
        type: String,
        default: ''
      }
    }],
    default: []
  },
  currentStep: {
    type: String,
    default: null
  },
  timeline: [{
    event: {
      type: String,
      required: true,
      enum: ['created', 'status_changed', 'payment_received', 'payment_failed', 'step_completed', 'step_started', 'note_added', 'cancelled', 'completed']
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }, {
    timestamps: true
  }],
  estimatedDeliveryDate: {
    type: Date,
    default: null
  },
  actualDeliveryDate: {
    type: Date,
    default: null
  },
  notes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isInternal: {
      type: Boolean,
      default: false // If true, only visible to admins
    }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

// Index for faster queries
orderSchema.index({ userId: 1, createdAt: -1 });
// orderNumber index is automatically created by unique: true
orderSchema.index({ paymentStatus: 1, orderStatus: 1 });
orderSchema.index({ estimatedDeliveryDate: 1 });
orderSchema.index({ 'timeline.createdAt': -1 });

export default mongoose.model('Order', orderSchema);

