import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';
import uploadImage from '../utils/cloudinaryUploader.js';

/**
 * @desc Create a new service
 * @route POST /api/services
 * @access Admin
 */
const createService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    res.status(400);
    throw new Error('Please provide name, description, and price for the service.');
  }

  let imageUrl = req.body.imageUrl || null;

  // If file uploaded, send buffer to Cloudinary
  if (req.file) {
    const uploadResult = await uploadImage(req.file.buffer, 'daksh-services');
    imageUrl = uploadResult.secure_url;
  }

  if (!imageUrl) {
    res.status(400);
    throw new Error('Image URL is required, please upload an image or provide a valid URL.');
  }

  const service = new Service({ name, description, price, imageUrl });
  const createdService = await service.save();
  res.status(201).json(createdService);
});

/**
 * @desc Update an existing service
 * @route PUT /api/services/:id
 * @access Admin
 */
const updateService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  service.name = name || service.name;
  service.description = description || service.description;
  service.price = price !== undefined ? price : service.price;

  if (req.file) {
    const uploadResult = await uploadImage(req.file.buffer, 'daksh-services');
    service.imageUrl = uploadResult.secure_url;
  }

  const updatedService = await service.save();
  res.json(updatedService);
});

/**
 * @desc Get all services
 */
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true }).select('-__v');
  res.json(services);
});

/**
 * @desc Soft delete service
 */
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  service.isActive = false;
  await service.save();
  res.json({ message: 'Service removed (soft deleted)' });
});

const getServiceDetails = asyncHandler(async (req, res) => {
    // Finds the service by the ID provided in the URL parameter
    const service = await Service.findById(req.params.id).select('-__v'); 

    if (service && service.isActive) {
        // IMPORTANT: Your ServiceDetails client component uses service.basePrice.
        // The Mongoose model uses 'price'. We rename it here for client compatibility.
        res.json({ ...service.toObject(), basePrice: service.price });
    } else {
        res.status(404);
        // This is the message caught by the client that displays "Service not found."
        throw new Error('Service not found or is inactive'); 
    }
})

export { createService, updateService, getServices,getServiceDetails, deleteService };
