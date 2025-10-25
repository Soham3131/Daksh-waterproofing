// src/components/layout/Footer.jsx (or Footer.js)

import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info - Core SEO Keywords */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-orange-400">Daksh Waterproofing</h4>
          <p className="text-sm text-gray-400 mb-2">
            **Experts in Waterproofing Solutions** for roof, basement, and bathroom leakage. 
            Serving Delhi NCR with **guaranteed damp proofing services**.
          </p>
          <p className="text-sm">
            <Link to="/about" className="hover:text-orange-400 transition duration-300">Read our story</Link>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition duration-300">Our Services</Link></li>
            <li><Link to="/profile/orders" className="text-gray-400 hover:text-white transition duration-300">My Bookings</Link></li> 
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info / Local SEO */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
          <p className="text-sm text-gray-400 mb-2">
            Phone: <a href="tel:+91XXXXXXXXXX" className="hover:text-white">+91 XXXXX XXXXX</a><br/>
            Email: <a href="mailto:info@dakshwps.com" className="hover:text-white">info@dakshwps.com</a>
          </p>
          <p className="text-sm text-gray-400">
            **Service Area:** Delhi, Noida, Gurgaon, Ghaziabad, Faridabad.
          </p>
        </div>
        
        {/* Slogan / USP */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-400">Our Motto</h4>
          <p className="text-md font-bold italic text-white mb-4">
            Ideas, Innovations, Satisfaction
          </p>
          <p className="text-sm text-gray-400">
            Your partner for reliable and permanent leakage solutions.
          </p>
        </div>
      </div>
      {/* NO EXTRA > HERE */}

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Daksh Waterproofing Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;