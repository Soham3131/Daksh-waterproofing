

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { FaWrench, FaShieldAlt, FaHandsHelping, FaMapMarkerAlt, FaWater, FaHome, FaAngleRight } from "react-icons/fa";
// import { motion } from "framer-motion";
// import Typewriter from "typewriter-effect";

// import a from "../assets/a.jpg";
// import b from "../assets/b.jpg";
// import c from "../assets/c.jpg";
// import d from "../assets/d.jpg";
// import e from "../assets/e.jpg"; // Dummy image for informational slides
// import f from "../assets/f.jpg"; // Dummy image for informational slides
// import g from "../assets/g.jpg"; // Dummy image for informational slides
// import h from "../assets/h.jpg"; // Dummy image for informational slides
// import i from "../assets/i.jpg"; // Dummy image for informational slides
// import j from "../assets/j.jpg"; // Dummy image for informational slides

// // Custom CSS for text shadow on the hero section for better readability
// const textShadowStyle = {
//     // Increased shadow opacity for maximum readability on varying backgrounds
//     textShadow: '0 0 15px rgba(0, 0, 0, 1)', 
// };

// const Home = () => {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Placeholder: Replace with your actual deployed API URL
//     const API_URL = "http://localhost:5000/api/services"; 

//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 // Simulating API delay for better loading state visibility
//                 await new Promise(resolve => setTimeout(resolve, 500)); 
//                 const { data } = await axios.get(API_URL);
//                 setServices(Array.isArray(data) ? data : []); 
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching services:", err);
//                 setError("Failed to load services. Please try again later.");
//                 setLoading(false);
//             }
//         };
//         fetchServices();
//     }, []);

//     const heroSlides = [
//         { url: a }, 
//         { url: b },
//         { url: c },
//         { url: d },
//     ];

//     const informationalSlides = [
//         { id: 1, title: "Terrace Waterproofing", text: "Prevent water seepage with multi-layer polymer coatings. Long-lasting protection against elements.", icon: <FaShieldAlt className="text-4xl text-white" />, imageUrl: f }, 
//         { id: 2, title: "Basement Damp Proofing", text: "Advanced chemical injection for permanent damp and leak solutions. Restore structural integrity.", icon: <FaWrench className="text-4xl text-white" />, imageUrl: g }, 
//         { id: 3, title: "Bathroom & Kitchen Sealing", text: "High-grade epoxy and cementitious solutions for wet areas. Prevent mold and water damage.", icon: <FaHandsHelping className="text-4xl text-white" />, imageUrl: h}, 
//         { id: 4, title: "Exterior Wall Waterproofing", text: "Protective coatings for external walls to prevent rain penetration.", icon: <FaHome className="text-4xl text-white" />, imageUrl: i }, 
//     ];

//     const extraSection = [
//         { id: 1, icon: <FaWater className="text-5xl text-blue-500" />, title: "Moisture Barrier", text: "Protect walls and floors from water damage with advanced sealants and proven techniques." },
//         { id: 2, icon: <FaHome className="text-5xl text-blue-500" />, title: "Structural Safety", text: "Ensure longevity of your building with expert, guaranteed waterproofing solutions for all surfaces." },
//         { id: 3, icon: <FaMapMarkerAlt className="text-5xl text-blue-500" />, title: "Local Expertise", text: "Serving Delhi NCR with trusted, quick, and professional solutions, backed by local knowledge." },
//     ];

//     const fadeUp = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//     };

//     return (
//         <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-b from-white to-blue-50">
            
//             {/* Hero Section - FIX: Button Responsiveness and Layout */}
//             <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
//                 {/* Background Slider for Visual Impact */}
//                 <Swiper
//                     modules={[EffectFade, Autoplay, Pagination]}
//                     effect="fade"
//                     autoplay={{ delay: 5000, disableOnInteraction: false }}
//                     loop
//                     pagination={{ clickable: true }} 
//                     className="absolute inset-0 w-full h-full"
//                 >
//                     {heroSlides.map((slide, idx) => (
//                         <SwiperSlide key={idx}>
//                             <div
//                                 className="bg-cover bg-center h-full w-full transition-transform duration-1000 ease-in-out"
//                                 style={{ backgroundImage: `url(${slide.url})` }}
//                             >
//                                 {/* Image Overlay: Darkened slightly for text contrast */}
//                                 <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div> 
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* Unified Global Text Overlay for Engagement (Fixed Text Content) */}
//                 <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 md:px-6 z-30"> 
//                     {/* Max width set to 90% on small screens for safety */}
//                     <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl w-full p-4 md:p-8">
//                         <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 leading-tight" style={textShadowStyle}>
//                             <Typewriter
//                                 options={{
//                                     strings: ["Expert Waterproofing Solutions", "Protect. Seal. Strengthen.", "Guaranteed Leak Repair"],
//                                     autoStart: true,
//                                     loop: true,
//                                     delay: 60,
//                                     deleteSpeed: 40,
//                                 }}
//                             />
//                         </h1>
//                         <motion.p 
//                             initial={{ opacity: 0 }} 
//                             animate={{ opacity: 1 }} 
//                             transition={{ delay: 1, duration: 1 }} 
//                             className="text-lg md:text-2xl mb-8 md:mb-12 font-light max-w-2xl mx-auto"
//                             style={textShadowStyle}
//                         >
//                             Stop leaks and protect your property with **Daksh Waterproofing** — Serving Delhi, Noida, and Gurgaon with **guaranteed results and 24/7 service.**
//                         </motion.p>
                        
