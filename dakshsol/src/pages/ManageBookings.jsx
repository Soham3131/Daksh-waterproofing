// import React, { useState, useEffect } from 'react';
// import { bookingApis } from '../api/apis';
// import Loader from '../components/Loader';

// // Component to display a single row's detailed information
// const BookingDetailsRow = ({ booking }) => {
//     // Determine if the payment was successful based on isPaid flag
//     const paymentStatus = booking.isPaid ? 'Paid' : 'Unpaid (Pending)';
//     const paymentColor = booking.isPaid ? 'text-green-600' : 'text-red-600';
    
//     // Create a Google Maps link for easy navigation
//     const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${booking.location?.coordinates.lat},${booking.location?.coordinates.lng}`;

//     return (
//         <td colSpan="5" className="p-4 bg-gray-50 border-t border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                 <div className="space-y-1">
//                     <p className="font-semibold text-gray-700">Customer Details:</p>
//                     <p>Name: <span className="font-medium">{booking.customerDetails?.name}</span></p>
//                     <p>Email: <span>{booking.customerDetails?.email}</span></p>
//                     <p>Phone: <span>{booking.customerDetails?.phone}</span></p>
//                 </div>
                
//                 <div className="space-y-1">
//                     <p className="font-semibold text-gray-700">Location Details:</p>
//                     <p className="font-medium">{booking.customerDetails?.address}</p>
//                     <p>
//                         Coordinates: <a 
//                             href={googleMapsLink} 
//                             target="_blank" 
//                             rel="noopener noreferrer" 
//                             className="text-blue-500 hover:underline"
//                         >
//                             View Live Location
//                         </a>
//                     </p>
//                 </div>

//                 <div className="space-y-1">
//                     <p className="font-semibold text-gray-700">Payment Status:</p>
//                     <p className={paymentColor}>Payment: 
//                         <span className="font-bold ml-1">{paymentStatus}</span>
//                     </p>
//                     {booking.paymentResult?.id && (
//                         <p className="text-xs text-gray-500">Txn ID: {booking.paymentResult.id.substring(0, 15)}...</p>
//                     )}
//                     <p>Booked On: {new Date(booking.createdAt).toLocaleDateString()}</p>
//                 </div>
//             </div>
//         </td>
//     );
// };

// const ManageBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState('All');
//     const [rescheduleData, setRescheduleData] = useState({ bookingId: null, newTime: '' });
//     const [expandedRowId, setExpandedRowId] = useState(null); // State to track expanded row

