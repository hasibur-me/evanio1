import express from 'express';
import { getThemeSettings, updateThemeSettings } from '../controllers/themeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get theme settings (public for frontend to use)
router.get('/', getThemeSettings);

// Update theme settings (admin only)
router.put('/', protect, admin, updateThemeSettings);

export default router;





