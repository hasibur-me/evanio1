// Two-Factor Authentication Utilities
import crypto from 'crypto';
import { authenticator } from 'otplib';

// Generate 2FA secret
export const generate2FASecret = (email) => {
  const secret = authenticator.generateSecret();
  const serviceName = 'Evanio';
  const otpauth = authenticator.keyuri(email, serviceName, secret);
  
  return {
    secret,
    otpauth,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth)}`
  };
};

// Generate backup codes
export const generateBackupCodes = (count = 10) => {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push({
      code,
      used: false
    });
  }
  return codes;
};

// Verify 2FA token
export const verify2FAToken = (token, secret) => {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    return false;
  }
};

// Verify backup code
export const verifyBackupCode = (code, backupCodes) => {
  const backupCode = backupCodes.find(bc => bc.code === code && !bc.used);
  if (backupCode) {
    backupCode.used = true;
    return true;
  }
  return false;
};

export default {
  generate2FASecret,
  generateBackupCodes,
  verify2FAToken,
  verifyBackupCode
};


