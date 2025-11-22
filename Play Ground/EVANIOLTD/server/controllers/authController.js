import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { sendWelcomeEmail } from '../utils/email.js';
import { triggerEmailSequence } from '../utils/emailSequences.js';
import { verify2FAToken, verifyBackupCode } from '../utils/twoFactor.js';
import { processReferral } from './referralController.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the first user (no users exist) - make them admin
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    // Only allow admin role if no admin exists yet, or if explicitly provided by existing admin
    let userRole = 'user';
    if (isFirstUser) {
      userRole = 'admin';
      console.log('First user registered - assigning admin role');
    } else if (role === 'admin') {
      // Check if any admin exists - only allow if none exists
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        userRole = 'admin';
        console.log('No admin exists - allowing admin registration');
      }
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: userRole,
    });

    // Process referral if referral code provided
    const { referralCode } = req.body;
    if (referralCode) {
      await processReferral(user._id, referralCode, normalizedEmail);
    }

    // Send welcome email
    await sendWelcomeEmail(normalizedEmail, name);
    
    // Trigger welcome email sequence
    await triggerEmailSequence('welcomeSequence', user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || 'An error occurred during registration. Please try again.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      const { twoFactorToken } = req.body;
      
      if (!twoFactorToken) {
        return res.status(200).json({
          requires2FA: true,
          message: '2FA code required'
        });
      }

      // Verify 2FA token
      let isTokenValid = verify2FAToken(twoFactorToken, user.twoFactorSecret);
      
      // If token invalid, try backup code
      if (!isTokenValid) {
        isTokenValid = verifyBackupCode(twoFactorToken, user.twoFactorBackupCodes);
        if (isTokenValid) {
          await user.save(); // Save backup code usage
        }
      }

      if (!isTokenValid) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
      }
    }

    // Generate token and return user data
    const token = generateToken(user._id);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
      requires2FA: false
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: error.message || 'An error occurred during login. Please try again.' 
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('documents')
      .populate('tickets')
      .populate('payments')
      .select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