//                         {/* FIX: Improved Button Design for Responsiveness and Visual Hierarchy */}
//                         <motion.div 
//                             whileHover={{ scale: 1.05 }} 
//                             whileTap={{ scale: 0.95 }} 
//                             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                             className="inline-block" // Ensure motion.div doesn't stretch and button is centered
//                         >
//                             <Link
//                                 to="/contact"
//                                 // Use w-full only on mobile, revert to auto width on MD+
//                                 className="bg-orange-500 text-white font-extrabold tracking-wide py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl hover:bg-orange-600 transition-all duration-300 shadow-2xl uppercase inline-flex items-center justify-center min-w-[280px]"
//                             >
//                                 <FaHandsHelping className="inline mr-3 text-xl sm:text-2xl" /> Book FREE Inspection
//                             </Link>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Separator for Visual Hierarchy */}
//             <hr className="my-0 border-t-8 border-orange-500 w-3/4 mx-auto opacity-70" />

//             {/* Services Section - Design Pattern: Card Grid */}
//             <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
//                 <div className="container mx-auto px-6">
//                     <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16 text-blue-900 border-b-4 border-blue-200 inline-block mx-auto pb-2">
//                         Our Comprehensive Waterproofing Services
//                     </motion.h2>

//                     {loading && <div className="text-center text-lg text-blue-600">Loading expert services...</div>}
//                     {error && <div className="text-center text-red-600 text-lg p-4 bg-red-100 rounded-lg">{error}</div>}

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
//                         {services.length > 0
//                             ? services.slice(0, 6).map((service) => (
//                                     <motion.div
//                                         key={service._id}
//                                         initial={{ opacity: 0, scale: 0.9 }}
//                                         whileInView={{ opacity: 1, scale: 1 }}
//                                         viewport={{ once: true, amount: 0.2 }}
//                                         transition={{ duration: 0.5 }}
//                                         whileHover={{ scale: 1.05, y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//                                         className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
//                                     >
//                                         <Link to={`/services/${service._id}`} className="block">
//                                             <motion.img
//                                                 src={service.imageUrl || a}
//                                                 alt={service.name}
//                                                 className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//                                             />
//                                             <div className="p-8">
//                                                 <h3 className="text-2xl font-extrabold text-blue-900 mb-3 group-hover:text-orange-500 transition-colors">{service.name}</h3>
//                                                 <p className="text-gray-600 mb-4 text-base leading-relaxed">{service.description ? service.description.substring(0, 120) + "..." : "Description of this premium waterproofing service."}</p>
//                                                 <span className="mt-4 inline-block font-bold text-orange-500 flex items-center">
//                                                     Explore Solution <FaAngleRight className="ml-2 transition-transform group-hover:translate-x-1" />
//                                                 </span>
//                                             </div>
//                                         </Link>
//                                     </motion.div>
//                                 ))
//                             : !loading && <p className="col-span-full text-center text-gray-700 bg-yellow-50 p-6 rounded-lg">No services found in the database. Please check your API connection.</p>}
//                     </div>

//                     <div className="text-center mt-20">
//                         <Link
//                             to="/services"
//                             className="text-xl font-bold text-white bg-blue-700 py-3 px-8 rounded-lg hover:bg-blue-800 transition-all shadow-lg"
//                         >
//                             View All Services (10+) →
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* Informational Slides with Background Images - Design Pattern: Feature Carousel (Swiper) */}
//             <section className="py-24 bg-gray-50">
//                 <div className="container mx-auto px-6">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">
//                         Common Waterproofing Problems & Solutions 💧
//                     </h2>

