import User from '../models/User.js';
import { generate2FASecret, generateBackupCodes, verify2FAToken, verifyBackupCode } from '../utils/twoFactor.js';
import QRCode from 'qrcode';

// Enable 2FA
export const enable2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA is already enabled' });
    }

    const { secret, otpauth, qrCode } = generate2FASecret(user.email);
    const backupCodes = generateBackupCodes(10);

    user.twoFactorSecret = secret;
    user.twoFactorBackupCodes = backupCodes;

    // Generate QR code data URL
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);

    await user.save();

    res.json({
      message: '2FA setup initiated. Please verify with a code to complete setup.',
      secret,
      qrCode: qrCodeDataUrl,
      backupCodes: backupCodes.map(bc => bc.code),
      manualEntryKey: secret
    });
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    res.status(500).json({ message: error.message });
  }
};

// Verify and complete 2FA setup
export const verify2FASetup = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findById(req.user._id);

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: '2FA setup not initiated. Please enable 2FA first.' });
    }

    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA is already enabled' });
    }

    const isValid = verify2FAToken(token, user.twoFactorSecret);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({
      message: '2FA enabled successfully',
      backupCodes: user.twoFactorBackupCodes.map(bc => bc.code)
    });
  } catch (error) {
    console.error('Error verifying 2FA setup:', error);
    res.status(500).json({ message: error.message });
  }
};

// Disable 2FA
export const disable2FA = async (req, res) => {
  try {
    const { password, token } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA is not enabled' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Verify 2FA token or backup code
    let isTokenValid = false;
    if (token) {
      isTokenValid = verify2FAToken(token, user.twoFactorSecret);
      
      if (!isTokenValid) {
        // Try backup code
        isTokenValid = verifyBackupCode(token, user.twoFactorBackupCodes);
      }
    }

    if (!isTokenValid) {
      return res.status(401).json({ message: 'Invalid 2FA code or backup code' });
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.twoFactorBackupCodes = [];

    await user.save();

    res.json({ message: '2FA disabled successfully' });
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get 2FA status
export const get2FAStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('twoFactorEnabled twoFactorBackupCodes');

    res.json({
      enabled: user.twoFactorEnabled || false,
      backupCodesRemaining: user.twoFactorBackupCodes?.filter(bc => !bc.used).length || 0
    });
  } catch (error) {
    console.error('Error getting 2FA status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Regenerate backup codes
export const regenerateBackupCodes = async (req, res) => {
  try {
    const { password, token } = req.body;

    const user = await User.findById(req.user._id);

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA is not enabled' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Verify 2FA token
    if (token) {
      const isTokenValid = verify2FAToken(token, user.twoFactorSecret);
      if (!isTokenValid) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
      }
    }

    const backupCodes = generateBackupCodes(10);
    user.twoFactorBackupCodes = backupCodes;
    await user.save();

    res.json({
      message: 'Backup codes regenerated successfully',
      backupCodes: backupCodes.map(bc => bc.code)
    });
  } catch (error) {
    console.error('Error regenerating backup codes:', error);
    res.status(500).json({ message: error.message });
  }
};