//     const statusOptions = ['Confirmed', 'Pending Payment', 'Rescheduled', 'Cancelled', 'Cancelled and Refunded', 'Order Completed'];
//     const filterOptions = ['All', ...statusOptions];

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         try {
//             setLoading(true);
//             // Fetch all admin bookings, which should be populated with user and service details
//             const { data } = await bookingApis.getAllBookingsAdmin(); 
//             setBookings(data);
//         } catch (err) {
//             setError('Failed to fetch all bookings.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStatusUpdate = async (bookingId, newStatus) => {
//         // Use custom modal/confirmation window logic instead of window.confirm
//         if (!window.confirm(`Change status of booking ${bookingId} to ${newStatus}?`)) return;
//         try {
//             await bookingApis.updateBookingStatusAdmin(bookingId, newStatus);
//             // Update local state by mapping over the array
//             setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
//             alert('Booking status updated.');
//         } catch (err) {
//             setError('Failed to update status.');
//         }
//     };

//     const handleReschedule = async (e) => {
//         e.preventDefault();
//         if (!rescheduleData.newTime || !rescheduleData.bookingId) return;

//         try {
//             await bookingApis.rescheduleBookingAdmin(rescheduleData.bookingId, rescheduleData.newTime);
//             // Update local state and status
//             setBookings(bookings.map(b => b._id === rescheduleData.bookingId ? { ...b, status: 'Rescheduled', preferredTime: rescheduleData.newTime } : b));
//             alert('Booking rescheduled successfully and notification sent.');
//             setRescheduleData({ bookingId: null, newTime: '' });
//         } catch (err) {
//             setError('Rescheduling failed.');
//         }
//     };

//     const filteredBookings = bookings.filter(booking => 
//         filter === 'All' || booking.status === filter
//     );

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Confirmed': return 'bg-green-100 text-green-800 border-green-300';
//             case 'Pending Payment': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//             case 'Rescheduled': return 'bg-blue-100 text-blue-800 border-blue-300';
//             case 'Cancelled':
//             case 'Cancelled and Refunded': return 'bg-red-100 text-red-800 border-red-300';
//             case 'Order Completed': return 'bg-purple-100 text-purple-800 border-purple-300';
//             default: return 'bg-gray-100 text-gray-800 border-gray-300';
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-2xl mt-6 max-w-7xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Manage Customer Bookings</h2>
            
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
//                 <div className="flex items-center space-x-3">
//                     <label htmlFor="status-filter" className="text-gray-600 font-medium">Filter By Status:</label>
//                     <select 
//                         id="status-filter"
//                         value={filter} 
//                         onChange={(e) => setFilter(e.target.value)} 
//                         className="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                         {filterOptions.map(f => <option key={f} value={f}>{f}</option>)}
//                     </select>
//                 </div>
//                 <p className="text-gray-600 font-medium">Total: <span className="font-bold text-indigo-600">{filteredBookings.length}</span> bookings</p>
//             </div>

//             {loading && <Loader />}
//             {error && <p className="text-red-500 p-4 border rounded bg-red-50">{error}</p>}

//             {/* Reschedule Modal/Form */}
//             {rescheduleData.bookingId && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <form onSubmit={handleReschedule} className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
//                         <h3 className="text-xl font-bold mb-4 text-gray-800">Reschedule Booking: {rescheduleData.bookingId.substring(0, 8)}...</h3>
//                         <input 
//                             type="datetime-local" 
//                             value={rescheduleData.newTime} 
//                             onChange={(e) => setRescheduleData({...rescheduleData, newTime: e.target.value})} 
//                             required 
//                             className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500" 
//                         />
//                         <div className="flex justify-end space-x-3">
//                             <button type="button" onClick={() => setRescheduleData({ bookingId: null, newTime: '' })} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
//                             <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Confirm Reschedule</button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Bookings Table */}
//             <div className="overflow-x-auto shadow-md rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-indigo-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Customer</th>
//                             <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Service & Amount</th>
//                             <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Scheduled Time</th>
//                             <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Details & Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredBookings.map((booking) => (
//                             <React.Fragment key={booking._id}>
//                                 <tr className="hover:bg-indigo-50 transition-colors">
//                                     {/* Customer & ID */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-medium text-gray-900">{booking.customerDetails?.name || booking.user?.name || 'N/A'}</div>
//                                         <div className="text-xs text-gray-500">ID: {booking._id.substring(0, 8)}...</div>
//                                     </td>
                                    
//                                     {/* Service & Amount */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm font-medium text-indigo-600">{booking.service?.name || 'N/A'}</div>
//                                         <div className="text-sm text-gray-700 font-bold">₹{booking.totalAmount.toLocaleString()}</div>
//                                     </td>
                                    
//                                     {/* Scheduled Time */}
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
//                                         {new Date(booking.preferredTime).toLocaleString()}
//                                     </td>
                                    
//                                     {/* Status Dropdown */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <select
//                                             value={booking.status}
//                                             onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
//                                             className={`text-sm font-semibold rounded p-1 border ${getStatusColor(booking.status)} focus:ring-indigo-500 focus:border-indigo-500`}
//                                         >
//                                             {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
//                                         </select>
//                                         <div className={`text-xs mt-1 font-medium ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}>
//                                             ({booking.isPaid ? 'Payment Confirmed' : 'Payment Pending'})
//                                         </div>
//                                     </td>
                                    
//                                     {/* Details Button */}
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                         <button 
//                                             onClick={() => setRescheduleData({ bookingId: booking._id, newTime: booking.preferredTime.substring(0, 16) })}
//                                             className="text-indigo-600 hover:text-indigo-900 mr-3"
//                                         >
//                                             Reschedule
//                                         </button>
//                                         <button 
//                                             onClick={() => setExpandedRowId(expandedRowId === booking._id ? null : booking._id)}
//                                             className="text-gray-600 hover:text-gray-900 font-bold"
//                                         >
//                                             {expandedRowId === booking._id ? '▲ Hide Details' : '▼ View Details'}
//                                         </button>
//                                     </td>
//                                 </tr>

//                                 {/* Expanded Detail Row */}
//                                 {expandedRowId === booking._id && (
//                                     <tr className="border-b border-gray-200">
//                                         <BookingDetailsRow booking={booking} />
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageBookings;

import React, { useState, useEffect, useMemo } from 'react';
import { bookingApis } from '../api/apis';
import Loader from '../components/Loader';

// Component to display a single row's detailed information
const BookingDetailsRow = ({ booking }) => {
    // Determine if the payment was successful based on isPaid flag
    const paymentStatus = booking.isPaid ? 'Paid' : 'Unpaid (Pending)';
    const paymentColor = booking.isPaid ? 'text-green-600' : 'text-red-600';
    
    // Create a Google Maps link for easy navigation
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${booking.location?.coordinates.lat},${booking.location?.coordinates.lng}`;

    return (
        <td colSpan="5" className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Customer Details:</p>
                    <p>Name: <span className="font-medium">{booking.customerDetails?.name}</span></p>
                    <p>Email: <span>{booking.customerDetails?.email}</span></p>
                    <p>Phone: <span>{booking.customerDetails?.phone}</span></p>
                </div>
                
                <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Location Details:</p>
                    <p className="font-medium">{booking.customerDetails?.address}</p>
                    <p>
                        Coordinates: <a 
                            href={googleMapsLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                        >
                            View Live Location
                        </a>
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Payment Status:</p>
                    <p className={paymentColor}>Payment: 
                        <span className="font-bold ml-1">{paymentStatus}</span>
                    </p>
                    {booking.paymentResult?.id && (
                        <p className="text-xs text-gray-500">Txn ID: {booking.paymentResult.id.substring(0, 15)}...</p>
                    )}
                    <p>Booked On: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </td>
    );
};

// Define constants for status options
const STATUS_OPTIONS = ['Confirmed', 'Pending Payment', 'Rescheduled', 'Cancelled', 'Cancelled and Refunded', 'Order Completed'];
// Define the special combined filter
const ACTIVE_STATUSES = ['Confirmed', 'Rescheduled'];

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // 1. Set the initial filter to 'Active'
    const [filter, setFilter] = useState('Active'); 
    // 3. New state for search term
    const [searchTerm, setSearchTerm] = useState('');
    const [rescheduleData, setRescheduleData] = useState({ bookingId: null, newTime: '' });
    const [expandedRowId, setExpandedRowId] = useState(null);

    // Filter options now include 'Active'
    const filterOptions = ['All', 'Active', ...STATUS_OPTIONS];

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data } = await bookingApis.getAllBookingsAdmin(); 
            setBookings(data);
        } catch (err) {
            setError('Failed to fetch all bookings.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        if (!window.confirm(`Change status of booking ${bookingId} to ${newStatus}?`)) return;
        try {
            await bookingApis.updateBookingStatusAdmin(bookingId, newStatus);
            setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
            alert('Booking status updated.');
        } catch (err) {
            setError('Failed to update status.');
        }
    };

    const handleReschedule = async (e) => {
        e.preventDefault();
        if (!rescheduleData.newTime || !rescheduleData.bookingId) return;

        try {
            await bookingApis.rescheduleBookingAdmin(rescheduleData.bookingId, rescheduleData.newTime);
            setBookings(bookings.map(b => b._id === rescheduleData.bookingId ? { ...b, status: 'Rescheduled', preferredTime: rescheduleData.newTime } : b));
            alert('Booking rescheduled successfully and notification sent.');
            setRescheduleData({ bookingId: null, newTime: '' });
        } catch (err) {
            setError('Rescheduling failed.');
        }
    };

    // Use useMemo for filtering to prevent unnecessary re-calculations
    const filteredBookings = useMemo(() => {
        let filtered = bookings;

        // 2. Combined Filter Logic
        if (filter !== 'All') {
            if (filter === 'Active') {
                filtered = filtered.filter(booking => ACTIVE_STATUSES.includes(booking.status));
            } else {
                filtered = filtered.filter(booking => booking.status === filter);
            }
        }

        // 3. Search Bar Logic
        if (searchTerm) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(booking => {
                const customerName = (booking.customerDetails?.name || booking.user?.name || '').toLowerCase();
                const customerEmail = (booking.customerDetails?.email || booking.user?.email || '').toLowerCase();
                const bookingId = booking._id.toLowerCase();

                return (
                    bookingId.includes(lowercasedSearchTerm) ||
                    customerName.includes(lowercasedSearchTerm) ||
                    customerEmail.includes(lowercasedSearchTerm)
                );
            });
        }

        return filtered;
    }, [bookings, filter, searchTerm]); // Depend on bookings, filter, and searchTerm

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800 border-green-300';
            case 'Pending Payment': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Rescheduled': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Cancelled':
            case 'Cancelled and Refunded': return 'bg-red-100 text-red-800 border-red-300';
            case 'Order Completed': return 'bg-purple-100 text-purple-800 border-purple-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl mt-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Manage Customer Bookings</h2>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                {/* Status Filter */}
                <div className="flex items-center space-x-3">
                    <label htmlFor="status-filter" className="text-gray-600 font-medium">Filter By Status:</label>
                    <select 
                        id="status-filter"
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        className="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {filterOptions.map(f => <option key={f} value={f}>{f === 'Active' ? 'Active (Confirmed + Rescheduled)' : f}</option>)}
                    </select>
                </div>

                {/* Search Bar */}
                <div className="w-full sm:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or Booking ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                <p className="text-gray-600 font-medium">Total: <span className="font-bold text-indigo-600">{filteredBookings.length}</span> bookings</p>
            </div>

            {loading && <Loader />}
            {error && <p className="text-red-500 p-4 border rounded bg-red-50">{error}</p>}

            {/* Reschedule Modal/Form (unchanged) */}
            {rescheduleData.bookingId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form onSubmit={handleReschedule} className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Reschedule Booking: {rescheduleData.bookingId.substring(0, 8)}...</h3>
                        <input 
                            type="datetime-local" 
                            value={rescheduleData.newTime} 
                            onChange={(e) => setRescheduleData({...rescheduleData, newTime: e.target.value})} 
                            required 
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500" 
                        />
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={() => setRescheduleData({ bookingId: null, newTime: '' })} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Confirm Reschedule</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bookings Table (unchanged besides using filteredBookings) */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Service & Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Scheduled Time</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">Details & Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <React.Fragment key={booking._id}>
                                    <tr className="hover:bg-indigo-50 transition-colors">
                                        {/* Customer & ID */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.customerDetails?.name || booking.user?.name || 'N/A'}</div>
                                            <div className="text-xs text-gray-500">ID: {booking._id.substring(0, 8)}...</div>
                                        </td>
                                        
                                        {/* Service & Amount */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-indigo-600">{booking.service?.name || 'N/A'}</div>
                                            <div className="text-sm text-gray-700 font-bold">₹{booking.totalAmount.toLocaleString()}</div>
                                        </td>
                                        
                                        {/* Scheduled Time */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                            {new Date(booking.preferredTime).toLocaleString()}
                                        </td>
                                        
                                        {/* Status Dropdown */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                                className={`text-sm font-semibold rounded p-1 border ${getStatusColor(booking.status)} focus:ring-indigo-500 focus:border-indigo-500`}
                                            >
                                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            <div className={`text-xs mt-1 font-medium ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                                ({booking.isPaid ? 'Payment Confirmed' : 'Payment Pending'})
                                            </div>
                                        </td>
                                        
                                        {/* Details Button */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => setRescheduleData({ bookingId: booking._id, newTime: booking.preferredTime.substring(0, 16) })}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                Reschedule
                                            </button>
                                            <button 
                                                onClick={() => setExpandedRowId(expandedRowId === booking._id ? null : booking._id)}
                                                className="text-gray-600 hover:text-gray-900 font-bold"
                                            >
                                                {expandedRowId === booking._id ? '▲ Hide Details' : '▼ View Details'}
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Detail Row */}
                                    {expandedRowId === booking._id && (
                                        <tr className="border-b border-gray-200">
                                            <BookingDetailsRow booking={booking} />
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-lg text-gray-500">
                                    No bookings found for the current filter and search term.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;