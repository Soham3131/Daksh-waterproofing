import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if your backend is on different port
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
