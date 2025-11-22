import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('documents')
      .populate('tickets')
      .populate('payments')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('documents')
      .populate('tickets')
      .populate('payments');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role && req.user.role === 'admin') user.role = role;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, username, phoneNumber, address, city, state, zipCode, country, facebookLink, whatsapp, instagram, linkedin } = req.body;
    let profilePicture = req.body.profilePicture;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle file upload if file is present (using multer)
    if (req.file) {
      // In production, upload to cloud storage (AWS S3, UploadThing, etc.)
      // For now, we'll store the file path or URL
      // You can integrate with UploadThing or similar service here
      profilePicture = req.file.path || req.file.location || `/uploads/profile/${req.file.filename}`;
    } else if (req.body.profilePictureBase64) {
      // Handle base64 image data if sent
      profilePicture = req.body.profilePictureBase64;
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (username !== undefined) user.username = username;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (zipCode !== undefined) user.zipCode = zipCode;
    if (country !== undefined) user.country = country;
    if (facebookLink !== undefined) user.facebookLink = facebookLink;
    if (whatsapp !== undefined) user.whatsapp = whatsapp;
    if (instagram !== undefined) user.instagram = instagram;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      country: user.country,
      facebookLink: user.facebookLink,
      whatsapp: user.whatsapp,
      instagram: user.instagram,
      linkedin: user.linkedin,
      role: user.role,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: error.message || 'Failed to update profile' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide both current and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const user = await User.findById(req.user._id);
    
    const notification = user.notifications.id(notificationId);
    if (notification) {
      notification.read = true;
      await user.save();
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllNotificationsRead = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.notifications || user.notifications.length === 0) {
      return res.json({ message: 'No notifications to mark as read', markedCount: 0 });
    }

    // Clean up notifications without messages first
    let hasChanges = false;
    user.notifications.forEach(notification => {
      if (!notification.message || notification.message.trim() === '') {
        notification.message = 'Notification';
        hasChanges = true;
      }
    });

    // Mark all unread notifications as read
    let markedCount = 0;
    user.notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true;
        markedCount++;
        hasChanges = true;
      }
    });
    
    // Mark notifications array as modified to ensure Mongoose detects the change
    if (hasChanges) {
      user.markModified('notifications');
      await user.save();
    }

    res.json({ 
      message: 'All notifications marked as read',
      markedCount 
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: error.message || 'Failed to mark all notifications as read' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const user = await User.findById(req.user._id);
    
    user.notifications.pull(notificationId);
    await user.save();

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllReadNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clean up notifications without messages first
    const initialCount = user.notifications?.length || 0;
    const cleanedNotifications = (user.notifications || []).map(n => {
      if (!n.message || n.message.trim() === '') {
        return { ...n, message: 'Notification' };
      }
      return n;
    });

    // Filter out read notifications
    user.notifications = cleanedNotifications.filter(n => !n.read || n.read === false);
    
    // Mark notifications array as modified to ensure Mongoose detects the change
    user.markModified('notifications');
    
    await user.save();

    const deletedCount = initialCount - (user.notifications?.length || 0);
    
    res.json({ 
      message: 'All read notifications deleted successfully',
      deletedCount,
      remainingCount: user.notifications?.length || 0
    });
  } catch (error) {
    console.error('Error deleting all read notifications:', error);
    res.status(500).json({ message: error.message || 'Failed to delete read notifications' });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('notifications');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clean up notifications without messages (migration for old data)
    let needsSave = false;
    if (user.notifications && Array.isArray(user.notifications)) {
      user.notifications.forEach((notification, index) => {
        if (!notification.message || notification.message.trim() === '') {
          notification.message = 'Notification';
          needsSave = true;
        }
      });
      
      if (needsSave) {
        user.markModified('notifications');
        await user.save();
      }
    }

    // Convert to array and sort notifications by date (most recent first)
    let notifications = [];
    
    if (user.notifications && Array.isArray(user.notifications)) {
      notifications = [...user.notifications].map(n => ({
        ...n.toObject ? n.toObject() : n,
        message: n.message || 'Notification' // Ensure message exists
      })).sort((a, b) => {
        const dateA = new Date(a.createdAt || a.timestamp || 0);
        const dateB = new Date(b.createdAt || b.timestamp || 0);
        return dateB - dateA;
      });
    }

    console.log('Sending notifications:', notifications.length);
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch notifications' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const Ticket = (await import('../models/Ticket.js')).default;
    const Payment = (await import('../models/Payment.js')).default;
    
    const totalUsers = await User.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const pendingTickets = await Ticket.countDocuments({ status: 'open' });
    const activeOrders = await Ticket.countDocuments({ type: 'order', status: 'open' });
    const totalPayments = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalTickets,
      pendingTickets,
      activeOrders,
      totalRevenue: totalPayments[0]?.total || 0,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


