import axios from 'axios';



const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

export default axios.create({
  // Use the dynamically set URL
  baseURL: API_BASE_URL, 
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});


