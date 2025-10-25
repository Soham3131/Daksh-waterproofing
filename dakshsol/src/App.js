import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
 import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

import AdminDashboard from './pages/AdminDashboard';
import ManageServices from './pages/ManageServices';
import ManageBookings from './pages/ManageBookings';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';



function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-20 min-h-[80vh]">
 {/* Ensure content pushes footer down */}
        <Routes>
          {/* Public Routes - Accessible to all */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected User Routes - Requires Login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/book/:serviceId" element={<BookingForm />} />
          </Route>
          
          {/* Protected Admin Routes - Requires Admin Role */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="bookings" element={<ManageBookings />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;