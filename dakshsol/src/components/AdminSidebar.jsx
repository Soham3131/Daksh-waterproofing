import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  
  const navItems = [
    { to: '/admin', name: 'Dashboard', icon: '📊' },
    { to: '/admin/bookings', name: 'Manage Bookings', icon: '🗓️' },
    { to: '/admin/services', name: 'Manage Services', icon: '🛠️' },
    // Add more admin features here (e.g., Users, Reports)
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col p-4 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-orange-400 border-b pb-3">Daksh Admin</h2>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end // Use 'end' for exact matching on the index route
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors 
                  ${isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'}`
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button 
        onClick={logout} 
        className="mt-8 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
      >
        <span>Exit Admin</span>
        <span>🚪</span>
      </button>
    </div>
  );
};

export default AdminSidebar;