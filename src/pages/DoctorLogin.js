import React from 'react';
import { SignIn } from '@clerk/react-router';

const DoctorLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doctor / Admin Login</h2>
          <p className="text-sm text-gray-500">Sign in to manage patients and monitor vitals</p>
        </div>
        {/* এখানে forceRedirectUrl যুক্ত করা হয়েছে যাতে লগইন পর ড্যাশবোর্ডে যায় */}
        <SignIn 
          routing="path" 
          path="/doctor-login" 
          forceRedirectUrl="/doctor-dashboard" 
        />
      </div>
    </div>
  );
};

export default DoctorLogin;