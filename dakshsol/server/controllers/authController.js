
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/emailSender.js';

// Temporary in-memory store for OTPs
let otpStore = {};  // { email: { otp, expiresAt, userData } }

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Step 1: Send OTP without creating user (No changes needed here)
export const startSignup = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore[email] = {
    otp,
    expiresAt,
    userData: { name, email, phone, password },
  };

  await sendOtpEmail(email, otp);

  res.status(200).json({
    success: true,
    message: 'OTP sent to email. Please verify to complete signup.'
  });
});
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) {
    res.status(400);
    throw new Error('No signup process found for this email');
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    res.status(400);
    throw new Error('OTP expired. Please sign up again.');
  }

  if (record.otp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP');
  }

  const { name, phone, password } = record.userData;

  // ✅ Create user WITHOUT manual hashing; schema pre-save will hash automatically
  const user = await User.create({ name, email, phone, password });

  // Clean up OTP store
  delete otpStore[email];

  // Return user data + token
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // This is required because your User model has 'select: false' on password
  const user = await User.findOne({ email }).select('+password'); 

  // Compare the raw entered password with the stored hash
  if (user && (await bcrypt.compare(password, user.password))) {
    
    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        token: generateToken(user._id),
    };

    res.json(userResponse);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});