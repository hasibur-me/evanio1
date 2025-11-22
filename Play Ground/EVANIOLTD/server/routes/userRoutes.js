import express from 'express';
import multer from 'multer';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
  updatePassword,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  deleteAllReadNotifications,
  getNotifications,
  getDashboardStats,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for profile picture uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Specific routes must come before parameterized routes
router.get('/stats', protect, admin, getDashboardStats);
router.put('/profile/update', protect, upload.single('profilePicture'), updateProfile);
router.put('/profile/password', protect, updatePassword);
router.get('/notifications', protect, getNotifications);
router.put('/notifications/read', protect, markNotificationRead);
router.put('/notifications/read-all', protect, markAllNotificationsRead);
router.post('/notifications/delete', protect, deleteNotification);
router.delete('/notifications/read-all', protect, deleteAllReadNotifications);

// Admin routes and parameterized routes come last
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;


