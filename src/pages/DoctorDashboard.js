import React from 'react';
import { useUser } from '@clerk/react-router';
import { Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from './Dashboard';

const DoctorDashboard = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 font-medium">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/doctor-login" replace />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DoctorDashboard;