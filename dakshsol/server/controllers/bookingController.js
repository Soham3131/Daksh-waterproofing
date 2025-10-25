// server/controllers/bookingController.js
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import { sendBookingNotification } from '../utils/emailSender.js';

/**
 * @route POST /api/bookings
 * @desc User: Create a new booking
 * @access Private
 */
const createBooking = asyncHandler(async (req, res) => {
  const { serviceId, preferredTime, address, lat, lng } = req.body;
  const userId = req.user._id;

  if (!serviceId || !preferredTime || !address || !lat || !lng) {
    res.status(400);
    throw new Error('Missing required booking fields (service, time, address, and live location coordinates).');
  }

  // 1. Fetch service and user details
  const service = await Service.findById(serviceId);
  const user = await User.findById(userId);

  if (!service) {
    res.status(404);
    throw new Error('Service not found.');
  }

  // 2. Create booking document
  const booking = new Booking({
    user: userId,
    service: serviceId,
    customerDetails: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: address,
    },
    preferredTime: new Date(preferredTime),
    location: { address, coordinates: { lat, lng } },
    totalAmount: service.price,
    status: 'Pending Payment', // Initial status before Razorpay order is created
    isPaid: false,
  });

  const createdBooking = await booking.save();

  // The frontend will now call the /api/payments/order route with this booking ID
  res.status(201).json({
    _id: createdBooking._id,
    message: 'Booking request created. Proceed to payment.',
    // Sending back the base information needed for the next step
    totalAmount: createdBooking.totalAmount 
  });
});

/**
 * @route GET /api/bookings/my-bookings
 * @desc User: Get all bookings for the authenticated user
 * @access Private
 */
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('service', 'name price') // Get service name and price
    .sort({ preferredTime: -1 });

  res.json(bookings);
});

/**
 * @route PUT /api/bookings/:id/cancel
 * @desc User: Cancel a booking (only if status allows)
 * @access Private
 */
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('service', 'name');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found.');
  }

  // Ensure only the owner can cancel
  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to cancel this booking.');
  }

  // Allow cancellation only if Confirmed, Rescheduled, or Pending
  if (['Confirmed', 'Rescheduled', 'Pending Payment'].includes(booking.status)) {
    
    // NOTE: This is where you would call the Razorpay API to process a refund
    // if booking.isPaid is true. We mock the refund status update for now.
    
    booking.status = 'Cancelled';
    if (booking.isPaid) {
        booking.paymentResult.status = 'Refund Pending'; 
    }
    
    const updatedBooking = await booking.save();
    
    // Send email notification
    await sendBookingNotification(updatedBooking.customerDetails.email, updatedBooking, 'Cancelled');
    
    res.json({ message: 'Booking cancelled successfully. Refund process initiated if applicable.', booking: updatedBooking });
  } else {
    res.status(400);
    throw new Error(`Cannot cancel booking with current status: ${booking.status}`);
  }
});

/* -------------------------------------------------------------------
 * ADMIN Functionality
 * ------------------------------------------------------------------- */

/**
 * @route GET /api/bookings/admin/all
 * @desc Admin: Get all bookings from all users
 * @access Private/Admin
 */
const getAllBookingsAdmin = asyncHandler(async (req, res) => {
  // Sort by preferred time descending
  const bookings = await Booking.find({})
    .populate('user', 'name email phone')
    .populate('service', 'name')
    .sort({ preferredTime: -1 });
    
  res.json(bookings);
});

/**
 * @route PUT /api/bookings/admin/:id/status
 * @desc Admin: Update the status of a booking
 * @access Private/Admin
 */
const updateBookingStatusAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const validStatuses = Booking.schema.path('status').enumValues;
  if (!status || !validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  const booking = await Booking.findById(req.params.id).populate('service', 'name');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found.');
  }

  // Update status
  booking.status = status;

  // Handle specific status updates
  if (status === 'Cancelled and Refunded' && booking.isPaid) {
    booking.paymentResult.status = 'Refunded'; // Final refund status update
  }
  
  const updatedBooking = await booking.save();
  
  // Send email notification
  await sendBookingNotification(updatedBooking.customerDetails.email, updatedBooking, status);
  
  res.json({ message: `Booking status updated to ${status}.`, booking: updatedBooking });
});

