import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true
  },
  projectBrief: {
    type: String,
    required: [true, 'Project brief is required']
  },
  budget: {
    type: String,
    default: ''
  },
  files: [{
    filename: String,
    mimetype: String,
    size: Number,
    url: String
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('ServiceRequest', serviceRequestSchema);





