import express from 'express';
import multer from 'multer';
import { createService, getServices, updateService, deleteService , getServiceDetails } from '../controllers/serviceController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage(); // stores file in memory
const upload = multer({ storage });

// Public route
router.get('/', getServices);
router.get('/:id', getServiceDetails);

// Admin routes
router.post('/', protect, admin, upload.single('image'), createService);
router.put('/:id', protect, admin, upload.single('image'), updateService);
router.delete('/:id', protect, admin, deleteService);

export default router;
