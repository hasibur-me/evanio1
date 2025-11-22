import express from 'express';
import { getDocuments, getAllDocuments, uploadDocument, deleteDocument } from '../controllers/documentController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getDocuments);
router.get('/admin/all', protect, admin, getAllDocuments);
router.post('/', protect, admin, uploadDocument);
router.delete('/:id', protect, deleteDocument);

export default router;




