
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaTimes, FaUserCircle, FaAngleRight } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
// // Assuming the logo file path is correct based on your request
// import logo from '../assets/logo.png'; 

// // Define the content for the main navigation menu
// const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Services', path: '/services', title: 'Waterproofing Services' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact Us', path: '/contact' },
// ];

// const Navbar = () => {
//     const { userInfo, logout, isAdmin } = useAuth();
//     const location = useLocation();

//     // State for transparent/solid effect
//     const [isScrolled, setIsScrolled] = useState(false);
    
//     // State for mobile menu open/close
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     // --- Transparency/Scroll Effect Logic ---
//     useEffect(() => {
//         const handleScroll = () => {
//             // Check if the current path is the home page and if the scroll position is past 50px
//             const scrollThreshold = 50;
//             const currentScrolled = window.scrollY > scrollThreshold;
//             setIsScrolled(currentScrolled);
//         };

//         window.addEventListener('scroll', handleScroll);
//         handleScroll(); // Set initial state

//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [location.pathname]);

//     // --- Menu Toggle Function ---
//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//     // Dynamic classes for the Apple-style transparency effect
//     const headerClasses = isScrolled 
//         ? 'bg-white shadow-xl backdrop-blur-md bg-opacity-95' 
//         : 'bg-transparent shadow-md'; 

//     // Animation variants for the mobile menu
//     const menuVariants = {
//         hidden: { opacity: 0, x: "100%" },
//         visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
//         exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
//     };

//     return (
//         <motion.header 
//             initial={false}
//             animate={headerClasses}
//             transition={{ duration: 0.3 }}
//             className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
//         >
//             <nav className="container mx-auto flex justify-between items-center p-4">
//                 {/* Brand/Logo with Image */}
//                 <Link to="/" className="flex items-center" title="Daksh Waterproofing Solutions">
//                     <img src={logo} alt="Daksh WPS Logo" className="h-8 md:h-10 w-auto" />
//                 </Link>

//                 {/* Desktop Navigation Links */}
//                 <div className="hidden md:flex space-x-8 items-center text-lg font-medium">
//                     {navItems.map((item) => (
//                         <Link 
//                             key={item.name}
//                             to={item.path} 
//                             className={`hover:text-orange-500 transition-colors ${location.pathname === item.path ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}
//                             title={item.title || item.name}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                     {isAdmin && (
//                         <Link to="/admin" className="text-red-600 font-bold hover:text-red-800 transition-colors">Admin</Link>
//                     )}
//                 </div>

//                 {/* Auth/Profile Section & Book Now CTA (Desktop) */}
//                 <div className="hidden md:flex items-center space-x-4">
//                     {userInfo ? (
//                         <div className="relative group">
//                             <span className="cursor-pointer text-blue-700 font-semibold flex items-center">
//                                 <FaUserCircle className="mr-2 text-xl" /> Hi, {userInfo?.name?.split(' ')[0] || 'User'}
//                             </span>
//                             {/* Profile Dropdown Menu */}
//                             <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
//                                 <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors">Profile</Link>
//                                 <button onClick={logout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             <Link to="/login" className="text-blue-700 hover:text-orange-500 font-medium transition-colors">Login</Link>
//                             <Link to="/signup" className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors transform hover:scale-105">
//                                 Book Now
//                             </Link>
//                         </>
//                     )}
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <button 
//                     onClick={toggleMenu} 
//                     className="md:hidden text-2xl text-blue-800 focus:outline-none z-50"
//                     aria-label="Toggle mobile menu"
//                 >
//                     {isMenuOpen ? <FaTimes /> : <FaBars />}
//                 </button>
//             </nav>

//             {/* Mobile Menu (Off-Canvas with Animation) */}
//             <AnimatePresence>
//                 {isMenuOpen && (
//                     <motion.div
//                         variants={menuVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 md:hidden z-40 overflow-y-auto"
//                     >
//                         <div className="mt-12 space-y-4">
//                             {/* Navigation Links */}
//                             {navItems.map((item) => (
//                                 <Link
//                                     key={item.name}
//                                     to={item.path}
//                                     onClick={toggleMenu}
//                                     className="block text-xl font-semibold text-gray-800 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors flex justify-between items-center"
//                                 >
//                                     {item.name}
//                                     <FaAngleRight className="text-blue-500" />
//                                 </Link>
//                             ))}
//                             {isAdmin && (
//                                 <Link 
//                                     to="/admin" 
//                                     onClick={toggleMenu}
//                                     className="block text-xl font-bold text-red-600 py-3 border-b border-gray-100 hover:bg-red-50 transition-colors flex justify-between items-center"
//                                 >
//                                     Admin
//                                     <FaAngleRight />
//                                 </Link>
//                             )}

//                             {/* Auth/CTA Links (Mobile) */}
//                             <div className="pt-6 border-t mt-6 space-y-4">
//                                 {userInfo ? (
//                                     <>
//                                         <div className="text-xl font-semibold text-blue-700 flex items-center">
//                                             <FaUserCircle className="mr-2" /> {userInfo?.name?.split(' ')[0] || 'User'}
//                                         </div>
//                                         <Link to="/profile" onClick={toggleMenu} className="block text-lg text-gray-700 hover:text-orange-500">Profile</Link>
//                                         <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-left text-lg text-red-600 hover:text-red-800">Logout</button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Link 
//                                             to="/login" 
//                                             onClick={toggleMenu} 
//                                             className="block text-lg text-blue-700 hover:text-orange-500"
//                                         >
//                                             Login
//                                         </Link>
//                                         <Link 
//                                             to="/signup" 
//                                             onClick={toggleMenu} 
//                                             className="block w-full text-center bg-orange-500 text-white px-5 py-3 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors mt-4"
//                                         >
//                                             Get a Free Quote
//                                         </Link>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.header>
//     );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import logo from '../assets/logo.png';

