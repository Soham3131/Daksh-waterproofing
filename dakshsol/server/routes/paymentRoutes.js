import express from "express";
import {
  createOrder,
  verifyPayment,
  handleRazorpayWebhook,
} from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Razorpay order (used by frontend)
router.post("/order", protect, createOrder);

// Verify Razorpay payment (called after successful payment)
router.post("/verify-payment", protect, verifyPayment);

// Optional webhook (used by Razorpay server → for Render/Vercel)
router.post("/webhook", express.raw({ type: "*/*" }), handleRazorpayWebhook);

export default router;
