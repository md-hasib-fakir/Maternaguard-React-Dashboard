import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCog, FaUserMd } from 'react-icons/fa'; // FaUserMd যোগ করা হয়েছে

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-600">Maternaguard</h1>
      </div>
      <nav className="mt-6 space-y-1">
        <Link to="/doctor-dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>
        
        {/* নতুন ডাক্তার প্রোফাইল মেনু */}
        <Link to="/doctor-profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaUserMd className="mr-3" /> Profile
        </Link>

        <Link to="/patients" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaUser className="mr-3" /> Patients
        </Link>
        <Link to="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaCog className="mr-3" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;