// const Navbar = () => {
//   const { userInfo, logout, isAdmin } = useAuth();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
//         scrolled ? 'bg-white shadow-md' : 'bg-transparent'
//       }`}
//     >
//       <nav className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo} alt="Daksh Waterproofing Solutions" className="h-10 md:h-12 mr-2" />
//           <span className="text-2xl font-bold text-blue-800">Daksh <span className="text-orange-500">WPS</span></span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <Link to="/" className="nav-link hover:text-orange-500 transition-colors duration-300">Home</Link>
//           <Link to="/services" className="nav-link hover:text-orange-500 transition-colors duration-300">Services</Link>
//           <Link to="/about" className="nav-link hover:text-orange-500 transition-colors duration-300">About Us</Link>
//           <Link to="/contact" className="nav-link hover:text-orange-500 transition-colors duration-300">Contact Us</Link>
//           {isAdmin && (
//             <Link to="/admin" className="nav-link text-red-600 font-bold hover:text-red-500 transition-colors">Admin</Link>
//           )}
//         </div>

//         {/* Auth/Profile */}
//         <div className="hidden md:flex items-center space-x-4">
//           {userInfo ? (
//             <div className="relative group">
//               <span className="cursor-pointer text-blue-700 font-semibold">
//                 Hi, {userInfo?.name?.split(' ')[0] || 'User'}
//               </span>
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
//                 <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="text-blue-700 hover:text-blue-900 hidden sm:block">Login</Link>
//               <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
//                 Book Now
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <FaTimes className="text-2xl text-blue-800" /> : <FaBars className="text-2xl text-blue-800" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md w-full px-6 py-4 flex flex-col space-y-4 animate-slide-down">
//           <Link to="/" className="text-blue-800 font-semibold hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
//           <Link to="/services" className="text-blue-800 font-semibold hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</Link>
//           <Link to="/about" className="text-blue-800 font-semibold hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
//           <Link to="/contact" className="text-blue-800 font-semibold hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
//           {isAdmin && (
//             <Link to="/admin" className="text-red-600 font-bold hover:text-red-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
//           )}
//           {!userInfo && (
//             <>
//               <Link to="/login" className="text-blue-700 hover:text-blue-900 font-semibold" onClick={() => setMobileMenuOpen(false)}>Login</Link>
//               <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center" onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
//             </>
//           )}
//         </div>
//       )}

//       {/* Animation for mobile menu */}
//       <style>
//         {`
//           .animate-slide-down {
//             animation: slideDown 0.3s ease forwards;
//           }
//           @keyframes slideDown {
//             0% { opacity: 0; transform: translateY(-20px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUserCircle, FaAngleRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', title: 'Waterproofing Services' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const { userInfo, logout, isAdmin } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerClasses = isScrolled
    ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md text-gray-800'
    : 'bg-blue-900 text-white shadow-lg';

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      initial={false}
      animate={{}}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
    >
      <nav className="container mx-auto flex justify-between items-center p-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Daksh Waterproofing Solutions" className="h-10 md:h-12 w-auto mr-2" />
          <span className={`font-bold text-xl md:text-2xl ${isScrolled ? 'text-blue-800' : 'text-white'}`}>
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
                  isScrolled ? 'text-blue-800 hover:text-orange-500' : 'text-white hover:text-orange-500'
                }`}
                title={item.title || item.name}
              >
                {item.name}
                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-1 bg-orange-500 rounded-full"
                    style={{ width: '100%' }}
                  />
                )}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              className={`font-bold transition-colors duration-300 ${
                isScrolled ? 'text-red-600 hover:text-red-500' : 'text-red-400 hover:text-red-500'
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
              <span className={`cursor-pointer font-semibold flex items-center ${isScrolled ? 'text-blue-700' : 'text-white'}`}>
                <FaUserCircle className="mr-2 text-xl" /> Hi, {userInfo?.name?.split(' ')[0] || 'User'}
              </span>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors">Profile</Link>
                <button onClick={logout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link className={`font-semibold transition-colors duration-300 ${isScrolled ? 'text-blue-800 hover:text-orange-500' : 'text-white hover:text-orange-500'}`} to="/login">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-600 transition-colors transform hover:scale-105"
              >
                Book Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`md:hidden text-2xl focus:outline-none z-50 ${isScrolled ? 'text-blue-800' : 'text-white'}`}
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
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 md:hidden z-40 overflow-y-auto"
          >
            <div className="mt-12 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={toggleMenu}
                  className="block text-xl font-semibold text-gray-800 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors flex justify-between items-center"
                >
                  {item.name} <FaAngleRight className="text-blue-500" />
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="block text-xl font-bold text-red-600 py-3 border-b border-gray-100 hover:bg-red-50 transition-colors flex justify-between items-center"
                >
                  Admin <FaAngleRight />
                </Link>
              )}
              <div className="pt-6 border-t mt-6 space-y-4">
                {userInfo ? (
                  <>
                    <div className="text-xl font-semibold text-blue-700 flex items-center">
                      <FaUserCircle className="mr-2" /> {userInfo?.name?.split(' ')[0] || 'User'}
                    </div>
                    <Link to="/profile" onClick={toggleMenu} className="block text-lg text-gray-700 hover:text-orange-500">Profile</Link>
                    <button onClick={() => { logout(); toggleMenu(); }} className="w-full text-left text-lg text-red-600 hover:text-red-800">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu} className="block text-lg text-blue-700 hover:text-orange-500">
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
