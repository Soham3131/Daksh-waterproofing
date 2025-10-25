// server/models/Booking.js (FIXED)
import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  user: { // Reference to the Customer who made the booking
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: { // Reference to the Service booked
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  customerDetails: { // Redundant copy of critical details at time of booking
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  preferredTime: { // The date and time requested/rescheduled
    type: Date,
    required: true,
  },
  location: {
    address: { // The written address
        type: String,
        required: true,
    },
    coordinates: { // Live or Pin-adjusted location (latitude, longitude)
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  status: {
    type: String,
    enum: ['Pending Payment', 'Confirmed', 'Rescheduled', 'Cancelled', 'Cancelled and Refunded', 'Order Completed'],
    default: 'Pending Payment',
  },
    
    // ⭐ FIX: Add the field to store the Razorpay Order ID
    razorpayOrderId: { 
        type: String, 
        required: false // Not required initially
    }, 

  paymentResult: { // Details from Razorpay success
    id: String,
    status: String,
    amount: Number,
    currency: String,
    updated_at: Date,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  totalAmount: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;