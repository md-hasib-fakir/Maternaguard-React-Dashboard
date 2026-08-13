import React from 'react';
import { ClerkProvider } from '@clerk/react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelector from './pages/LoginSelector';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Settings from './pages/Settings';
import PatientDashboard from './pages/PatientDashboard';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientLogin from './pages/PatientLogin';
import FindDoctor from './pages/FindDoctor';
import DoctorProfile from './pages/DoctorProfile';

const PUBLISHABLE_KEY = "pk_test_YXJyaXZpbmctaGFkZG9jay0zNS5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
  return (
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<LoginSelector />} />
          
          {/* ডাক্তারের জন্য রুট */}
          <Route path="/doctor-login" element={<DoctorLogin />} />
          
          {/* এখানে আমি সরাসরি DoctorDashboard রেন্ডার করেছি, যা Layout যোগ করবে */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          
          {/* ডাক্তারের জন্য পেশেন্ট লিস্ট এবং ডিটেইলস */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient/:id" element={<PatientDetails />} />
          
          {/* পেশেন্টের জন্য রুট */}
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          
          {/* সেটিংস */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ClerkProvider>
    </Router>
  );
}

export default App;