import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evanio-ltd');
    console.log('MongoDB connected');

    // Admin credentials - NEW ADMIN
    const adminData = {
      name: 'Admin User',
      email: 'admin@evanio.com',
      password: 'Admin@2024!', // Strong default password - change after first login
      role: 'admin'
    };

    // Check if user with this email exists
    const existingUser = await User.findOne({ email: adminData.email });
    if (existingUser) {
      // Update to admin
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ User updated to admin:', existingUser.email);
      console.log('Email:', existingUser.email);
      console.log('Password: (your existing password for this email)');
      console.log('\n⚠️  IMPORTANT: If you forgot your password, reset it via MongoDB or create a new admin.');
    } else {
      // Create new admin
      const admin = await User.create(adminData);
      console.log('✅ Admin user created successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', admin.email);
      console.log('🔑 Password:', adminData.password);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n⚠️  IMPORTANT: Change the admin password after first login!');
      console.log('\n📍 Login at: http://localhost:5173/login');
      console.log('📍 Admin Dashboard: http://localhost:5173/admin');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
