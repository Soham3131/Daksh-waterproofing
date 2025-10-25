// server/routes/bookingRoutes.js
import express from 'express';
import { 
  createBooking, 
  getMyBookings, 
  cancelBooking, 
  getAllBookingsAdmin, 
  updateBookingStatusAdmin, 
  rescheduleBookingAdmin ,
  getDashboardStatsAdmin
} from '../controllers/bookingController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public (Protected) Routes for Users
router.route('/')
    .post(protect, createBooking); // Create a new booking
router.get('/my-bookings', protect, getMyBookings); // Get user's orders
router.put('/:id/cancel', protect, cancelBooking); // User cancels an order

// Admin Routes (Protected by auth and admin middleware)
router.get('/admin/all', protect, admin, getAllBookingsAdmin);
router.put('/admin/:id/status', protect, admin, updateBookingStatusAdmin);
router.put('/admin/:id/reschedule', protect, admin, rescheduleBookingAdmin);

router.get('/admin/dashboard-stats', protect, admin, getDashboardStatsAdmin);
export default router;
