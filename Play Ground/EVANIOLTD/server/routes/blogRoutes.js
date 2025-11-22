import express from 'express';
import {
  createBlogPost,
  getPublishedPosts,
  getBlogPost,
  getCategories,
  getTags,
  likeBlogPost,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublishedPosts);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/:slug', getBlogPost);
router.post('/:slug/like', protect, likeBlogPost);

// Admin routes
router.post('/', protect, admin, createBlogPost);
router.get('/admin/all', protect, admin, getAllBlogPosts);
router.put('/admin/:id', protect, admin, updateBlogPost);
router.delete('/admin/:id', protect, admin, deleteBlogPost);

export default router;


