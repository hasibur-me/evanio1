import Appointment from '../models/Appointment.js';
import Availability from '../models/Availability.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { sendEmail } from '../utils/email.js';

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      service,
      serviceSlug,
      orderId,
      title,
      description,
      startTime,
      endTime,
      duration,
      location,
      attendees
    } = req.body;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: 'Title, start time, and end time are required' });
    }

    // Validate time range
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Check for conflicts
    const conflicts = await Appointment.find({
      $or: [
        {
          startTime: { $lt: end },
          endTime: { $gt: start },
          status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
        }
      ]
    });

    if (conflicts.length > 0) {
      return res.status(400).json({ 
        message: 'Time slot conflicts with existing appointment',
        conflicts: conflicts.map(c => ({
          appointmentNumber: c.appointmentNumber,
          startTime: c.startTime,
          endTime: c.endTime
        }))
      });
    }

    // Build attendees array
    const appointmentAttendees = [
      {
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: 'client',
        status: 'accepted'
      }
    ];

    // Add admin/team members if specified
    if (attendees && Array.isArray(attendees)) {
      for (const attendee of attendees) {
        if (attendee.userId) {
          const user = await User.findById(attendee.userId);
          if (user) {
            appointmentAttendees.push({
              userId: user._id,
              name: user.name,
              email: user.email,
              role: attendee.role || 'team',
              status: 'pending'
            });
          }
        }
      }
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      service: service || 'General Consultation',
      serviceSlug: serviceSlug || '',
      orderId: orderId || null,
      title,
      description: description || '',
      startTime: start,
      endTime: end,
      duration: duration || Math.round((end - start) / 60000), // Convert to minutes
      location: location || { type: 'online' },
      attendees: appointmentAttendees,
      status: 'scheduled',
      reminders: [
        {
          type: 'email',
          scheduledFor: new Date(start.getTime() - 24 * 60 * 60 * 1000), // 24 hours before
          sent: false
        },
        {
          type: 'email',
          scheduledFor: new Date(start.getTime() - 60 * 60 * 1000), // 1 hour before
          sent: false
        }
      ]
    });

    // Send confirmation emails
    for (const attendee of appointmentAttendees) {
      if (attendee.userId.toString() !== req.user._id.toString()) {
        await sendEmail(attendee.email, 'custom', {
          subject: `Appointment Invitation: ${title}`,
          message: `You have been invited to an appointment:\n\nTitle: ${title}\nDate: ${start.toLocaleString()}\nDuration: ${appointment.duration} minutes\n\n${description || ''}`,
          actionUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/appointments`,
          actionText: 'View Appointment'
        });
      }
    }

    await appointment.populate('userId', 'name email');
    await appointment.populate('attendees.userId', 'name email');

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's appointments
export const getMyAppointments = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    let filter = {
      $or: [
        { userId: req.user._id },
        { 'attendees.userId': req.user._id }
      ]
    };

    if (status) {
      filter.status = status;
    }

    if (startDate && endDate) {
      filter.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('userId', 'name email')
      .populate('orderId', 'orderNumber service')
      .populate('attendees.userId', 'name email')
      .populate('notes.author', 'name email')
      .sort({ startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments (admin)
export const getAllAppointments = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, startDate, endDate, userId } = req.query;
    
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (startDate && endDate) {
      filter.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('userId', 'name email')
      .populate('orderId', 'orderNumber service')
      .populate('attendees.userId', 'name email')
      .populate('notes.author', 'name email')
      .sort({ startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single appointment
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('orderId', 'orderNumber service')
      .populate('attendees.userId', 'name email')
      .populate('notes.author', 'name email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access
    const isOwner = appointment.userId._id.toString() === req.user._id.toString();
    const isAttendee = appointment.attendees.some(a => 
      a.userId && a.userId._id.toString() === req.user._id.toString()
    );
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAttendee && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      duration,
      location,
      status
    } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check permissions
    const isOwner = appointment.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check for conflicts if time is being changed
    if (startTime || endTime) {
      const newStart = startTime ? new Date(startTime) : appointment.startTime;
      const newEnd = endTime ? new Date(endTime) : appointment.endTime;

      if (newStart >= newEnd) {
        return res.status(400).json({ message: 'End time must be after start time' });
      }

      const conflicts = await Appointment.find({
        _id: { $ne: appointment._id },
        $or: [
          {
            startTime: { $lt: newEnd },
            endTime: { $gt: newStart },
            status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
          }
        ]
      });

      if (conflicts.length > 0) {
        return res.status(400).json({ 
          message: 'Time slot conflicts with existing appointment',
          conflicts: conflicts.map(c => ({
            appointmentNumber: c.appointmentNumber,
            startTime: c.startTime,
            endTime: c.endTime
          }))
        });
      }
    }

    // Update fields
    if (title) appointment.title = title;
    if (description !== undefined) appointment.description = description;
    if (startTime) appointment.startTime = new Date(startTime);
    if (endTime) appointment.endTime = new Date(endTime);
    if (duration) appointment.duration = duration;
    if (location) appointment.location = { ...appointment.location, ...location };
    if (status) {
      const oldStatus = appointment.status;
      appointment.status = status;

      // Handle cancellation
      if (status === 'cancelled' && oldStatus !== 'cancelled') {
        appointment.cancelledAt = new Date();
      }

      // Handle rescheduling
      if (status === 'rescheduled' && oldStatus !== 'rescheduled') {
        // Create new appointment record for rescheduled time
      }
    }

    await appointment.save();
    await appointment.populate('userId', 'name email');
    await appointment.populate('attendees.userId', 'name email');

    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check permissions
    const isOwner = appointment.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    appointment.status = 'cancelled';
    appointment.cancelledAt = new Date();
    appointment.cancellationReason = reason || '';

    await appointment.save();

    // Notify attendees
    for (const attendee of appointment.attendees) {
      if (attendee.userId && attendee.userId.toString() !== req.user._id.toString()) {
        const user = await User.findById(attendee.userId);
        if (user) {
          await sendEmail(user.email, 'custom', {
            subject: `Appointment Cancelled: ${appointment.title}`,
            message: `The appointment "${appointment.title}" scheduled for ${appointment.startTime.toLocaleString()} has been cancelled.\n\n${reason ? `Reason: ${reason}` : ''}`
          });
        }
      }
    }

    res.json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add note to appointment
export const addAppointmentNote = async (req, res) => {
  try {
    const { content, isInternal } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Note content is required' });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check permissions
    const isOwner = appointment.userId.toString() === req.user._id.toString();
    const isAttendee = appointment.attendees.some(a => 
      a.userId && a.userId.toString() === req.user._id.toString()
    );
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAttendee && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const note = {
      author: req.user._id,
      content: content.trim(),
      isInternal: isInternal && req.user.role === 'admin'
    };

    appointment.notes.push(note);
    await appointment.save();

    await appointment.populate('notes.author', 'name email');

    res.json(appointment);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: error.message });
  }
};

