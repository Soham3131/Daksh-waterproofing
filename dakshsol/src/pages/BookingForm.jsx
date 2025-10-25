
// // frontend/src/pages/BookingForm.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { bookingApis, paymentApis } from '../api/apis';
// import Loader from '../components/Loader';
// import { useAuth } from '../context/AuthContext';

// // Razorpay script loader helper
// const loadRazorpayScript = (src) => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const BookingForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userInfo } = useAuth();
//   const service = location.state?.service;

//   const [formData, setFormData] = useState({
//     name: userInfo?.name || '',
//     email: userInfo?.email || '',
//     phone: userInfo?.phone || '',
//     serviceId: service?._id || '',
//     preferredTime: '',
//     address: '',
//     latitude: 0,
//     longitude: 0,
//     isLiveLocation: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!service) setError('Please select a service first.');
//   }, [service]);

//   // Capture GPS Location
//   const handleLocationToggle = (e) => {
//     const isLive = e.target.checked;
//     setFormData((prev) => ({ ...prev, isLiveLocation: isLive }));

//     if (isLive && navigator.geolocation) {
//       setError(null);
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLoading(false);
//           setFormData((prev) => ({
//             ...prev,
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           }));
//         },
//         (err) => {
//           setLoading(false);
//           setError('Failed to access location. Enter address manually.');
//           setFormData((prev) => ({
//             ...prev,
//             isLiveLocation: false,
//             latitude: 0,
//             longitude: 0,
//           }));
//           console.error(err);
//         }
//       );
//     } else if (!isLive) {
//       setFormData((prev) => ({ ...prev, latitude: 0, longitude: 0 }));
//     }
//   };

//   const submitBooking = async (e) => {
//     e.preventDefault();

//     if (!service) return setError('Service details missing.');
//     if (!formData.address.trim())
//       return setError('Full address is mandatory.');
//     if (formData.latitude === 0 || formData.longitude === 0)
//       return setError('Please set your live or map location.');
//     if (!formData.preferredTime)
//       return setError('Please select a preferred date and time.');

//     setLoading(true);
//     setError(null);

//     const bookingPayload = {
//       serviceId: formData.serviceId,
//       preferredTime: formData.preferredTime,
//       address: formData.address,
//       lat: formData.latitude,
//       lng: formData.longitude,
//       customerName: formData.name,
//       customerEmail: formData.email,
//       customerPhone: formData.phone,
//     };

//     try {
//       // Step 1 - Create Booking (status: Pending Payment)
//       const { data: bookingData } = await bookingApis.createBooking(bookingPayload);

//       // Step 2 - Create Razorpay Order
//    const { data: orderData } = await paymentApis.createOrder({ bookingId: bookingData._id });


//       // Step 3 - Load Razorpay SDK
//       const loaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
//       if (!loaded) throw new Error('Failed to load Razorpay SDK.');

//       // Step 4 - Open Razorpay Payment Modal
//       const options = {
//         key: orderData.keyId,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: 'Daksh Waterproofing Solutions',
//         description: service.name,
//         order_id: orderData.orderId,
//         handler: async (response) => {
//           try {
//             alert('Payment successful! Booking confirmed.');
//             navigate('/profile?tab=bookings');
//           } catch (err) {
//             console.error('Post-payment update failed:', err);
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: '#2563eb' },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Booking/payment failed.';
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!service) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-xl w-full space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-extrabold text-gray-900">
//             Book: {service.name}
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Service Fee:{' '}
//             <span className="text-xl font-bold text-indigo-600">
//               ₹{service.basePrice.toLocaleString()}
//             </span>
//           </p>
//         </div>

//         <form
//           onSubmit={submitBooking}
//           className="bg-white p-8 shadow-2xl rounded-xl space-y-6"
//         >
//           {loading && <Loader />}
//           {error && (
//             <div
//               className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded"
//               role="alert"
//             >
//               <p className="font-bold">Booking Error</p>
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Contact Info */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b">
//               Contact Information
//             </h2>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 required
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 required
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phone: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
//               />
//             </div>
//           </div>

//           {/* Address + Location */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b mt-6">
//               Service Location
//             </h2>

//             <textarea
//               id="address"
//               rows="3"
//               required
//               value={formData.address}
//               onChange={(e) =>
//                 setFormData({ ...formData, address: e.target.value })
//               }
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-orange-500"
//               placeholder="House/Flat, Street, Landmark, City, Pin Code"
//             />

//             <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 border rounded-lg">
//               <label className="font-medium text-sm text-gray-700">
//                 Capture Live Location (GPS)
//               </label>
//               <input
//                 type="checkbox"
//                 checked={formData.isLiveLocation}
//                 onChange={handleLocationToggle}
//                 className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
//               />
//             </div>

//             <div
//               className={`border-2 ${
//                 formData.latitude
//                   ? 'border-green-500 bg-green-50'
//                   : 'border-red-500 bg-red-50'
//               } p-3 rounded-lg text-center mt-2`}
//             >
//               <p className="font-semibold text-sm">Live Coordinates</p>
//               <div className="mt-1 text-gray-700 font-mono text-xs">
//                 Lat: {formData.latitude.toFixed(4)}, Lng:{' '}
//                 {formData.longitude.toFixed(4)}
//               </div>
//             </div>
//           </div>

