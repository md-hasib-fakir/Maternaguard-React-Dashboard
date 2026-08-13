import React from 'react';
import { useUser } from '@clerk/react-router';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { isSignedIn, user } = useUser();

  // নাম বের করার লজিক (Clerk থেকে)
  const displayName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || 'User';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-end items-center shadow-sm">
      {/* ডান পাশে আইকন এবং প্রোফাইল (বাম পাশের লোগো সরিয়ে ফেলা হয়েছে) */}
      <div className="flex items-center space-x-4">
        {/* নোটিফিকেশন আইকন */}
        <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-indigo-50">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* ইউজার প্রোফাইল (নাম + আইকন) */}
        {isSignedIn ? (
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {displayName} {/* এখানে ইমেইলের বদলে নাম আসবে */}
            </span>
            <FaUserCircle className="w-8 h-8 text-indigo-500 cursor-pointer hover:text-indigo-700 transition" />
          </div>
        ) : (
          <span className="text-sm text-gray-500">Not signed in</span>
        )}
      </div>
    </header>
  );
};

export default Header;