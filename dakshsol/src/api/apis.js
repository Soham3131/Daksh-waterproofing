

import axios from './axiosInstance';
import axiosInstance from './axiosInstance';

// --- Auth APIs (No change needed) ---
export const authApis = {
  // Step 1: Collect data and send OTP
  startSignup: (formData) => axios.post('/auth/signup-start', formData), 
  // Step 2: Verify OTP and complete signup
  verifyOtp: (email, otp) => axios.post('/auth/verify-otp', { email, otp }), 
  login: (email, password) => axios.post('/auth/login', { email, password }),
};

// --- Services APIs (FIX APPLIED HERE) ---
export const serviceApis = {
  getAllServices: () => axios.get('/services'),
  getServiceDetails: (id) => axios.get(`/services/${id}`),
  
  // Admin only:
  createService: (serviceData) => 
    axios.post('/services', serviceData, {
        headers: {
            // CRUCIAL FIX: Setting Content-Type to undefined/null 
            // allows the browser to automatically set the correct 
            // 'multipart/form-data' header and boundary for file uploads.
            'Content-Type': undefined, 
        },
    }),
    
  updateService: (id, serviceData) => 
    axios.put(`/services/${id}`, serviceData, {
        headers: {
            // Apply the same fix for the update endpoint
            'Content-Type': undefined,
        },
    }),
    
  deleteService: (id) => axios.delete(`/services/${id}`),
};

// --- Booking APIs (No change needed) ---
export const bookingApis = {
  createBooking: (bookingData) => axios.post('/bookings', bookingData),
  getMyBookings: () => axios.get('/bookings/my-bookings'),
  cancelBooking: (id) => axios.put(`/bookings/${id}/cancel`),
  // Admin only:
  getAllBookingsAdmin: () => axios.get('/bookings/admin/all'),
  updateBookingStatusAdmin: (id, status) => axios.put(`/bookings/admin/${id}/status`, { status }),
  rescheduleBookingAdmin: (id, newTime) => 
  axios.put(`/bookings/admin/${id}/reschedule`, { newTime }),

 getDashboardStatsAdmin: () => axios.get('/bookings/admin/dashboard-stats'),
};

// --- Payment APIs (No change needed) ---
export const paymentApis = {

  createOrder: (bookingId) => axiosInstance.post('/payments/order', bookingId),

  verifyPayment: (payload) => axiosInstance.post('/payments/verify-payment', payload),
};
