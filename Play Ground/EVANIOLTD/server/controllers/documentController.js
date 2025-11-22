import Document from '../models/Document.js';
import User from '../models/User.js';
import { sendDocumentUploadedEmail } from '../utils/email.js';

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id })
      .populate('uploadedBy', 'name email')
      .sort({ timestamp: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all documents (admin only)
export const getAllDocuments = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    const documents = await Document.find()
      .populate('userId', 'name email')
      .populate('uploadedBy', 'name email')
      .sort({ timestamp: -1 });

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    const { userId, title, fileUrl, fileSize, fileType } = req.body;

    if (!userId || !title || !fileUrl) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Extract file extension if fileType not provided
    let detectedFileType = fileType || 'unknown';
    if (!fileType && fileUrl) {
      const extension = fileUrl.split('.').pop()?.toLowerCase() || 'unknown';
      detectedFileType = extension;
    }

    const document = await Document.create({
      userId,
      title,
      fileUrl,
      fileSize: fileSize || 0,
      fileType: detectedFileType,
      uploadedBy: req.user._id,
    });

    // Add to user's documents array
    const user = await User.findById(userId);
    if (user) {
      user.documents.push(document._id);
      
      // Add notification
      user.notifications.push({
        message: `New document "${title}" has been uploaded`,
        type: 'document',
        read: false
      });
      
      await user.save();

      // Send email notification
      await sendDocumentUploadedEmail(user.email, user.name, title);
    }

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if user owns the document or is admin
    if (document.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Remove from user's documents array
    const user = await User.findById(document.userId);
    if (user) {
      user.documents = user.documents.filter(
        docId => docId.toString() !== document._id.toString()
      );
      await user.save();
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


