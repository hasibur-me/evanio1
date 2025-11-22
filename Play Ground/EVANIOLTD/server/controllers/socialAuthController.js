// Social Authentication Controller
// Note: This is a simplified implementation. For production, use Passport.js with proper OAuth flows

import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { sendWelcomeEmail } from '../utils/email.js';

// Google OAuth callback
export const googleAuth = async (req, res) => {
  try {
    const { id, email, name, picture } = req.body;

    if (!id || !email) {
      return res.status(400).json({ message: 'Google ID and email are required' });
    }

    // Check if user exists with this email
    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user) {
      // Update social auth info
      if (!user.socialAuth) user.socialAuth = {};
      user.socialAuth.google = { id, email };
      if (picture && !user.profilePicture) user.profilePicture = picture;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        password: crypto.randomBytes(32).toString('hex'), // Random password for social auth
        socialAuth: {
          google: { id, email }
        },
        profilePicture: picture || null,
        newsletterSubscribed: false
      });

      // Send welcome email
      await sendWelcomeEmail(user.email, user.name);
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Facebook OAuth callback
export const facebookAuth = async (req, res) => {
  try {
    const { id, email, name, picture } = req.body;

    if (!id || !email) {
      return res.status(400).json({ message: 'Facebook ID and email are required' });
    }

    // Check if user exists with this email
    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (user) {
      // Update social auth info
      if (!user.socialAuth) user.socialAuth = {};
      user.socialAuth.facebook = { id, email };
      if (picture && !user.profilePicture) user.profilePicture = picture;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        password: crypto.randomBytes(32).toString('hex'), // Random password for social auth
        socialAuth: {
          facebook: { id, email }
        },
        profilePicture: picture || null,
        newsletterSubscribed: false
      });

      // Send welcome email
      await sendWelcomeEmail(user.email, user.name);
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Facebook auth error:', error);
    res.status(500).json({ message: error.message });
  }
};

