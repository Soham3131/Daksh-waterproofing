

import React, { useState, useEffect } from 'react';
import { serviceApis } from '../api/apis';
import Loader from '../components/Loader';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await serviceApis.getAllServices();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await serviceApis.deleteService(id);
      setServices(services.filter(s => s._id !== id));
      alert('Service deleted successfully.');
    } catch (err) {
      setError('Failed to delete service.');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const ServiceForm = ({ initialData, onClose }) => {
    // Note: When editing, we don't include imageFile in initialData state to force re-upload if needed
    const [formData, setFormData] = useState(
      initialData 
        ? { name: initialData.name, description: initialData.description, price: initialData.price, imageFile: null }
        : { name: '', description: '', price: 0, imageFile: null }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const isCreating = !initialData?._id;

      // --- FIX IMPLEMENTATION START ---
      // Check if an image is required and missing (only for creating new service)
      if (isCreating && !formData.imageFile) {
        alert('Error saving service: Image file is required for a new service.');
        setIsSubmitting(false);
        return;
      }
      // --- FIX IMPLEMENTATION END ---
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', Number(formData.price));
      
      // Append image only if a file was selected/uploaded
      if (formData.imageFile) {
        data.append('image', formData.imageFile); // multer expects 'image'
      }

      try {
        if (isCreating) {
          await serviceApis.createService(data);
        } else {
          // For update, the server handles missing image (it keeps the old one)
          await serviceApis.updateService(initialData._id, data);
        }
        alert('Service saved successfully!');
        fetchServices();
        onClose();
      } catch (err) {
        // The error you were getting is caught here
        alert('Error saving service: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">
            {initialData ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            <textarea
              placeholder="Description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            <input
              type="number"
              placeholder="Price (INR)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              min="0"
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            <label className="block text-sm font-medium text-gray-700">
                {initialData ? 'Change Image (Optional for edit)' : 'Upload Image *'}
            </label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
              // Conditional required attribute for browser validation on new services
              {...(!initialData && { required: true })} 
              className="w-full p-2 border rounded"
              disabled={isSubmitting}
            />
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? (initialData ? 'Updating...' : 'Adding...') : 'Save Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
        <button
          onClick={() => { setEditingService(null); setShowForm(true); }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add New Service
        </button>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (₹)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={service.imageUrl || 'https://via.placeholder.com/50x50'}
                    alt={service.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(service)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <ServiceForm initialData={editingService} onClose={() => { setShowForm(false); setEditingService(null); }} />}
    </div>
  );
};

export default ManageServices;
