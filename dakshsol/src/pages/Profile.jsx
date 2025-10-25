

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingApis } from '../api/apis';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'bookings'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Always declare hooks before any return statement
  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await bookingApis.getMyBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch your booking history.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending Payment': return 'bg-yellow-100 text-yellow-800';
      case 'Rescheduled': return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
      case 'Cancelled and Refunded': return 'bg-red-100 text-red-800';
      case 'Order Completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingApis.cancelBooking(bookingId);
      setBookings(bookings.map(b =>
        b._id === bookingId ? { ...b, status: 'Cancelled' } : b
      ));
      alert('Booking cancelled successfully.');
    } catch (err) {
      setError('Cancellation failed. Contact support.');
    }
  };

  const BookingItem = ({ booking }) => (
    <div className="border p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-blue-700">
            {booking.service?.name || 'Service Details Missing'}
          </h3>
          <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
        </div>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="mt-3 text-gray-700">
        <p><strong>Scheduled:</strong> {new Date(booking.preferredTime).toLocaleString()}</p>
        <p><strong>Location:</strong> {booking.location?.address || 'Not Provided'}</p>
        <p><strong>Amount Paid:</strong> ₹{booking.totalAmount?.toLocaleString() || 0}</p>
      </div>

      {/* <div className="mt-4 flex space-x-3">
        {(booking.status === 'Confirmed' || booking.status === 'Pending Payment') && (
          <button
            onClick={() => handleCancel(booking._id)}
            className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            Cancel Booking
          </button>
        )}
      </div> */}
    </div>
  );

  // ✅ Now conditionally render, AFTER hooks
  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8">
        Hello, {userInfo?.name ? userInfo.name.split(' ')[0] : 'Guest'}!
      </h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-6 text-lg font-medium ${
            activeTab === 'profile'
              ? 'border-b-4 border-orange-500 text-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`py-2 px-6 text-lg font-medium ${
            activeTab === 'bookings'
              ? 'border-b-4 border-orange-500 text-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Bookings
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl bg-white p-6 rounded-xl shadow-lg">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
            <p><strong>Name:</strong> {userInfo?.name || 'Not Provided'}</p>
            <p><strong>Email:</strong> {userInfo?.email || 'Not Provided'}</p>
            <p><strong>Phone:</strong> {userInfo?.phone || 'Not Provided'}</p>
            <p><strong>Account Created:</strong> {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Booking History ({bookings.length})</h2>
            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              bookings.length > 0 ? (
                bookings.map(booking => <BookingItem key={booking._id} booking={booking} />)
              ) : (
                <p className="text-gray-500">
                  You have no past or current bookings.{' '}
                  <Link to="/services" className="text-blue-600 hover:underline">
                    Book a service now!
                  </Link>
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