//           {/* Preferred Time */}
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b mt-6">
//               Preferred Time Slot
//             </h2>
//             <input
//               type="datetime-local"
//               required
//               value={formData.preferredTime}
//               onChange={(e) =>
//                 setFormData({ ...formData, preferredTime: e.target.value })
//               }
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={
//               loading ||
//               !formData.address.trim() ||
//               !formData.latitude ||
//               !formData.preferredTime
//             }
//             className="w-full py-3 px-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
//           >
//             {loading
//               ? 'Processing...'
//               : `Pay ₹${service.basePrice.toLocaleString()} & Confirm Booking`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

// frontend/src/pages/BookingForm.jsx (FIXED)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingApis, paymentApis } from '../api/apis';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

// Razorpay script loader helper
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useAuth();
  const service = location.state?.service;

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    serviceId: service?._id || '',
    preferredTime: '',
    address: '',
    latitude: 0,
    longitude: 0,
    isLiveLocation: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!service) setError('Please select a service first.');
  }, [service]);

  // Capture GPS Location
  const handleLocationToggle = (e) => {
    const isLive = e.target.checked;
    setFormData((prev) => ({ ...prev, isLiveLocation: isLive }));

    if (isLive && navigator.geolocation) {
      setError(null);
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoading(false);
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => {
          setLoading(false);
          setError('Failed to access location. Enter address manually.');
          setFormData((prev) => ({
            ...prev,
            isLiveLocation: false,
            latitude: 0,
            longitude: 0,
          }));
          console.error(err);
        }
      );
    } else if (!isLive) {
      setFormData((prev) => ({ ...prev, latitude: 0, longitude: 0 }));
    }
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    if (!service) return setError('Service details missing.');
    if (!formData.address.trim())
      return setError('Full address is mandatory.');
    if (formData.latitude === 0 || formData.longitude === 0)
      return setError('Please set your live or map location.');
    if (!formData.preferredTime)
      return setError('Please select a preferred date and time.');

    setLoading(true);
    setError(null);

    const bookingPayload = {
      serviceId: formData.serviceId,
      preferredTime: formData.preferredTime,
      address: formData.address,
      lat: formData.latitude,
      lng: formData.longitude,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
    };

    try {
      // Step 1 - Create Booking (status: Pending Payment)
      const { data: bookingData } = await bookingApis.createBooking(bookingPayload);

      // Step 2 - Create Razorpay Order
   const { data: orderData } = await paymentApis.createOrder({ bookingId: bookingData._id });


      // Step 3 - Load Razorpay SDK
      const loaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!loaded) throw new Error('Failed to load Razorpay SDK.');

      // Step 4 - Open Razorpay Payment Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Daksh Waterproofing Solutions',
        description: service.name,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
                // *** FIX: Call backend verification API after successful payment ***
                const verificationPayload = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                };

                await paymentApis.verifyPayment(verificationPayload);
                
            alert('Payment successful! Booking Confirmed.');
            navigate('/profile?tab=bookings');
          } catch (err) {
            console.error('Payment verification failed on server:', err);
            alert('Payment verification failed. Your booking status might still be pending. Please contact support.');
             // Still navigate, so the user can check the status, even if pending
            navigate('/profile?tab=bookings');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#2563eb' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking/payment failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Book: {service.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Service Fee:{' '}
            <span className="text-xl font-bold text-indigo-600">
              ₹{service.basePrice.toLocaleString()}
            </span>
          </p>
        </div>

        <form
          onSubmit={submitBooking}
          className="bg-white p-8 shadow-2xl rounded-xl space-y-6"
        >
          {loading && <Loader />}
          {error && (
            <div
              className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded"
              role="alert"
            >
              <p className="font-bold">Booking Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b">
              Contact Information
              </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Address + Location */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b mt-6">
              Service Location
            </h2>

            <textarea
              id="address"
              rows="3"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-orange-500"
              placeholder="House/Flat, Street, Landmark, City, Pin Code"
            />

            <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 border rounded-lg">
              <label className="font-medium text-sm text-gray-700">
                Capture Live Location (GPS)
              </label>
              <input
                type="checkbox"
                checked={formData.isLiveLocation}
                onChange={handleLocationToggle}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
              />
            </div>

            <div
              className={`border-2 ${
                formData.latitude
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              } p-3 rounded-lg text-center mt-2`}
            >
              <p className="font-semibold text-sm">Live Coordinates</p>
              <div className="mt-1 text-gray-700 font-mono text-xs">
                Lat: {formData.latitude.toFixed(4)}, Lng:{' '}
                {formData.longitude.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b mt-6">
              Preferred Time Slot
            </h2>
            <input
              type="datetime-local"
              required
              value={formData.preferredTime}
              onChange={(e) =>
                setFormData({ ...formData, preferredTime: e.target.value })
              }
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              !formData.address.trim() ||
              !formData.latitude ||
              !formData.preferredTime
            }
            className="w-full py-3 px-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading
              ? 'Processing...'
              : `Pay ₹${service.basePrice.toLocaleString()} & Confirm Booking`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;