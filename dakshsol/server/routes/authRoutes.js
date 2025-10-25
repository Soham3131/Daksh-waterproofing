// server/routes/authRoutes.js
import express from 'express';
import { startSignup, verifyOtp, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Public Routes
router.post('/signup-start', startSignup); // Step 1: Collect data and send OTP
router.post('/verify-otp', verifyOtp);     // Step 2: Verify OTP and activate
router.post('/login', loginUser);          // Login with email/password

export default router;
