import axios from 'axios';

// Get the backend URL from the environment variable.
// We use a fallback (e.g., 'http://localhost:5000/api') for development when the variable might not be set.

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

export default axios.create({
  // Use the dynamically set URL
  baseURL: API_BASE_URL, 
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});