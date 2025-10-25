// import React from 'react';
// import { Link } from 'react-router-dom';

// const About = () => {
//     return (
//         <div className="min-h-screen bg-gray-50 font-sans">
            
//             {/* Hero Banner: Company Focus */}
//             <section className="bg-indigo-700 text-white py-20 text-center shadow-lg">
//                 <div className="container mx-auto px-6">
//                     <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
//                         Protecting Your Assets, Building Trust
//                     </h1>
//                     <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto">
//                         We are **Daksh Waterproofing Solutions**, the leading experts in moisture control and structural preservation across Delhi, Noida, and Gurgaon.
//                     </p>
//                 </div>
//             </section>

//             {/* Core Story & Mission */}
//             <section className="py-16 container mx-auto px-6">
//                 <div className="grid md:grid-cols-2 gap-12 items-center">
//                     <div className="space-y-6">
//                         <span className="text-sm font-semibold uppercase text-indigo-600 tracking-wider">Our Mission</span>
//                         <h2 className="text-3xl font-bold text-gray-900">
//                             Pioneering Permanent Waterproofing Solutions
//                         </h2>
//                         <p className="text-gray-700 leading-relaxed">
//                             Founded on the principles of **Innovation, Integrity, and Guaranteed Satisfaction**, Daksh Waterproofing was created to eliminate the cycle of temporary fixes. We understand that water damage threatens the structural integrity and financial value of your property. Our mission is simple: to provide reliable, long-lasting, and non-invasive waterproofing solutions for every client, every time.
//                         </p>
//                         <p className="text-gray-700 leading-relaxed font-medium">
//                             We specialize in advanced techniques, including **polyurethane injection**, **cementitious waterproofing**, and **polymer coating systems**, ensuring we tackle leakage problems at the source.
//                         </p>
//                         <Link 
//                             to="/services" 
//                             className="inline-flex mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition duration-300 transform hover:scale-105"
//                         >
//                             Explore Our Services
//                             <span className="ml-2">→</span>
//                         </Link>
//                     </div>

//                     {/* Placeholder image for visual appeal */}
//                     <div className="h-full bg-gray-200 rounded-xl shadow-2xl p-6 flex items-center justify-center min-h-64">
//                         <p className="text-gray-500 text-center font-semibold text-xl">
                            
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             {/* Value Pillars (Inspired by Home Page) */}
//             <section className="bg-white py-16">
//                 <div className="container mx-auto px-6">
//                     <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
//                         The Daksh Difference
//                     </h2>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {/* Pillar 1: Expertise */}
//                         <PillarCard 
//                             icon="💡"
//                             title="Certified Expertise"
//                             description="Our team consists of certified engineers and trained applicators who adhere to the highest industry standards for quality and safety."
//                             color="blue"
//                         />
//                         {/* Pillar 2: Technology */}
//                         <PillarCard 
//                             icon="🧪"
//                             title="Advanced Technology"
//                             description="We utilize cutting-edge polymer and chemical technologies, guaranteeing solutions that are effective against even the toughest hydrostatic pressure."
//                             color="green"
//                         />
//                         {/* Pillar 3: Warranty */}
//                         <PillarCard 
//                             icon="🛡️"
//                             title="Solid Warranty"
//                             description="Every project is backed by a robust, written warranty. We don't just fix leaks; we guarantee dryness for years to come."
//                             color="orange"
//                         />
//                     </div>
//                 </div>
//             </section>

//             {/* Call to Action */}
//             <section className="py-12 bg-indigo-600 text-white text-center">
//                 <div className="container mx-auto px-6">
//                     <h3 className="text-3xl font-bold mb-4">
//                         Ready to Say Goodbye to Dampness?
//                     </h3>
//                     <p className="mb-6 text-lg">
//                         Contact us today for a free, no-obligation site inspection and expert consultation.
//                     </p>
//                     <Link 
//                         to="/services" 
//                         className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-xl"
//                     >
//                         Book Your Inspection
//                     </Link>
//                 </div>
//             </section>
//         </div>
//     );
// };

// // Reusable component for the value pillars
// const PillarCard = ({ icon, title, description, color }) => (
//     <div className="p-6 bg-gray-50 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-2xl transition duration-300">
//         <div className={`text-4xl mb-4 text-${color}-600`}>{icon}</div>
//         <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//     </div>
// );

