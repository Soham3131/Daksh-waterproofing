
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { serviceApis } from '../api/apis';
// import Loader from '../components/Loader';
// import { useAuth } from '../context/AuthContext';
// import { motion } from 'framer-motion';

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { userInfo } = useAuth();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const { data } = await serviceApis.getServiceDetails(id);
//         setService(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Service not found.');
//         setLoading(false);
//       }
//     };
//     fetchService();
//   }, [id]);

//   const handleBookNow = () => {
//     if (userInfo) {
//       navigate(`/book/${id}`, { state: { service } });
//     } else {
//       navigate('/login?redirect=/book/' + id);
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
//   if (!service) return <div className="text-center py-10">Service data is unavailable.</div>;

//   document.title = `${service.name} | Daksh Waterproofing Solutions`;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Full-width Hero Image */}
//       <div className="relative w-full h-[400px] md:h-[500px]">
//         <img
//           src={service.imageUrl || 'https://via.placeholder.com/1600x600'}
//           alt={service.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//           <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center px-4 drop-shadow-lg">
//             {service.name}
//           </h1>
//         </div>
//       </div>

//       {/* Service Content */}
//       <div className="container mx-auto p-4 md:p-10 max-w-4xl">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-2xl p-8 -mt-20"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">About This Service</h2>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//             {service.description ||
//               'Premium waterproofing solutions to protect your property from leaks and dampness. Our expert team ensures long-lasting results and peace of mind.'}
//           </p>

//           <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
//             <li>Comprehensive leak repair & damp-proofing</li>
//             <li>High-quality polymer and epoxy coatings</li>
//             <li>Full site inspection and free estimation included</li>
//             <li>Ensures long-term protection against water damage</li>
//           </ul>

//           <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
//             <div className="text-2xl font-extrabold text-orange-600">
//               Starting Price: ₹{service.basePrice?.toLocaleString() || 'N/A'}
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleBookNow}
//               className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 shadow-lg transition-all"
//             >
//               Book This Service
//             </motion.button>
//           </div>

//           <div className="mt-10">
//             <h3 className="text-2xl font-bold text-blue-700 mb-4">Why Choose Us?</h3>
//             <p className="text-gray-700 mb-6">
//               We use industry-approved materials and techniques to guarantee waterproofing that lasts. Trusted by homeowners and businesses alike.
//             </p>
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               <li>Local expertise for quick, reliable solutions</li>
//               <li>Certified professionals & advanced equipment</li>
//               <li>Customer satisfaction is our top priority</li>
//               <li>Transparent pricing with no hidden charges</li>
//             </ul>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceApis } from '../api/apis';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await serviceApis.getServiceDetails(id);
        setService(data);
        setLoading(false);
      } catch (err) {
        setError('Service not found.');
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBookNow = () => {
    if (userInfo) {
      navigate(`/book/${id}`, { state: { service } });
    } else {
      navigate('/login?redirect=/book/' + id);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!service) return <div className="text-center py-10">Service data is unavailable.</div>;

  document.title = `${service.name} | Daksh Waterproofing Solutions`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Full-width Hero Image */}
      <div className="relative w-full h-[450px] md:h-[550px]">
        <img
          src={service.imageUrl || 'https://via.placeholder.com/1600x600'}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center px-4 drop-shadow-lg">
            {service.name}
          </h1>
        </div>
      </div>

      {/* Add spacing to prevent navbar overlap */}
      <div className="mt-6 md:mt-10"></div>

      {/* Service Content */}
      <div className="container mx-auto p-4 md:p-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:-mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">About This Service</h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {service.description ||
              'Premium waterproofing solutions to protect your property from leaks and dampness. Our expert team ensures long-lasting results and peace of mind.'}
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Comprehensive leak repair & damp-proofing</li>
            <li>High-quality polymer and epoxy coatings</li>
            <li>Full site inspection and free estimation included</li>
            <li>Ensures long-term protection against water damage</li>
          </ul>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
            <div className="text-2xl font-extrabold text-orange-600">
              Starting Price: ₹{service.basePrice?.toLocaleString() || 'N/A'}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookNow}
              className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 shadow-lg transition-all"
            >
              Book This Service
            </motion.button>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Why Choose Us?</h3>
            <p className="text-gray-700 mb-6">
              We use industry-approved materials and techniques to guarantee waterproofing that lasts. Trusted by homeowners and businesses alike.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Local expertise for quick, reliable solutions</li>
              <li>Certified professionals & advanced equipment</li>
              <li>Customer satisfaction is our top priority</li>
              <li>Transparent pricing with no hidden charges</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;