/**
 * @route PUT /api/bookings/admin/:id/reschedule
 * @desc Admin: Reschedule a booking and notify the customer
 * @access Private/Admin
 */
const rescheduleBookingAdmin = asyncHandler(async (req, res) => {
  const { newTime } = req.body;

  if (!newTime || isNaN(new Date(newTime).getTime())) {
    res.status(400);
    throw new Error('A valid new preferred time is required for rescheduling.');
  }

  const booking = await Booking.findById(req.params.id).populate('service', 'name');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found.');
  }

  booking.preferredTime = new Date(newTime);
  booking.status = 'Rescheduled'; // Set a clear status indicating admin intervention

  const updatedBooking = await booking.save();
  
  // Send email notification with the new time
  await sendBookingNotification(updatedBooking.customerDetails.email, updatedBooking, 'Rescheduled');

  res.json({ message: `Booking successfully rescheduled to ${new Date(newTime).toLocaleString()}. Customer notified.`, booking: updatedBooking });
});






const getDashboardStatsAdmin = asyncHandler(async (req, res) => {
  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  // Fetch all bookings from last 12 months
  const allBookings = await Booking.find({
    createdAt: { $gte: twelveMonthsAgo },
  }).select('status totalAmount createdAt isPaid');

  // ✅ Only confirmed (paid) bookings for stats
  const confirmedBookings = allBookings.filter(
    (b) => b.isPaid && b.status !== 'Cancelled'
  );

  // --- KPIs ---
  const totalBookings = confirmedBookings.length;
  const totalRevenue = confirmedBookings.reduce(
    (acc, b) => acc + (b.totalAmount || 0),
    0
  );
  const pendingPaymentCount = allBookings.filter(
    (b) => !b.isPaid && b.status !== 'Cancelled'
  ).length;
  const completedBookingsCount = confirmedBookings.filter(
    (b) => b.status === 'Order Completed'
  ).length;

  // --- MONTHLY TREND ---
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyDataMap = new Map();
  for (let i = 0; i < 12; i++) {
    const date = new Date(twelveMonthsAgo.getFullYear(), twelveMonthsAgo.getMonth() + i, 1);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    monthlyDataMap.set(key, { name: month, monthYear: key, bookings: 0, revenue: 0 });
  }

  confirmedBookings.forEach((b) => {
    const date = new Date(b.createdAt);
    const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    if (monthlyDataMap.has(key)) {
      const entry = monthlyDataMap.get(key);
      entry.bookings += 1;
      entry.revenue += b.totalAmount || 0;
    }
  });

  const monthlyTrend = Array.from(monthlyDataMap.values());

  // --- DAILY TREND ---
  const dailyTrend = {};
  for (const monthKey of monthlyDataMap.keys()) {
    dailyTrend[monthKey] = [];
  }

  confirmedBookings.forEach((b) => {
    const date = new Date(b.createdAt);
    const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    if (!dailyTrend[monthKey]) dailyTrend[monthKey] = [];
    const day = date.getDate();
    const existing = dailyTrend[monthKey].find((d) => d.day === day);

    if (existing) {
      existing.bookings += 1;
      existing.revenue += b.totalAmount || 0;
    } else {
      dailyTrend[monthKey].push({
        day,
        bookings: 1,
        revenue: b.totalAmount || 0,
      });
    }
  });

  // Sort daily data chronologically
  Object.keys(dailyTrend).forEach((key) => {
    dailyTrend[key].sort((a, b) => a.day - b.day);
  });

  res.json({
    kpis: {
      totalBookings,
      totalRevenue,
      pendingPaymentCount,
      completedBookings: completedBookingsCount,
    },
    monthlyTrend,
    dailyTrend,
  });
});

export default getDashboardStatsAdmin;

/**
 * @route GET /api/bookings/admin/all
 * @desc Admin: Get all bookings from all users
 * @access Private/Admin
 */



export { 
  createBooking, 
  getDashboardStatsAdmin,
  getMyBookings, 
  cancelBooking, 
  getAllBookingsAdmin, 
  updateBookingStatusAdmin, 
  rescheduleBookingAdmin 
};
