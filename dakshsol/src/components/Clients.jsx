// import React from "react";
// import { motion } from "framer-motion";

// import c1 from "../assets/c1.png";
// import c2 from "../assets/c2.png";
// import c3 from "../assets/c3.png";
// import c4 from "../assets/c4.png";
// import c5 from "../assets/c5.png";
// import c6 from "../assets/c6.png";

// const Clients = () => {
//   const logos = [c1, c2, c3, c4, c5, c6];

//   return (
//     <section
//       className="relative w-full py-12 bg-gradient-to-r from-[#f5f9ff] to-[#ffffff] overflow-hidden"
//       style={{
//         boxShadow: "inset 0 1px 0 rgba(0,0,0,0.05), inset 0 -1px 0 rgba(0,0,0,0.05)",
//       }}
//     >
//       <h2 className="text-center text-2xl md:text-3xl font-bold text-[#1f4e79] mb-10 tracking-tight">
//         Trusted by Our Valued Clients
//       </h2>

//       {/* Gradient fade edges */}
//       <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#f5f9ff] to-transparent pointer-events-none z-10" />
//       <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#f5f9ff] to-transparent pointer-events-none z-10" />

//       <div className="overflow-hidden w-full">
//         {/* Continuous motion line */}
//         <motion.div
//           className="flex items-center gap-16"
//           animate={{ x: ["0%", "-100%"] }}
//           transition={{
//             ease: "linear",
//             duration: 30,
//             repeat: Infinity,
//           }}
//           style={{ width: "max-content" }}
//         >
//           {[...logos, ...logos, ...logos].map((logo, i) => (
//             <div
//               key={i}
//               className="flex-shrink-0 flex items-center justify-center"
//               style={{
//                 width: "180px",
//                 height: "90px",
//               }}
//             >
//               <img
//                 src={logo}
//                 alt={`Client ${i + 1}`}
//                 className="max-h-[80px] max-w-[160px] object-contain opacity-90 hover:opacity-100 transition-all duration-300"
//                 draggable="false"
//               />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Clients;

// import React from "react";
// import { motion } from "framer-motion";

// // Import your client logos
// import c1 from "../assets/c1.png";
// import c2 from "../assets/c2.png";
// import c3 from "../assets/c3.png";
// import c4 from "../assets/c4.png";
// import c5 from "../assets/c5.png";
// import c6 from "../assets/c6.png";

// // Define the core set of logos
// const logos = [c1, c2, c3, c4, c5, c6];

// // Duplicate the logos multiple times for a smoother, longer-looking loop
// // We'll use 3 sets: [set1, set2, set3]
// const allLogos = [...logos, ...logos, ...logos];

// // Animation for continuous scroll
// const marqueeVariants = {
//   animate: {
//     // We are scrolling 1/3 of the total width (-33.333%) to move one set of logos off-screen
//     x: ["0%", "-33.333%"], 
//     transition: {
//       x: {
//         ease: "linear",
//         duration: 35, // Adjust duration for speed
//         repeat: Infinity,
//       },
//     },
//   },
// };

// // Animation for a hover-effect on individual logos
// const logoHoverVariants = {
//   hover: {
//     scale: 1.1,
//     boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
//     transition: { duration: 0.2 },
//   },
// };

// const Clients = () => {
//   return (
//     <section className="w-full bg-gradient-to-r from-blue-50 to-white py-12 overflow-hidden">
//       <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
//         Trusted by Our Valued Clients 🤝
//       </h2>
      
//       {/* Outer container for the marquee: It clips the content */}
//       <div className="relative w-full overflow-hidden">
        
//         {/* Scrolling row: This container holds all 3 sets of logos. 
//             w-[300%] is used because we have 3 sets of logos. If you used 2 sets, you'd use w-[200%] and animate to -100%. */}
//         <motion.div
//           className="flex items-center" 
//           variants={marqueeVariants}
//           animate="animate"
//           // Set the width to hold all 3 sets of logos to ensure a clean loop point
//           style={{ width: `${logos.length * 3 * (150)}px`, minWidth: '300%' }} // Adjust 150px as a rough estimate for logo + spacing width
//         >
//           {allLogos.map((logo, index) => (
//             // Individual logo container for animation and styling
//             <motion.div
//               key={index}
//               className="flex-shrink-0 mx-4 md:mx-6 p-2 bg-white rounded-lg transition-all duration-300" // Added padding and background for a lift effect
//               variants={logoHoverVariants}
//               whileHover="hover"
//             >
//               <img
//                 src={logo}
//                 alt={`Client ${index + 1}`}
//                 // w-auto and h-16/20 ensure a consistent size
//                 className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" 
//               />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
      
//       {/* --- */}
      
//       <div className="text-center mt-10 text-sm text-gray-500">
//           <p>Over a decade of successful partnerships.</p>
//       </div>
//     </section>
//   );
// };


// export default Clients;

import React from "react";
import { motion } from "framer-motion";

// Import your client logos
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";
import c5 from "../assets/c5.png";
import c6 from "../assets/c6.png";

// Define the core set of logos
const logos = [c1, c2, c3, c4, c5, c6];

// Duplicate the logos multiple times for a smoother, longer-looking loop
const allLogos = [...logos, ...logos, ...logos];

// Animation for continuous scroll
const marqueeVariants = {
  animate: {
    x: ["0%", "-33.333%"], 
    transition: {
      x: {
        ease: "linear",
        duration: 35, // Adjust duration for speed
        repeat: Infinity,
      },
    },
  },
};

// Animation for a hover-effect on individual logos (new effect)
const logoHoverVariants = {
  hover: {
    rotateY: 10, // Tilt slightly on the Y-axis
    rotateX: 5,  // Tilt slightly on the X-axis
    scale: 1.05, // Slightly enlarge
    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.15)", // More pronounced shadow
    transition: { duration: 0.3, ease: "easeOut" },
  },
  initial: {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.08)", // Default subtle shadow
  }
};

const Clients = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-white py-12 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 mb-10">
        Trusted by Our Valued Clients 🤝
      </h2>
      
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center" 
          variants={marqueeVariants}
          animate="animate"
          style={{ width: `${logos.length * 3 * (150)}px`, minWidth: '300%' }} // Adjust 150px as a rough estimate for logo + spacing width
        >
          {allLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 mx-4 md:mx-6 p-2 bg-white rounded-lg cursor-pointer" // Removed transition-all here as Framer Motion handles it
              variants={logoHoverVariants}
              initial="initial" // Set initial state for the hover variant
              whileHover="hover"
            >
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                // No grayscale or opacity change here, logos remain vibrant
                className="h-16 md:h-20 w-auto object-contain" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="text-center mt-10 text-sm text-gray-500">
          <p>Over a decade of successful partnerships.</p>
      </div>
    </section>
  );
};

export default Clients;