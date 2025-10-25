
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors';

dotenv.config();

// The import assumes this file now exists and exports the functions
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'; 

// Load environment variables from .env file


// Connect to database
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000' , 'https://daksh-waterproofing.vercel.app/'],
  credentials: true,
}));



app.use("/api/payments/webhook", express.raw({ type: "*/*" }));

// Body parser middleware for ALL OTHER ROUTES (must come AFTER webhook routes)
app.use(express.json()); // Allows us to accept JSON data in the body
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Daksh Waterproofing API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes); // This will handle Razorpay orders and webhooks

// --- Custom Error Middleware (MUST be placed after routes) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
