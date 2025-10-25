import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get redirect path from URL query parameter (e.g., from ProtectedRoute)
  const redirect = new URLSearchParams(location.search).get('redirect') || '/profile';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userInfo = await login(email, password);
      // Redirect based on user role or requested path
      if (userInfo.isAdmin) {
        navigate('/admin');
      } else {
        navigate(redirect, { replace: true });
      }
    } catch (err) {
      // Error handled by AuthContext but we update local state for display
      setError(err.message || 'Login failed. Check credentials.'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <div className="max-w-md mx-auto bg-white p-8 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Welcome Back to Daksh WPS
        </h1>
        {loading && <Loader />}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email Address" 
            required 
            className="w-full p-3 border rounded-lg" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className="w-full p-3 border rounded-lg" 
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link>
        </p>
        <p className="text-center mt-2 text-sm">
          <Link to="#" className="text-gray-500 hover:underline">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;