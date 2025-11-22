import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dayOfWeek: {
    type: Number, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    required: true,
    min: 0,
    max: 6
  },
  startTime: {
    type: String, // Format: "HH:MM" in 24-hour format
    required: true,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
  },
  endTime: {
    type: String, // Format: "HH:MM" in 24-hour format
    required: true,
    match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  serviceSlug: {
    type: String,
    default: null // null means available for all services
  }
}, {
  timestamps: true
});

// Index for efficient queries
availabilitySchema.index({ userId: 1, dayOfWeek: 1 });
availabilitySchema.index({ userId: 1, serviceSlug: 1 });

// Prevent duplicate availability slots
availabilitySchema.index({ userId: 1, dayOfWeek: 1, startTime: 1, endTime: 1 }, { unique: true });

export default mongoose.model('Availability', availabilitySchema);


