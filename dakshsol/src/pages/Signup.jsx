

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const { startSignup, verifyOtp } = useAuth();

  const [step, setStep] = useState(1); // Step 1: Info, Step 2: OTP Verification
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Step 1: Start Signup (send OTP)
  const handleStartSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await startSignup(formData.name, formData.email, formData.phone, formData.password);
      setSuccessMessage('OTP has been sent to your registered email.');
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await verifyOtp(formData.email, formData.otp);
      setSuccessMessage('Verification successful! Redirecting to your profile...');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Invalid OTP, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <div className="max-w-md mx-auto bg-white p-8 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          {step === 1 ? 'Create Your Account' : 'Verify Your Email'}
        </h1>

        {loading && <Loader />}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">{error}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">{successMessage}</div>}

        {/* Step 1 Form */}
        {step === 1 && (
          <form onSubmit={handleStartSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Sign Up & Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-center text-gray-600">
              Enter the 6-digit code sent to <strong>{formData.email}</strong>
            </p>

            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-Digit OTP"
              required
              maxLength="6"
              className="w-full p-3 border rounded-lg text-center text-xl tracking-widest"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Complete Signup'}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-blue-600 mt-2"
            >
              Go Back
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
