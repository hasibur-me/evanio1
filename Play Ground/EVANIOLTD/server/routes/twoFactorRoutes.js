import express from 'express';
import {
  enable2FA,
  verify2FASetup,
  disable2FA,
  get2FAStatus,
  regenerateBackupCodes
} from '../controllers/twoFactorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/enable', protect, enable2FA);
router.post('/verify', protect, verify2FASetup);
router.post('/disable', protect, disable2FA);
router.get('/status', protect, get2FAStatus);
router.post('/regenerate-backup-codes', protect, regenerateBackupCodes);

export default router;

