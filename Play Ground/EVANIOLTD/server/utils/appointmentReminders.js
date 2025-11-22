// Appointment Reminder System
// This should be run as a scheduled job (cron) to send reminders

import Appointment from '../models/Appointment.js';
import { sendEmail } from './email.js';

// Send appointment reminders
export const sendAppointmentReminders = async () => {
  try {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find appointments that need reminders
    const appointments = await Appointment.find({
      status: { $in: ['scheduled', 'confirmed'] },
      startTime: { $gte: now, $lte: twentyFourHoursFromNow },
      $or: [
        {
          'reminders.scheduledFor': { $lte: now },
          'reminders.sent': false
        }
      ]
    })
      .populate('userId', 'name email')
      .populate('attendees.userId', 'name email');

    const sentReminders = [];

    for (const appointment of appointments) {
      // Check which reminders need to be sent
      for (const reminder of appointment.reminders) {
        if (!reminder.sent && new Date(reminder.scheduledFor) <= now) {
          // Send reminder to all attendees
          for (const attendee of appointment.attendees) {
            if (attendee.userId && attendee.status !== 'declined') {
              const user = attendee.userId;
              
              try {
                const timeUntil = Math.round(
                  (new Date(appointment.startTime) - now) / (60 * 60 * 1000)
                );
                
                let reminderMessage = `Reminder: You have an upcoming appointment.\n\n`;
                reminderMessage += `Title: ${appointment.title}\n`;
                reminderMessage += `Date & Time: ${new Date(appointment.startTime).toLocaleString()}\n`;
                reminderMessage += `Duration: ${appointment.duration} minutes\n`;
                
                if (timeUntil < 2) {
                  reminderMessage += `\nThis appointment is in ${timeUntil} hour(s).\n`;
                } else {
                  reminderMessage += `\nThis appointment is in ${Math.round(timeUntil / 24)} day(s).\n`;
                }
                
                if (appointment.description) {
                  reminderMessage += `\nDescription: ${appointment.description}\n`;
                }
                
                if (appointment.location.type === 'online' && appointment.location.meetingLink) {
                  reminderMessage += `\nMeeting Link: ${appointment.location.meetingLink}\n`;
                } else if (appointment.location.type === 'phone' && appointment.location.phoneNumber) {
                  reminderMessage += `\nPhone: ${appointment.location.phoneNumber}\n`;
                } else if (appointment.location.type === 'in-person' && appointment.location.address) {
                  reminderMessage += `\nAddress: ${appointment.location.address}\n`;
                }

                await sendEmail(user.email, 'custom', {
                  subject: `Appointment Reminder: ${appointment.title}`,
                  message: reminderMessage,
                  actionUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/appointments`,
                  actionText: 'View Appointment'
                });

                reminder.sent = true;
                reminder.sentAt = new Date();
                sentReminders.push({
                  appointmentId: appointment._id,
                  appointmentNumber: appointment.appointmentNumber,
                  userId: user._id,
                  email: user.email
                });
              } catch (error) {
                console.error(`Error sending reminder to ${user.email}:`, error);
              }
            }
          }
        }
      }

      // Mark reminders as modified
      appointment.markModified('reminders');
      await appointment.save();
    }

    return {
      success: true,
      remindersSent: sentReminders.length,
      details: sentReminders
    };
  } catch (error) {
    console.error('Error sending appointment reminders:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Schedule reminder job (to be called by cron or scheduler)
export const scheduleReminderJob = () => {
  // This should be set up as a cron job that runs every hour
  // Example cron: '0 * * * *' (every hour)
  setInterval(async () => {
    console.log('Running appointment reminder job...');
    const result = await sendAppointmentReminders();
    console.log('Reminder job completed:', result);
  }, 60 * 60 * 1000); // Run every hour
};

export default { sendAppointmentReminders, scheduleReminderJob };

