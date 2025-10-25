import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      // FIX: Ensure token is correctly set on axios default headers for subsequent authenticated requests
      // This part wasn't visible, but it's crucial for the token to be used.
      if (userInfo.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  // Step 1: Start Signup (send OTP)
  const startSignup = async (name, email, phone, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/auth/signup-start', { name, email, phone, password });
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/auth/verify-otp', { email, otp });
      
      // ✅ CORE FIX: Backend currently returns a flat object with user details and token (after backend fix below).
      // We set the entire response data as userInfo.
      setUserInfo(data); // data is now { _id, name, email, phone, role, createdAt, token }
      
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'OTP verification failed';
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      setUserInfo(data);
      setLoading(false);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      setLoading(false);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setUserInfo(null);
  };
  
  // Helper for isAdmin, assuming you have a 'role' field
  const isAdmin = userInfo?.role === 'admin';

  return (
    <AuthContext.Provider value={{ userInfo, loading, error, startSignup, verifyOtp, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);