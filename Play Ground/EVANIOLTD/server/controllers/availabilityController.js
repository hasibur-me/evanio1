import Availability from '../models/Availability.js';
import Appointment from '../models/Appointment.js';

// Get availability for a user
export const getAvailability = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    
    // Only allow users to view their own availability or admins to view any
    if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const availability = await Availability.find({ userId }).sort({ dayOfWeek: 1, startTime: 1 });

    res.json(availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: error.message });
  }
};

// Set availability
export const setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, isAvailable, serviceSlug } = req.body;
    const userId = req.params.userId || req.user._id;

    // Only allow users to set their own availability or admins to set any
    if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!dayOfWeek || dayOfWeek < 0 || dayOfWeek > 6) {
      return res.status(400).json({ message: 'Invalid day of week (0-6)' });
    }

    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Start time and end time are required' });
    }

    // Validate time format
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({ message: 'Invalid time format. Use HH:MM (24-hour format)' });
    }

    // Validate time range
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (startMinutes >= endMinutes) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Check for overlapping availability
    const existing = await Availability.find({
      userId,
      dayOfWeek,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (existing.length > 0) {
      return res.status(400).json({ 
        message: 'Time slot overlaps with existing availability',
        conflicts: existing
      });
    }

    const availability = await Availability.findOneAndUpdate(
      { userId, dayOfWeek, startTime, endTime },
      {
        userId,
        dayOfWeek,
        startTime,
        endTime,
        isAvailable: isAvailable !== false,
        serviceSlug: serviceSlug || null
      },
      { upsert: true, new: true }
    );

    res.json(availability);
  } catch (error) {
    console.error('Error setting availability:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete availability slot
export const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const availability = await Availability.findById(id);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    // Check permissions
    if (availability.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Availability.findByIdAndDelete(id);

    res.json({ message: 'Availability deleted successfully' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get available time slots
export const getAvailableTimeSlots = async (req, res) => {
  try {
    const { date, userId, serviceSlug, duration = 60 } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    const targetUserId = userId || req.user._id;

    // Get availability for that day
    const availability = await Availability.find({
      userId: targetUserId,
      dayOfWeek,
      isAvailable: true,
      $or: [
        { serviceSlug: serviceSlug || null },
        { serviceSlug: null } // General availability
      ]
    }).sort({ startTime: 1 });

    if (availability.length === 0) {
      return res.json({ 
        date,
        availableSlots: [],
        message: 'No availability for this date'
      });
    }

    // Get existing appointments for that day
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      userId: targetUserId,
      startTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
    }).sort({ startTime: 1 });

    // Generate available time slots
    const availableSlots = [];
    const durationMinutes = parseInt(duration);

    availability.forEach(avail => {
      const [startHour, startMin] = avail.startTime.split(':').map(Number);
      const [endHour, endMin] = avail.endTime.split(':').map(Number);

      let currentTime = new Date(targetDate);
      currentTime.setHours(startHour, startMin, 0, 0);

      const endTime = new Date(targetDate);
      endTime.setHours(endHour, endMin, 0, 0);

      while (currentTime.getTime() + durationMinutes * 60 * 1000 <= endTime.getTime()) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(currentTime.getTime() + durationMinutes * 60 * 1000);

        // Check if this slot conflicts with existing appointments
        const hasConflict = appointments.some(apt => {
          const aptStart = new Date(apt.startTime);
          const aptEnd = new Date(apt.endTime);
          return (slotStart < aptEnd && slotEnd > aptStart);
        });

        if (!hasConflict) {
          availableSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            startTime: slotStart.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            }),
            endTime: slotEnd.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          });
        }

        // Move to next slot (default: 30-minute intervals)
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    });

    res.json({
      date,
      availableSlots,
      totalSlots: availableSlots.length
    });
  } catch (error) {
    console.error('Error getting available time slots:', error);
    res.status(500).json({ message: error.message });
  }
};

// Bulk set availability (for weekly schedule)
export const setWeeklyAvailability = async (req, res) => {
  try {
    const { schedule } = req.body; // Array of { dayOfWeek, startTime, endTime, isAvailable, serviceSlug }
    const userId = req.params.userId || req.user._id;

    // Only allow users to set their own availability or admins to set any
    if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!Array.isArray(schedule)) {
      return res.status(400).json({ message: 'Schedule must be an array' });
    }

    // Delete existing availability for this user
    await Availability.deleteMany({ userId });

    // Create new availability slots
    const created = [];
    for (const slot of schedule) {
      if (slot.isAvailable !== false) {
        try {
          const availability = await Availability.create({
            userId,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: true,
            serviceSlug: slot.serviceSlug || null
          });
          created.push(availability);
        } catch (error) {
          // Skip duplicates
          if (error.code !== 11000) {
            throw error;
          }
        }
      }
    }

    res.json({
      message: 'Weekly availability set successfully',
      availability: created
    });
  } catch (error) {
    console.error('Error setting weekly availability:', error);
    res.status(500).json({ message: error.message });
  }
};

