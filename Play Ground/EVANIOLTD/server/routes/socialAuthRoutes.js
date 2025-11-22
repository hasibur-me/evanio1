import express from 'express';
import {
  googleAuth,
  facebookAuth
} from '../controllers/socialAuthController.js';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);

export default router;

