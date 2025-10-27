
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaTimes, FaUserCircle, FaAngleRight } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
// import logo from '../assets/logo.png';

// const navItems = [
//   { name: 'Home', path: '/' },
//   { name: 'Services', path: '/services', title: 'Waterproofing Services' },
//   { name: 'About Us', path: '/about' },
//   { name: 'Contact Us', path: '/contact' },
// ];

// const Navbar = () => {
//   const { userInfo, logout, isAdmin } = useAuth();
//   const location = useLocation();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const headerClasses = isScrolled
//     ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md text-gray-800'
//     : 'bg-blue-900 text-white shadow-lg';

//   const menuVariants = {
//     hidden: { opacity: 0, x: '100%' },
//     visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
//     exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
//   };

//   return (
//     <motion.header
//       initial={false}
//       animate={{}}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
//     >
//       <nav className="container mx-auto flex justify-between items-center p-4 md:px-6">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Daksh Waterproofing Solutions" className="h-10 md:h-12 w-auto mr-2" />
//           <span className={`font-bold text-xl md:text-2xl ${isScrolled ? 'text-blue-800' : 'text-white'}`}>
//             Daksh <span className="text-orange-500">WPS</span>
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 items-center text-lg font-medium relative">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`relative transition-colors duration-300 ${
//                   isScrolled ? 'text-blue-800 hover:text-orange-500' : 'text-white hover:text-orange-500'
//                 }`}
//                 title={item.title || item.name}
//               >
//                 {item.name}
//                 {/* Active underline */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="underline"
//                     className="absolute bottom-0 left-0 h-1 bg-orange-500 rounded-full"
//                     style={{ width: '100%' }}
//                   />
//                 )}
//               </Link>
//             );
//           })}
//           {isAdmin && (
//             <Link
//               to="/admin"
//               className={`font-bold transition-colors duration-300 ${
//                 isScrolled ? 'text-red-600 hover:text-red-500' : 'text-red-400 hover:text-red-500'
//               }`}
//             >
//               Admin
//             </Link>
//           )}
//         </div>

//         {/* Auth/Profile Desktop */}
//         <div className="hidden md:flex items-center space-x-4">
//           {userInfo ? (
//             <div className="relative group">
//               <span className={`cursor-pointer font-semibold flex items-center ${isScrolled ? 'text-blue-700' : 'text-white'}`}>
//                 <FaUserCircle className="mr-2 text-xl" /> Hi, {userInfo?.name?.split(' ')[0] || 'User'}
//               </span>
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                 <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors">Profile</Link>
//                 <button onClick={logout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <Link className={`font-semibold transition-colors duration-300 ${isScrolled ? 'text-blue-800 hover:text-orange-500' : 'text-white hover:text-orange-500'}`} to="/login">
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors transform hover:scale-105"
//               >
//                 Book Now
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={toggleMenu}
//           className={`md:hidden text-2xl focus:outline-none z-50 ${isScrolled ? 'text-blue-800' : 'text-white'}`}
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             variants={menuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 md:hidden z-40 overflow-y-auto"
//           >
//             <div className="mt-12 space-y-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={toggleMenu}
//                   className="block text-xl font-semibold text-gray-800 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors flex justify-between items-center"
//                 >
//                   {item.name} <FaAngleRight className="text-blue-500" />
//                 </Link>
//               ))}
//               {isAdmin && (
//                 <Link
//                   to="/admin"
//                   onClick={toggleMenu}
//                   className="block text-xl font-bold text-red-600 py-3 border-b border-gray-100 hover:bg-red-50 transition-colors flex justify-between items-center"
//                 >
//                   Admin <FaAngleRight />
//                 </Link>
//               )}
//               <div className="pt-6 border-t mt-6 space-y-4">
//                 {userInfo ? (
//                   <>
//                     <div className="text-xl font-semibold text-blue-700 flex items-center">
//                       <FaUserCircle className="mr-2" /> {userInfo?.name?.split(' ')[0] || 'User'}
//                     </div>
//                     <Link to="/profile" onClick={toggleMenu} className="block text-lg text-gray-700 hover:text-orange-500">Profile</Link>
//                     <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-left text-lg text-red-600 hover:text-red-800">Logout</button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login" onClick={toggleMenu} className="block text-lg text-blue-700 hover:text-orange-500">
//                       Login
//                     </Link>
//                     <Link
//                       to="/signup"
//                       onClick={toggleMenu}
//                       className="block w-full text-center bg-orange-500 text-white px-5 py-3 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors mt-4"
//                     >
//                       Get a Free Quote
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle, FaAngleRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services", title: "Waterproofing Services" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const { userInfo, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerClasses = isScrolled
    ? "bg-white/90 backdrop-blur-md shadow-md text-gray-800"
    : "bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg";

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      initial={false}
      animate={{}}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${headerClasses}`}
    >
      <nav className="container mx-auto flex justify-between items-center p-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Daksh Waterproofing Solutions"
            className="h-10 md:h-12 w-auto mr-2"
          />
          <span
            className={`font-bold text-xl md:text-2xl ${
              isScrolled ? "text-blue-800" : "text-white"
            }`}
          >
            Daksh <span className="text-orange-500">WPS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-lg font-medium relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative transition-colors duration-300 ${
                  isScrolled
                    ? "text-blue-800 hover:text-orange-500"
                    : "text-white hover:text-orange-400"
                }`}
                title={item.title || item.name}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-1 bg-orange-500 rounded-full"
                    style={{ width: "100%" }}
                  />
                )}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              to="/admin"
              className={`font-bold ${
                isScrolled
                  ? "text-red-600 hover:text-red-500"
                  : "text-red-400 hover:text-red-500"
              }`}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Auth/Profile Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {userInfo ? (
            <div className="relative group">
              <span
                className={`cursor-pointer font-semibold flex items-center ${
                  isScrolled ? "text-blue-700" : "text-white"
                }`}
              >
                <FaUserCircle className="mr-2 text-xl" /> Hi,{" "}
                {userInfo?.name?.split(" ")[0] || "User"}
              </span>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                className={`font-semibold transition-colors duration-300 ${
                  isScrolled
                    ? "text-blue-800 hover:text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
                to="/login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-3xl focus:outline-none fixed top-5 right-5 z-[150] transition-colors ${
            isScrolled ? "text-blue-800" : "text-white"
          }`}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-full max-w-sm bg-gradient-to-b from-white via-blue-50 to-blue-100 shadow-2xl p-6 md:hidden z-[120] overflow-y-auto backdrop-blur-md"
          >
            <div className="mt-20 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={toggleMenu}
                  className="block text-xl font-semibold text-gray-800 py-3 border-b border-gray-200 hover:bg-blue-100 transition-colors flex justify-between items-center"
                >
                  {item.name} <FaAngleRight className="text-blue-600" />
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="block text-xl font-bold text-red-600 py-3 border-b border-gray-200 hover:bg-red-100 transition-colors flex justify-between items-center"
                >
                  Admin <FaAngleRight />
                </Link>
              )}

              <div className="pt-6 border-t mt-6 space-y-4">
                {userInfo ? (
                  <>
                    <div className="text-xl font-semibold text-blue-700 flex items-center">
                      <FaUserCircle className="mr-2" />{" "}
                      {userInfo?.name?.split(" ")[0] || "User"}
                    </div>
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className="block text-lg text-gray-700 hover:text-orange-500"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="w-full text-left text-lg text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="block text-lg text-blue-700 hover:text-orange-500"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={toggleMenu}
                      className="block w-full text-center bg-orange-500 text-white px-5 py-3 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors mt-4"
                    >
                      Get a Free Quote
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