//                     <Swiper
//                         modules={[Pagination, Autoplay, Navigation]}
//                         spaceBetween={30}
//                         slidesPerView={1}
//                         navigation
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 4000, disableOnInteraction: false }}
//                         breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
//                         className="pb-16"
//                     >
//                         {informationalSlides.map((slide) => (
//                             <SwiperSlide key={slide.id}>
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     whileInView={{ opacity: 1 }}
//                                     viewport={{ once: true }}
//                                     transition={{ duration: 0.6 }}
//                                     whileHover={{ scale: 1.03 }}
//                                     className="relative p-6 rounded-2xl shadow-xl border-t-8 border-blue-500 flex flex-col items-center text-center h-[500px] overflow-hidden transition-all group"
//                                 >
//                                     {/* Background Image for Informational Slide */}
//                                     <div
//                                         className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
//                                         style={{ backgroundImage: `url(${slide.imageUrl || d})` }}
//                                     >
//                                         <div className="absolute inset-0 bg-blue-900 bg-opacity-60 transition-opacity group-hover:bg-opacity-70"></div>
//                                     </div>

//                                     <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
//                                         <div className="bg-blue-800 p-5 rounded-full mb-6 inline-block shadow-lg group-hover:bg-orange-500 transition-colors">
//                                             {slide.icon}
//                                         </div>
//                                         <h3 className="text-2xl font-semibold mb-4 text-white">{slide.title}</h3>
//                                         <p className="text-lg mb-6 text-gray-100">{slide.text}</p>
//                                         <Link
//                                             to="/services"
//                                             className="mt-auto text-orange-400 hover:text-white font-bold text-base flex items-center transition-colors border-b-2 border-orange-400 hover:border-white"
//                                         >
//                                             Get a Quote <FaAngleRight className="ml-1" />
//                                         </Link>
//                                     </div>
//                                 </motion.div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </section>


//             <section className="py-24 bg-gradient-to-r from-blue-100 to-blue-50">
//                 <div className="container mx-auto px-6">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Why Choose Daksh Waterproofing?</h2>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//                         {extraSection.map((item) => (
//                             <motion.div
//                                 key={item.id}
//                                 initial={{ opacity: 0, x: -50 }}
//                                 whileInView={{ opacity: 1, x: 0 }}
//                                 viewport={{ once: true, amount: 0.3 }}
//                                 transition={{ duration: 0.6, delay: item.id * 0.1 }}
//                                 whileHover={{ scale: 1.03, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)" }}
//                                 className="bg-white rounded-xl shadow-lg p-10 text-center hover:shadow-2xl transition-all border border-blue-200"
//                             >
//                                 <div className="mb-6 mx-auto w-fit p-3 rounded-full bg-blue-100">{item.icon}</div>
//                                 <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
//                                 <p className="text-gray-600 leading-relaxed">{item.text}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
            
            

//             <section
//                 className="relative py-10"
//                 style={{
//                     backgroundImage: `url(${j})`,
//                     backgroundSize: "cover", 
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center center", 
//                     height: "400px", 
//                     width: "100%", 
//                 }}
//             >
//                 <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div> {/* Dark Overlay for text contrast */}
//                 <div className="relative container mx-auto px-6 text-center h-full flex flex-col items-center justify-center">
//                     <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 md:mb-10 max-w-2xl" style={textShadowStyle}>
//                         Ready to stop your leaks? Get a FREE estimate today!
//                     </h3>
//                     <Link
//                         to="/contact"
//                         className="bg-orange-500 text-white font-extrabold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl inline-flex items-center"
//                     >
//                         Contact Us Now
//                     </Link>
//                 </div>
//             </section>


//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaWrench, FaShieldAlt, FaHandsHelping, FaMapMarkerAlt, FaWater, FaHome, FaAngleRight, FaFlask, FaTools, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.jpg";
import d from "../assets/d.jpg";
import e from "../assets/e.jpg"; // Dummy image for informational slides
import f from "../assets/f.jpg"; // Dummy image for informational slides
import g from "../assets/g.jpg"; // Dummy image for informational slides
import h from "../assets/h.jpg"; // Dummy image for informational slides
import i from "../assets/i.jpg"; // Dummy image for informational slides
import j from "../assets/j.jpg"; // Dummy image for informational slides

// Custom CSS for text shadow on the hero section for better readability
const textShadowStyle = {
    textShadow: '0 0 15px rgba(0, 0, 0, 1)', 
};

