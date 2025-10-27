

//     return (
//         <div className={`min-h-screen font-sans overflow-x-hidden bg-gradient-to-b from-white to-neutral-50`}>
            
//             {/* Hero Section */}
//             <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
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
//                                 {/* Image Overlay: Darker/Charcoal Overlay */}
//                                 <div className={`absolute inset-0 bg-[${customColors.charcoal}] bg-opacity-40`}></div> 
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* Unified Global Text Overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 md:px-6 z-30"> 
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
                        
//                         <motion.div 
//                             whileHover={{ scale: 1.05 }} 
//                             whileTap={{ scale: 0.95 }} 
//                             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                             className="inline-block"
//                         >
//                             <Link
//                                 to="/contact"
//                                 className={`bg-copper-600 text-white font-extrabold tracking-wide py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl hover:bg-copper-700 transition-all duration-300 shadow-2xl uppercase inline-flex items-center justify-center min-w-[280px]`}
//                             >
//                                 <FaHandsHelping className="inline mr-3 text-xl sm:text-2xl" /> Book FREE Inspection
//                             </Link>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Separator for Visual Hierarchy */}
//             <hr className={`my-0 border-t-8 border-copper-600 w-full mx-auto opacity-70`} />

//             {/* Services Section - PREMIUM CARD STYLE */}
//             <section className={`py-24 bg-gradient-to-b from-neutral-50 to-white`}>
//                 <div className="container mx-auto px-6">
//                     <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className={`text-4xl font-bold text-center mb-16 ${PRIMARY_TEXT_CLASS} border-b-4 border-neutral-300 inline-block mx-auto pb-2`}>
//                         Our Comprehensive Waterproofing Services
//                     </motion.h2>

