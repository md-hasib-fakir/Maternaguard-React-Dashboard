import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {}
      <div className="w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
