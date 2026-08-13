import React from 'react';
import SidebarPatient from './SidebarPatient';
import Header from './Header';

const LayoutPatient = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarPatient />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutPatient;