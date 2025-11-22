import mongoose from 'mongoose';

const themeSettingsSchema = new mongoose.Schema({
  // Logo Settings
  logoImage: {
    type: String,
    default: '/logo.png', // Path to logo image file
  },
  
  // Color Settings
  primaryColor: {
    type: String,
    default: '#3B82F6', // Blue
  },
  secondaryColor: {
    type: String,
    default: '#8B5CF6', // Purple
  },
  accentColor: {
    type: String,
    default: '#EC4899', // Pink
  },
  backgroundColor: {
    type: String,
    default: 'from-blue-100 via-purple-100 to-pink-100',
  },
  
  // Header Settings
  headerBackground: {
    type: String,
    default: 'bg-white/10',
  },
  headerBorder: {
    type: String,
    default: 'border-white/20',
  },
  
  // Button Settings
  buttonPrimary: {
    background: { type: String, default: 'bg-blue-600/80' },
    border: { type: String, default: 'border-blue-500/50' },
    hover: { type: String, default: 'hover:bg-blue-600/90' },
  },
  buttonSecondary: {
    background: { type: String, default: 'bg-white/20' },
    border: { type: String, default: 'border-white/30' },
    hover: { type: String, default: 'hover:bg-white/30' },
  },
  
  // Text Settings
  headingColor: {
    type: String,
    default: 'text-white',
  },
  bodyTextColor: {
    type: String,
    default: 'text-white/80',
  },
  
  // Image Settings
  heroImage: {
    type: String,
    default: '',
  },
  serviceImages: [{
    serviceId: String,
    imageUrl: String,
  }],
  aboutImage: {
    type: String,
    default: '',
  },
  
  // Pricing Settings
  currency: {
    type: String,
    default: 'USD',
  },
  currencySymbol: {
    type: String,
    default: '$',
  },
  
  // Meta Settings
  siteTitle: {
    type: String,
    default: 'Evanio - Launch & Grow Your Business',
  },
  siteDescription: {
    type: String,
    default: 'Business formation, website development, branding, payment setup, and full business growth solutions.',
  },
  
  // Updated by
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

// Ensure only one theme settings document exists
themeSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export default mongoose.model('ThemeSettings', themeSettingsSchema);