// export default About;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCogs, FaCertificate, FaArrowRight } from 'react-icons/fa';

// Import the image specified by the user
import imageE from '../assets/e.jpg'; 

// --- Animation Configuration ---
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.7, ease: "easeOut" } 
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delay between children
        },
    },
};

// Reusable component for the value pillars with animation
const PillarCard = ({ icon: IconComponent, title, description, delay }) => (
    <motion.div 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay }}
        className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
    >
        <div className="text-4xl mb-4 text-orange-500">
            <IconComponent />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Hero Banner: Company Focus (Updated Colors) */}
            <motion.section 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="bg-blue-700 text-white py-20 text-center shadow-2xl"
            >
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        Protecting Your Assets, Building Trust
                    </h1>
                    <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto">
                        We are **Daksh Waterproofing Solutions**, the leading experts in moisture control and structural preservation across Delhi, Noida, and Gurgaon.
                    </p>
                </div>
            </motion.section>

            {/* Core Story, Mission & Image (Updated Layout and Animation) */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Column */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-6"
                    >
                        <span className="text-sm font-bold uppercase text-orange-500 tracking-wider border-b-2 border-blue-200 pb-1">Our Mission & Story</span>
                        <h2 className="text-4xl font-extrabold text-blue-900">
                            Pioneering Permanent Waterproofing Solutions
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Founded on the principles of **Innovation, Integrity, and Guaranteed Satisfaction**, Daksh Waterproofing was created to eliminate the cycle of temporary fixes. We understand that water damage threatens the structural integrity and financial value of your property. Our mission is simple: to provide reliable, long-lasting, and non-invasive waterproofing solutions for every client, every time.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-semibold">
                            We specialize in advanced techniques, including **polyurethane injection**, **cementitious waterproofing**, and **polymer coating systems**, ensuring we tackle leakage problems at the source with precision.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Link 
                                to="/services" 
                                className="inline-flex mt-4 items-center px-8 py-3 text-lg font-bold rounded-full shadow-lg text-white bg-orange-500 hover:bg-orange-600 transition duration-300"
                            >
                                Explore Our Services <FaArrowRight className="ml-3 text-base" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image Column (Using e.jpg) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                        className="p-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                    >
                        <img 
                            src={imageE} 
                            alt="Daksh Waterproofing expertise on site" 
                            className="w-full h-auto object-cover rounded-2xl"
                        />
                    </motion.div>
                </div>
            </section>
            
            <hr className="my-0 border-t border-gray-200 w-full mx-auto" />

            {/* Value Pillars (Animated) */}
            <section className="bg-blue-50 py-20">
                <div className="container mx-auto px-6">
                    <motion.h2 
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold text-center mb-16 text-blue-900"
                    >
                        The Daksh Difference: Our Commitments
                    </motion.h2>
                    <motion.div 
                        variants={staggerContainer} 
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-3 gap-10"
                    >
                        {/* Pillar 1: Expertise */}
                        <PillarCard 
                            icon={FaGraduationCap}
                            title="Certified Expertise"
                            description="Our team consists of certified engineers and trained applicators who adhere to the highest industry standards for quality and safety."
                            delay={0.1}
                        />
                        {/* Pillar 2: Technology */}
                        <PillarCard 
                            icon={FaCogs}
                            title="Advanced Technology"
                            description="We utilize cutting-edge polymer and chemical technologies, guaranteeing solutions that are effective against the toughest hydrostatic pressure."
                            delay={0.3}
                        />
                        {/* Pillar 3: Warranty */}
                        <PillarCard 
                            icon={FaCertificate}
                            title="Iron-Clad Warranty"
                            description="Every project is backed by a robust, written warranty. We don't just fix leaks; we guarantee dryness for years to come."
                            delay={0.5}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Call to Action (Updated Colors and Design) */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-16 bg-blue-600 text-white text-center shadow-inner"
            >
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold mb-4">
                        Ready to Say Goodbye to Dampness?
                    </h3>
                    <p className="mb-8 text-xl font-light">
                        Contact us today for a free, no-obligation site inspection and expert consultation.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link 
                            to="/contact" 
                            className="bg-orange-500 text-white font-extrabold py-4 px-10 rounded-full text-xl hover:bg-orange-600 transition duration-300 shadow-2xl inline-flex items-center"
                        >
                            Book Your FREE Inspection <FaArrowRight className="ml-3 text-base" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;