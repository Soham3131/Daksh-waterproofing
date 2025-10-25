// server/controllers/paymentController.js
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import { createOrder, verifySignature } from '../utils/razorpayClient.js';
import { sendBookingNotification } from '../utils/emailSender.js';

/**
 * @route POST /api/payments/order
 * @desc Create a Razorpay order ID for the frontend payment modal
 * @access Private
 */
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const userId = req.user._id;

  if (!bookingId) {
    res.status(400);
    throw new Error('Booking ID is required to create a payment order.');
  }

  const booking = await Booking.findById(bookingId);

  if (!booking || booking.user.toString() !== userId.toString()) {
    res.status(404);
    throw new Error('Booking not found or not owned by user.');
  }

  if (booking.isPaid) {
    res.status(400);
    throw new Error('This booking has already been paid for.');
  }

  try {
    // 1. Create the order using the utility function
    const order = await createOrder(booking.totalAmount, booking._id.toString());
    
    // 2. Send back the required information for the frontend modal
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // Frontend needs this key
      bookingId: booking._id,
      customerName: booking.customerDetails.name,
      customerEmail: booking.customerDetails.email,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to create Razorpay order.');
  }
});

/**
 * @route POST /api/payments/webhook
 * @desc Handle Razorpay payment success/failure webhooks (NO AUTH)
 * @access Public
 */
const handleRazorpayWebhook = asyncHandler(async (req, res) => {
  // The raw body is attached by the express.raw() middleware in server/index.js
  const rawBody = req.body.toString();
  const signature = req.headers['x-razorpay-signature'];
  
  // 1. Verify signature using the raw body (CRITICAL SECURITY STEP)
  if (!signature || !verifySignature(signature, rawBody)) {
    console.warn('Webhook received with invalid signature. Denying request.');
    return res.status(400).send('Invalid Signature');
  }

  const payload = req.body;
  const event = payload.event;
  
  // 2. Process only confirmed/captured payment events
  if (event === 'payment.captured' || event === 'order.paid') {
    const paymentEntity = payload.payload.payment.entity;
    const orderEntity = payload.payload.order.entity;
    
    const bookingId = orderEntity.receipt; // The receipt is the booking ID
    
    const booking = await Booking.findById(bookingId).populate('service', 'name');

    if (!booking) {
      console.error(`Booking not found for receipt ID: ${bookingId}`);
      return res.status(404).send('Booking Not Found');
    }

    // 3. Update Booking status to Confirmed
    if (!booking.isPaid) {
      booking.isPaid = true;
      booking.status = 'Confirmed';
      booking.paymentResult = {
        id: paymentEntity.id,
        status: 'captured',
        amount: paymentEntity.amount / 100, // Convert back to INR
        currency: paymentEntity.currency,
        updated_at: new Date(),
      };
      await booking.save();
      
      // 4. Send Confirmation Email
      await sendBookingNotification(booking.customerDetails.email, booking, 'Confirmed');
      console.log(`Payment confirmed and booking ${bookingId} updated.`);
    }
  }

  // MUST respond with 200 OK to acknowledge receipt of the webhook event
  res.json({ received: true });
});

export { createRazorpayOrder, handleRazorpayWebhook };
