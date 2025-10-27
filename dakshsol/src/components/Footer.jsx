import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand + Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Daksh Waterproofing Logo" className="w-12 h-12" />
            <h4 className="text-2xl font-bold text-orange-400">Daksh Waterproofing</h4>
          </div>
          <p className="text-sm leading-relaxed">
            <strong>Experts in Waterproofing Solutions</strong> for roof, basement, and bathroom leakage. 
            Serving Delhi NCR with <strong>guaranteed damp-proofing services</strong> and 24/7 support.
          </p>
          <p className="mt-3">
            <Link
              to="/about"
              className="text-orange-400 hover:text-white transition duration-300"
            >
              Read our story →
            </Link>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-orange-400 transition">
                Our Services
              </Link>
            </li>
            {/* <li>
              <Link to="/profile" className="hover:text-orange-400 transition">
                My Bookings
              </Link>
            </li> */}
            <li>
              <Link to="/contact" className="hover:text-orange-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>

          <p className="text-sm mb-3">
            <strong>Head Office:</strong><br />
            Shop No.4, 1st Floor Gangania Complex,<br />
            Opp. Metro Piller No.61, MG Road Sikanderpur,<br />
            Gurugram, Haryana – 122002
          </p>

          <p className="text-sm mb-3">
            <strong>Branch Office:</strong><br />
            541 Ground Floor, Shakti Khand-4,<br />
            Indirapuram, Ghaziabad, U.P.
          </p>

          <p className="text-sm mb-3">
            <strong>Mobile:</strong>{" "}
            <a href="tel:+919910235720" className="hover:text-orange-400">
              +91-9910235720
            </a>
            ,{" "}
            <a href="tel:+919650687711" className="hover:text-orange-400">
              9650687711
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:01244117356" className="hover:text-orange-400">
              0124-4117356
            </a>
          </p>

          <p className="text-sm">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:daksh.incon@gmail.com"
              className="hover:text-orange-400"
            >
              daksh.incon@gmail.com
            </a>
          </p>
        </div>

        {/* Motto / USP */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-400">Our Motto</h4>
          <p className="text-md font-bold italic text-white mb-3">
            Ideas, Innovations, Satisfaction
          </p>
          <p className="text-sm">
            Your trusted partner for reliable and permanent leakage solutions.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-orange-400 font-medium">
            Daksh Waterproofing Solutions
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
