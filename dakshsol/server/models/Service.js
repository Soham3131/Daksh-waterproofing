// server/models/Service.js
import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: { // Base price for the service
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: { // URL from Cloudinary
    type: String,
    required: true,
  },
  isActive: { // For soft deletion or temporary unlisting
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Add index on name for faster search and SEO
serviceSchema.index({ name: 'text' });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
