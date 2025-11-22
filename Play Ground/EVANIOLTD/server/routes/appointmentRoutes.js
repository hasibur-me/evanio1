import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  addAppointmentNote
} from '../controllers/appointmentController.js';
import {
  getAvailability,
  setAvailability,
  deleteAvailability,
  getAvailableTimeSlots,
  setWeeklyAvailability
} from '../controllers/availabilityController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Appointment routes
router.post('/', protect, createAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.get('/all', protect, admin, getAllAppointments);
router.get('/:id', protect, getAppointment);
router.patch('/:id', protect, updateAppointment);
router.post('/:id/cancel', protect, cancelAppointment);
router.post('/:id/notes', protect, addAppointmentNote);

// Availability routes
router.get('/availability/:userId?', protect, getAvailability);
router.post('/availability/:userId?', protect, setAvailability);
router.delete('/availability/:id', protect, deleteAvailability);
router.get('/availability/slots/available', protect, getAvailableTimeSlots);
router.post('/availability/weekly/:userId?', protect, setWeeklyAvailability);

export default router;


