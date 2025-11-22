import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  username: {
    type: String,
    trim: true,
    default: ''
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    trim: true,
    default: ''
  },
  state: {
    type: String,
    trim: true,
    default: ''
  },
  zipCode: {
    type: String,
    trim: true,
    default: ''
  },
  country: {
    type: String,
    trim: true,
    default: ''
  },
  facebookLink: {
    type: String,
    trim: true,
    default: ''
  },
  whatsapp: {
    type: String,
    trim: true,
    default: ''
  },
  instagram: {
    type: String,
    trim: true,
    default: ''
  },
  linkedin: {
    type: String,
    trim: true,
    default: ''
  },
  profilePicture: {
    type: String,
    default: null
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }],
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  notifications: [{
    message: {
      type: String,
      default: 'Notification',
      trim: true,
      validate: {
        validator: function(v) {
          // Allow empty during migration, but ensure it has a default
          return v !== null && v !== undefined;
        },
        message: 'Notification message cannot be null or undefined'
      }
    },
    type: {
      type: String,
      enum: ['document', 'ticket', 'payment', 'order', 'system'],
      default: 'system'
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  emailPreferences: {
    receiveWelcomeEmails: {
      type: Boolean,
      default: true
    },
    receiveOrderEmails: {
      type: Boolean,
      default: true
    },
    receivePaymentEmails: {
      type: Boolean,
      default: true
    },
    receiveDocumentEmails: {
      type: Boolean,
      default: true
    },
    receiveTicketEmails: {
      type: Boolean,
      default: true
    },
    receiveMarketingEmails: {
      type: Boolean,
      default: false
    },
    receiveSystemEmails: {
      type: Boolean,
      default: true
    },
    receiveCriticalEmails: {
      type: Boolean,
      default: true // Always true for critical emails (payments, orders)
    }
  },
  // 2FA Settings
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    default: null
  },
  twoFactorBackupCodes: [{
    code: String,
    used: {
      type: Boolean,
      default: false
    }
  }],
  // Social Login
  socialAuth: {
    google: {
      id: String,
      email: String
    },
    facebook: {
      id: String,
      email: String
    }
  },
  // Localization
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi']
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  currency: {
    type: String,
    default: 'USD'
  },
  // Newsletter subscription
  newsletterSubscribed: {
    type: Boolean,
    default: false
  },
  newsletterSubscribedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);