// Map service names (or IDs) to specific icons for dynamic rendering
const serviceIconMap = {
    "terrace waterproofing": FaShieldAlt,
    "basement damp proofing": FaBuilding,
    "bathroom & kitchen sealing": FaWater,
    "exterior wall waterproofing": FaHome,
    "leak detection": FaTools,
    "structural injection": FaFlask,
};

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Placeholder: Replace with your actual deployed API URL
    const API_URL = "http://localhost:5000/api/services"; 

    useEffect(() => {
        const fetchServices = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500)); 
                // Assuming the API returns a 'name' field for the service
                const { data } = await axios.get(API_URL);
                setServices(Array.isArray(data) ? data : []); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to load services. Please try again later.");
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Function to get the correct icon component based on service name
    const getServiceIcon = (serviceName) => {
        const key = serviceName.toLowerCase().trim();
        const IconComponent = serviceIconMap[key] || FaWrench; // Default icon
        return <IconComponent className="text-3xl text-white" />;
    };

    const heroSlides = [
        { url: a }, 
        { url: b },
        { url: c },
        { url: d },
    ];

    const informationalSlides = [
        { id: 1, title: "Terrace Waterproofing", text: "Prevent water seepage with multi-layer polymer coatings. Long-lasting protection against elements.", icon: <FaShieldAlt className="text-4xl text-white" />, imageUrl: f }, 
        { id: 2, title: "Basement Damp Proofing", text: "Advanced chemical injection for permanent damp and leak solutions. Restore structural integrity.", icon: <FaWrench className="text-4xl text-white" />, imageUrl: g }, 
        { id: 3, title: "Bathroom & Kitchen Sealing", text: "High-grade epoxy and cementitious solutions for wet areas. Prevent mold and water damage.", icon: <FaHandsHelping className="text-4xl text-white" />, imageUrl: h}, 
        { id: 4, title: "Exterior Wall Waterproofing", text: "Protective coatings for external walls to prevent rain penetration.", icon: <FaHome className="text-4xl text-white" />, imageUrl: i }, 
    ];

    const extraSection = [
        { id: 1, icon: <FaWater className="text-5xl text-blue-500" />, title: "Moisture Barrier", text: "Protect walls and floors from water damage with advanced sealants and proven techniques." },
        { id: 2, icon: <FaHome className="text-5xl text-blue-500" />, title: "Structural Safety", text: "Ensure longevity of your building with expert, guaranteed waterproofing solutions for all surfaces." },
        { id: 3, icon: <FaMapMarkerAlt className="text-5xl text-blue-500" />, title: "Local Expertise", text: "Serving Delhi NCR with trusted, quick, and professional solutions, backed by local knowledge." },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-b from-white to-blue-50">
            
            {/* Hero Section */}
            <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
                <Swiper
                    modules={[EffectFade, Autoplay, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    pagination={{ clickable: true }} 
                    className="absolute inset-0 w-full h-full"
                >
                    {heroSlides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="bg-cover bg-center h-full w-full transition-transform duration-1000 ease-in-out"
                                style={{ backgroundImage: `url(${slide.url})` }}
                            >
                                {/* Image Overlay: Default hero overlay remains darker for text contrast */}
                                <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div> 
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Unified Global Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 md:px-6 z-30"> 
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl w-full p-4 md:p-8">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 leading-tight" style={textShadowStyle}>
                            <Typewriter
                                options={{
                                    strings: ["Expert Waterproofing Solutions", "Protect. Seal. Strengthen.", "Guaranteed Leak Repair"],
                                    autoStart: true,
                                    loop: true,
                                    delay: 60,
                                    deleteSpeed: 40,
                                }}
                            />
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 1, duration: 1 }} 
                            className="text-lg md:text-2xl mb-8 md:mb-12 font-light max-w-2xl mx-auto"
                            style={textShadowStyle}
                        >
                            Stop leaks and protect your property with **Daksh Waterproofing** — Serving Delhi, Noida, and Gurgaon with **guaranteed results and 24/7 service.**
                        </motion.p>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="inline-block"
                        >
                            <Link
                                to="/contact"
                                className="bg-orange-500 text-white font-extrabold tracking-wide py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl hover:bg-orange-600 transition-all duration-300 shadow-2xl uppercase inline-flex items-center justify-center min-w-[280px]"
                            >
                                <FaHandsHelping className="inline mr-3 text-xl sm:text-2xl" /> Book FREE Inspection
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Separator for Visual Hierarchy */}
            <hr className="my-0 border-t-8 border-orange-500 w-3/4 mx-auto opacity-70" />

            {/* Services Section - IMPROVED STYLE FOR BACKEND DATA */}
            <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16 text-blue-900 border-b-4 border-blue-200 inline-block mx-auto pb-2">
                        Our Comprehensive Waterproofing Services
                    </motion.h2>

                    {loading && <div className="text-center text-lg text-blue-600">Loading expert services...</div>}
                    {error && <div className="text-center text-red-600 text-lg p-4 bg-red-100 rounded-lg">{error}</div>}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.length > 0
                            ? services.slice(0, 6).map((service) => (
                                    <motion.div
                                        key={service._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5 }}
                                        whileHover={{ scale: 1.05, y: -8, boxShadow: "0 20px 30px -5px rgba(255, 165, 0, 0.2)" }}
                                        className="bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden group border-t-8 border-blue-500 relative"
                                    >
                                        <Link to={`/services/${service._id}`} className="block">
                                            {/* New Sticky Icon */}
                                            <div className="absolute top-0 right-0 m-4 p-3 bg-orange-500 rounded-full shadow-lg group-hover:bg-blue-700 transition-colors z-10">
                                                {getServiceIcon(service.name)}
                                            </div>
                                            
                                            <motion.img
                                                src={service.imageUrl || a}
                                                alt={service.name}
                                                className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="p-8">
                                                <h3 className="text-2xl font-extrabold text-blue-900 mb-3 group-hover:text-orange-500 transition-colors">{service.name}</h3>
                                                <p className="text-gray-600 mb-4 text-base leading-relaxed">{service.description ? service.description.substring(0, 120) + "..." : "Description of this premium waterproofing service."}</p>
                                                <span className="mt-4 inline-block font-bold text-orange-500 flex items-center">
                                                    Explore Solution <FaAngleRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            : !loading && <p className="col-span-full text-center text-gray-700 bg-yellow-50 p-6 rounded-lg">No services found in the database. Please check your API connection.</p>}
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            to="/services"
                            className="text-xl font-bold text-white bg-blue-700 py-3 px-8 rounded-lg hover:bg-blue-800 transition-all shadow-lg"
                        >
                            View All Services (10+) →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Informational Slides with Background Images - REDUCED BLUE TINT */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">
                        Common Waterproofing Problems & Solutions 💧
                    </h2>

                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                        className="pb-16"
                    >
                        {informationalSlides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="relative p-6 rounded-2xl shadow-xl border-t-8 border-blue-500 flex flex-col items-center text-center h-[500px] overflow-hidden transition-all group"
                                >
                                    {/* Background Image for Informational Slide */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${slide.imageUrl || d})` }}
                                    >
                                        {/* FIX: Reduced Blue Tint from bg-opacity-60 to bg-opacity-40 */}
                                        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 transition-opacity group-hover:bg-opacity-50"></div>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                                        <div className="bg-blue-800 p-5 rounded-full mb-6 inline-block shadow-lg group-hover:bg-orange-500 transition-colors">
                                            {slide.icon}
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-4 text-white">{slide.title}</h3>
                                        <p className="text-lg mb-6 text-gray-100">{slide.text}</p>
                                        <Link
                                            to="/services"
                                            className="mt-auto text-orange-400 hover:text-white font-bold text-base flex items-center transition-colors border-b-2 border-orange-400 hover:border-white"
                                        >
                                            Get a Quote <FaAngleRight className="ml-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>


            <section className="py-24 bg-gradient-to-r from-blue-100 to-blue-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">Why Choose Daksh Waterproofing?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {extraSection.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: item.id * 0.1 }}
                                whileHover={{ scale: 1.03, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white rounded-xl shadow-lg p-10 text-center hover:shadow-2xl transition-all border border-blue-200"
                            >
                                <div className="mb-6 mx-auto w-fit p-3 rounded-full bg-blue-100">{item.icon}</div>
                                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            

            {/* Bottom CTA Banner - REDUCED BLUE TINT */}
            <section
                className="relative py-10"
                style={{
                    backgroundImage: `url(${j})`,
                    backgroundSize: "cover", 
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center", 
                    height: "400px", 
                    width: "100%", 
                }}
            >
                {/* FIX: Reduced Blue Tint from bg-opacity-70 to bg-opacity-40 */}
                <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
                <div className="relative container mx-auto px-6 text-center h-full flex flex-col items-center justify-center">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 md:mb-10 max-w-2xl" style={textShadowStyle}>
                        Ready to stop your leaks? Get a FREE estimate today!
                    </h3>
                    <Link
                        to="/contact"
                        className="bg-orange-500 text-white font-extrabold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl inline-flex items-center"
                    >
                        Contact Us Now
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default Home;