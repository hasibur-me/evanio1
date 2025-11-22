import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  appointmentNumber: {
    type: String,
    required: true,
    unique: true,
    default: () => `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
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
    trim: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
    default: 60
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  location: {
    type: {
      type: String,
      enum: ['online', 'phone', 'in-person', 'other'],
      default: 'online'
    },
    address: String,
    meetingLink: String,
    phoneNumber: String,
    notes: String
  },
  attendees: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    email: String,
    role: {
      type: String,
      enum: ['client', 'admin', 'team'],
      default: 'client'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'tentative'],
      default: 'pending'
    }
  }],
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'notification', 'sms'],
      default: 'email'
    },
    sentAt: Date,
    scheduledFor: Date,
    sent: {
      type: Boolean,
      default: false
    }
  }],
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
    isInternal: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  }],
  cancelledAt: {
    type: Date,
    default: null
  },
  cancellationReason: {
    type: String,
    default: ''
  },
  rescheduledFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
appointmentSchema.index({ userId: 1, startTime: 1 });
appointmentSchema.index({ startTime: 1, endTime: 1 });
appointmentSchema.index({ status: 1, startTime: 1 });
// appointmentNumber already has unique: true which creates an index

export default mongoose.model('Appointment', appointmentSchema);

