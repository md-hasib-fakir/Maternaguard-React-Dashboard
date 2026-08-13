import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd } from 'react-icons/fa';

const SidebarPatient = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-600">Maternaguard</h1>
      </div>
      <nav className="mt-6 space-y-1">
        <Link to="/patient-dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>
        
        {/* নতুন লিংক যুক্ত করা হলো */}
        <Link to="/find-doctor" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
          <FaUserMd className="mr-3" /> Find Doctor
        </Link>
      </nav>
    </div>
  );
};

export default SidebarPatient;