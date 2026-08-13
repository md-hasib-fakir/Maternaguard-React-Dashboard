import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUser } from 'react-icons/fa';

const LoginSelector = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Maternaguard</h1>
          <p className="text-lg text-gray-600">Maternal Health Monitoring System</p>
          <p className="text-sm text-indigo-600 font-medium mt-2">Please select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ডাক্তারের জন্য লিংক - লগইন পৃষ্ঠায় যাবে */}
          <Link 
            to="/doctor-login" 
            className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-500 flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaUserMd className="w-12 h-12 text-indigo-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Doctor / Admin</h3>
            <p className="text-gray-500 text-center">View all patients, monitor vitals, and manage alerts</p>
          </Link>

          {/* পেশেন্টের জন্য লিংক - এখানে পরিবর্তন করা হয়েছে: /patient-login-এ যাবে */}
          <Link 
            to="/patient-login" 
            className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500 flex flex-col items-center justify-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
              <FaUser className="w-12 h-12 text-green-600 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Patient</h3>
            <p className="text-gray-500 text-center">Login to view your personal health dashboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;