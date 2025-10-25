// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { serviceApis } from '../api/apis';
// import Loader from '../components/Loader';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const { data } = await serviceApis.getAllServices();
//         setServices(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch services.');
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

//   return (
//     <div className="container mx-auto p-4 py-10">
//       <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
//         Comprehensive Waterproofing Services
//       </h1>
//       <p className="text-center text-gray-600 mb-12">
//         We offer permanent solutions for every type of water damage and leakage.
//       </p>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service) => (
//           <div key={service._id} className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
//             <img 
//               src={service.imageUrl || 'https://via.placeholder.com/400x250'} 
//               alt={service.name} 
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               {/* SEO: Service Name is important */}
//               <h2 className="text-2xl font-bold text-blue-700 mb-2">{service.name}</h2>
//               <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
//               <Link 
//                 to={`/services/${service._id}`} 
//                 className="text-orange-500 font-semibold hover:text-orange-600 flex items-center"
//               >
//                 View Details & Book 
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceApis } from '../api/apis';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await serviceApis.getAllServices();
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services.');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
    hover: { scale: 1.05 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-12"
      >
        Our Waterproofing Services
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service._id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group h-80"
          >
            {/* Full image */}
            <img
              src={service.imageUrl || 'https://via.placeholder.com/400x250'}
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Title & Button */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center z-10">
              <h2 className="text-white font-bold text-xl mb-3">{service.name}</h2>
              <Link
                to={`/services/${service._id}`}
                className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