//                     {loading && <div className="text-center text-lg text-gray-600">Loading expert services...</div>}
//                     {error && <div className="text-center text-red-600 text-lg p-4 bg-red-100 rounded-lg">{error}</div>}

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {services.length > 0
//                             ? services.slice(0, 6).map((service) => (
//                                     <motion.div
//                                         key={service._id}
//                                         initial={{ opacity: 0, scale: 0.95 }}
//                                         whileInView={{ opacity: 1, scale: 1 }}
//                                         viewport={{ once: true, amount: 0.1 }}
//                                         transition={{ duration: 0.4 }}
//                                         whileHover={{ scale: 1.03, boxShadow: "0 15px 35px -8px rgba(0, 0, 0, 0.15)" }}
//                                         className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden group relative"
//                                     >
//                                         <Link to={`/services/${service._id}`} className="block">
                                            
//                                             {/* Top Accent Bar */}
//                                             <div className={`h-2 bg-copper-600 absolute top-0 left-0 right-0 z-10`}></div>
                                            
//                                             {/* Sticky Icon - Premium feel with softer color hover */}
//                                             <div className={`absolute top-0 right-0 m-6 p-3 bg-charcoal-900 rounded-full shadow-xl group-hover:bg-copper-600 transition-colors z-20`}>
//                                                 {getServiceIcon(service.name)}
//                                             </div>
                                            
//                                             <motion.img
//                                                 src={service.imageUrl || a}
//                                                 alt={service.name}
//                                                 className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                                             />
//                                             <div className="p-6 pt-4">
//                                                 <h3 className={`text-xl font-extrabold ${PRIMARY_TEXT_CLASS} mb-2 group-hover:text-copper-600 transition-colors`}>{service.name}</h3>
//                                                 {/* FIX: Increased description length from 120 to 160 */}
//                                                 <p className="text-gray-600 mb-4 text-sm leading-relaxed min-h-[4rem]">{service.description ? service.description.substring(0, 160) + (service.description.length > 160 ? "..." : "") : "Description of this premium waterproofing service."}</p>
//                                                 <span className={`mt-2 inline-block font-bold ${ACCENT_CLASS} flex items-center text-sm`}>
//                                                     Explore Solution <FaAngleRight className="ml-2 transition-transform group-hover:translate-x-1" />
//                                                 </span>
//                                             </div>
//                                         </Link>
//                                     </motion.div>
//                                 ))
//                             : !loading && <p className="col-span-full text-center text-gray-700 bg-neutral-100 p-6 rounded-lg">No services found in the database. Please check your API connection.</p>}
//                     </div>

//                     <div className="text-center mt-16">
//                         <Link
//                             to="/services"
//                             className={`text-lg font-bold text-white bg-charcoal-800 py-3 px-8 rounded-lg hover:bg-copper-600 transition-all shadow-xl`}
//                         >
//                             View All Services →
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             <Products/>

//             {/* Informational Slides with Background Images - Reduced Tint */}
//             <section className="py-24 bg-neutral-100">
//                 <div className="container mx-auto px-6">
//                     <h2 className={`text-4xl font-bold text-center mb-16 ${PRIMARY_TEXT_CLASS}`}>
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
//                                     className="relative rounded-2xl shadow-xl flex flex-col items-center text-center h-[450px] overflow-hidden transition-all group"
//                                 >
//                                     {/* Background Image for Informational Slide */}
//                                     <div
//                                         className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
//                                         style={{ backgroundImage: `url(${slide.imageUrl || d})` }}
//                                     >
//                                         {/* FIX: Reduced Dark Tint (Charcoal) for a clearer image */}
//                                         <div className={`absolute inset-0 bg-[${customColors.charcoal}] bg-opacity-25 transition-opacity group-hover:bg-opacity-35`}></div>
//                                     </div>

//                                     <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8">
//                                         <div className={`bg-copper-600 p-4 rounded-full mb-6 inline-block shadow-lg group-hover:bg-charcoal-700 transition-colors`}>
//                                             {slide.icon}
//                                         </div>
//                                         <h3 className="text-2xl font-semibold mb-4 text-white" style={textShadowStyle}>{slide.title}</h3>
//                                         <p className="text-base mb-6 text-gray-200">{slide.text}</p>
//                                         <Link
//                                             to="/contact"
//                                             className={`mt-auto text-white hover:${ACCENT_CLASS} font-bold text-base flex items-center transition-colors border-b-2 border-white hover:border-copper-600`}
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


//             {/* Why Choose Us - Streamlined and Premium Look */}
//             <section className={`py-24 bg-white`}>
//                 <div className="container mx-auto px-6">
//                     <h2 className={`text-4xl font-bold text-center mb-16 ${PRIMARY_TEXT_CLASS}`}>Why Choose Daksh Waterproofing?</h2>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {extraSection.map((item) => (
//                             <motion.div
//                                 key={item.id}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true, amount: 0.3 }}
//                                 transition={{ duration: 0.6, delay: item.id * 0.1 }}
//                                 whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}


// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaWrench, FaShieldAlt, FaHandsHelping, FaMapMarkerAlt, FaWater, FaHome, FaAngleRight, FaFlask, FaTools, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import Products from "../components/Products";
import Clients from "../components/Clients";
import Typewriter from "typewriter-effect";

import a from "../assets/a.jpg";
import b from "../assets/b.jpg";
import c from "../assets/c.jpg";
import d from "../assets/d.jpg";
import f from "../assets/f.jpg";
import g from "../assets/g.jpg";
import h from "../assets/h.jpg";
import i from "../assets/i.jpg";
import j from "../assets/j.jpg";

import axios from "../api/axiosInstance";

// small text-shadow for hero headline
const textShadowStyle = {
  textShadow: "0 4px 26px rgba(13,26,40,0.35)",
};

// icon map
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
  // state to toggle long description on each card
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // small UX delay for smoothness
        await new Promise((r) => setTimeout(r, 300));
        const { data } = await axios.get("/services");
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getServiceIcon = (serviceName) => {
    const key = (serviceName || "").toLowerCase().trim();
    const IconComponent = serviceIconMap[key] || FaWrench;
    return <IconComponent className="text-2xl text-white" />;
  };

  const heroSlides = [{ url: a }, { url: b }, { url: c }, { url: d }];

  const informationalSlides = [
    {
      id: 1,
      title: "Terrace Waterproofing",
      text: "Prevent water seepage with multi-layer polymer coatings. Long-lasting protection against elements.",
      icon: <FaShieldAlt className="text-3xl text-white" />,
      imageUrl: f,
    },
    {
      id: 2,
      title: "Basement Damp Proofing",
      text: "Advanced chemical injection for permanent damp and leak solutions. Restore structural integrity.",
      icon: <FaWrench className="text-3xl text-white" />,
      imageUrl: g,
    },
    {
      id: 3,
      title: "Bathroom & Kitchen Sealing",
      text: "High-grade epoxy and cementitious solutions for wet areas. Prevent mold and water damage.",
      icon: <FaHandsHelping className="text-3xl text-white" />,
      imageUrl: h,
    },
    {
      id: 4,
      title: "Exterior Wall Waterproofing",
      text: "Protective coatings for external walls to prevent rain penetration.",
      icon: <FaHome className="text-3xl text-white" />,
      imageUrl: i,
    },
  ];

  // subtle animations
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const toggleExpand = (id) => {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-white">
      {/* HERO */}
      <section className="relative h-[75vh] md:h-[78vh] overflow-hidden">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="absolute inset-0 w-full h-full"
        >
          {heroSlides.map((s, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="h-full w-full bg-center bg-cover"
                style={{ backgroundImage: `url(${s.url})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 z-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl w-full text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
              style={textShadowStyle}
            >
              <Typewriter
                options={{
                  strings: ["Expert Waterproofing Solutions", "Protect. Seal. Strengthen.", "Guaranteed Leak Repair"],
                  autoStart: true,
                  loop: true,
                  delay: 55,
                  deleteSpeed: 35,
                }}
              />
            </h1>

            <p className="text-sm sm:text-lg md:text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Stop leaks and protect your property with <strong>Daksh Waterproofing</strong>. Serving Delhi, Noida &
              Gurgaon with long-lasting, guaranteed waterproofing solutions.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#ff7a3d] hover:bg-[#ff6a24] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
              >
                <FaHandsHelping /> Book Free Inspection
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-5 rounded-full transition"
              >
                View Services <FaAngleRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* subtle accent divider */}
      <div className="w-full flex justify-center -mt-6">
        <div className="h-1 w-36 rounded-full bg-gradient-to-r from-[#ff7a3d] to-[#f59e0b] opacity-95 shadow-sm"></div>
      </div>

      {/* SERVICES */}
    {/* SERVICES */}
<section className="py-16 bg-white overflow-hidden">
  <div className="container mx-auto px-6">
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10"
    >
      Our Waterproofing Services
    </motion.h2>

    {loading && (
      <div className="text-center text-slate-600 py-12">
        Loading expert services...
      </div>
    )}
    {error && (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        {error}
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.length > 0 ? (
        services.slice(0, 6).map((service) => {
          const isExpanded = !!expanded[service._id];
          return (
            <motion.article
              key={service._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                translateY: -6,
                boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
              }}
              className="relative bg-white rounded-xl shadow-md overflow-hidden border border-slate-100"
            >
              <Link to={`/services/${service._id}`} className="block">
                <div className="relative">
                  <img
                    src={service.imageUrl || a}
                    alt={service.name}
                    className="w-full h-48 md:h-52 object-cover"
                  />
                  {/* Floating circular icon */}
                  <div className="absolute top-3 left-3 bg-white/90 rounded-full p-2 shadow-md border border-slate-100">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0f172a] text-white">
                      {getServiceIcon(service.name)}
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                    {service.name}
                  </h3>
                  <p
                    className="text-sm text-slate-600 mb-6"
                    style={{ lineHeight: 1.5 }}
                  >
                    {service.description ? (
                      <>
                        {isExpanded
                          ? service.description
                          : service.description.slice(0, 150)}
                        {service.description.length > 150 && !isExpanded && "..."}
                      </>
                    ) : (
                      "Professional waterproofing services using proven materials and skilled applicators."
                    )}
                  </p>

        <Link
  to={`/services/${service._id}`}
  className="relative inline-block overflow-hidden rounded-full px-6 py-2 text-white font-semibold shadow water-wave-btn"
  onClick={(e) => {
    const target = e.currentTarget;
    target.classList.add("active");
    setTimeout(() => {
      if (document.body.contains(target)) {
        target.classList.remove("active");
      }
    }, 800);
  }}
>
  <span className="relative z-10">Book Now</span>
  <div className="wave"></div>
</Link>


                </div>
              </Link>
            </motion.article>
          );
        })
      ) : (
        !loading && (
          <div className="col-span-full text-center text-slate-600 p-8 bg-slate-50 rounded-lg">
            No services found — please check your API or add services in the admin.
          </div>
        )
      )}
    </div>

    <div className="text-center mt-12">
      <Link
        to="/services"
        className="inline-block bg-[#0b5cff] text-white px-6 py-3 rounded-lg shadow hover:bg-[#094ed1] transition"
      >
        View All Services
      </Link>
    </div>
  </div>

  {/* Inline CSS for Water Wave Button */}
  <style>{`
    .water-wave-btn {
      background: linear-gradient(90deg, #00bfff, #0077ff);
      position: relative;
      transition: all 0.3s ease;
    }

    .water-wave-btn .wave {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
      pointer-events: none;
      transition: all 0.6s ease;
    }

    .water-wave-btn.active .wave {
      height: 200%;
      transform: scale(2.5);
      opacity: 1;
      animation: rippleFlow 0.8s linear;
    }

    @keyframes rippleFlow {
      0% {
        transform: scale(0);
        opacity: 0.7;
      }
      100% {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `}</style>
</section>


      {/* Products (strip of applicators) */}
      <Products />

      {/* Informational Slider */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8">
            Common Problems & Solutions
          </h2>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={18}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {informationalSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-md border border-slate-100 h-[420px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.imageUrl || d})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40"></div>
                  </div>

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-[#0b5cff] text-white flex items-center justify-center mb-4 shadow">
                      {slide.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{slide.title}</h3>
                    <p className="text-sm text-white/90 mb-6 flex-1">{slide.text}</p>

                    <div className="mt-auto">
                      <Link to="/contact" className="text-sm font-semibold text-[#ff7a3d] hover:underline">
                        Get a Quote <FaAngleRight className="inline ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Value grid */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                icon: <FaWater className="text-3xl text-[#0b5cff]" />,
                title: "Moisture Barrier",
                text: "Advanced sealants and tested techniques to protect walls and floors from moisture.",
              },
              {
                id: 2,
                icon: <FaHome className="text-3xl text-[#0b5cff]" />,
                title: "Structural Safety",
                text: "Solutions that maintain structural integrity and extend the life of your property.",
              },
              {
                id: 3,
                icon: <FaMapMarkerAlt className="text-3xl text-[#0b5cff]" />,
                title: "Local Experts",
                text: "Serving Delhi NCR with rapid response teams and strong local knowledge.",
              },
            ].map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="bg-slate-50 border border-slate-100 rounded-lg p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients strip */}
      <Clients />

      {/* CTA banner */}
      <section
        className="relative py-14"
        style={{
          backgroundImage: `url(${j})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/45"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to stop your leaks? Get a free estimate today.
          </h3>
          <Link
            to="/contact"
            className="inline-block bg-[#ff7a3d] hover:bg-[#ff6a24] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
