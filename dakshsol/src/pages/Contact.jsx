import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !query) {
      alert("Please fill in all fields!");
      return;
    }

    const message = `Hello, my name is ${name}. I have a query: ${query}`;
    const whatsappNumber = "919910235720"; // 91 + mobile number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // Open WhatsApp in new tab
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">
        Contact Us
      </h1>

      {/* Contact Info */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-12 text-center">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <FaMapMarkerAlt className="text-4xl text-blue-500 mb-4" />
          <h3 className="font-bold mb-2">Address</h3>
          <p>Head office: Shop No.4, 1st Floor Gangania Complex, Opp. Metro Piller No.61, MG Road Sikanderpur Gurugram H.R. – 122002</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <FaEnvelope className="text-4xl text-blue-500 mb-4" />
          <h3 className="font-bold mb-2">Email</h3>
          <p>daksh.incon@gmail.com</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <FaPhone className="text-4xl text-blue-500 mb-4" />
          <h3 className="font-bold mb-2">Phone</h3>
          <p>+91 9910235720 | 9650687711</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">
          Send Your Query
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Your Query"
            className="border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-all duration-300"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
