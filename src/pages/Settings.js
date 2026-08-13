import React from 'react';
import Layout from '../layout/Layout';

const Settings = () => {
  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700">Profile Information</h3>
            <p className="text-sm text-gray-500 mt-1">Update your name, email, and profile picture.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700">Notifications</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your alert preferences for High Risk patients.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;