import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/react-router';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue, set } from 'firebase/database'; 
import LayoutPatient from '../layout/LayoutPatient';
import StatsCard from '../components/StatsCard';
import RiskStatusCard from '../components/RiskStatusCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';
import { FaHeart, FaLungs, FaThermometerHalf, FaWalking, FaSignOutAlt, FaUser, FaPhone, FaBaby, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// 🔥 ML API কল করার ফাংশন
const predictRisk = async (heartRate, spo2, temperature) => {
  try {
    const response = await fetch('https://maternaguard-api.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heartRate, spo2, temperature })
    });
    const data = await response.json();
    return data.riskLevel; // 'Low', 'Mid', বা 'High'
  } catch (error) {
    console.error('ML API Error:', error);
    return 'Low'; // API ফেইল করলে ডিফল্ট Low
  }
};

const PatientDashboard = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [liveData, setLiveData] = useState({
    heartRate: 86,
    spo2: 98,
    temperature: 98.4,
    movement: 4.2,
    riskLevel: 'low'
  });

  const [profile, setProfile] = useState({
    name: 'Rokeya Begum',
    age: 28,
    pregnancyMonths: 7,
    emergencyContact: '+880 1712 345 678',
    relation: 'Husband'
  });

  const [editForm, setEditForm] = useState({ ...profile });

  // 🔥 ফিক্স করা useEffect (০ হ্যান্ডেল করা এবং সঠিক ডেটা ম্যাপিং)
  useEffect(() => {
    const dbRef = ref(db, 'patients/patient_1/latest'); 
    const unsubscribe = onValue(dbRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("🔥 Firebase Data:", data);

        // 🔥 ফিক্স: ০ বা null আসলে ডেমো ডেটা দেখাবে, ০ কখনোই দেখাবে না
        setLiveData({
          heartRate: (data.HeartRate > 0) ? data.HeartRate : (data.heartRate > 0 ? data.heartRate : 86),
          spo2: (data.SpO2 > 0) ? data.SpO2 : (data.spo2 > 0 ? data.spo2 : 98),
          temperature: data.BodyTemp || data.temperature || 98.4,
          movement: data.Movement || data.movement || 4.2,
          riskLevel: data.riskLevel || 'low'
        });

        // 🔥 ML API কল (শুধুমাত্র তখনই কল হবে যখন ০ এর বেশি ডেটা থাকবে)
        const hr = data.HeartRate > 0 ? data.HeartRate : (data.heartRate > 0 ? data.heartRate : 0);
        const spo = data.SpO2 > 0 ? data.SpO2 : (data.spo2 > 0 ? data.spo2 : 0);
        const temp = data.BodyTemp || data.temperature || 0;
        
        if (hr > 0 && spo > 0 && temp > 0) {
          const predictedRisk = await predictRisk(hr, spo, temp);
          setLiveData(prev => ({ ...prev, riskLevel: predictedRisk }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setEditForm({ ...profile });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 font-medium">Loading your dashboard...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    navigate('/patient-login');
    return null;
  }

  const handleLogout = () => {
    navigate('/patient-login');
  };

  const stats = [
    { title: 'Heart Rate', value: liveData.heartRate, unit: 'bpm', icon: FaHeart, color: 'text-red-500', bgColor: 'bg-red-50' },
    { title: 'SpO2', value: liveData.spo2, unit: '%', icon: FaLungs, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Temperature', value: liveData.temperature, unit: '°F', icon: FaThermometerHalf, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { title: 'Movement', value: liveData.movement, unit: 'steps', icon: FaWalking, color: 'text-green-500', bgColor: 'bg-green-50' },
  ];

  return (
    <LayoutPatient>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Health Dashboard</h2>
            <p className="text-gray-500 mt-1">
              Welcome back, {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Patient'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <FaUser className="mr-2" /> Profile Information
            </h3>
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="flex items-center text-xs text-indigo-600 font-medium hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full transition"
              >
                <FaEdit className="mr-1" /> Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center text-xs text-white bg-green-600 font-medium hover:bg-green-700 px-3 py-1 rounded-full transition"
                >
                  <FaSave className="mr-1" /> Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center text-xs text-white bg-red-500 font-medium hover:bg-red-600 px-3 py-1 rounded-full transition"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                <FaUser className="text-indigo-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-800">{profile.name}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                <div className="text-indigo-500 mr-3 font-bold text-lg">📅</div>
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-800">{profile.age} Years</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                <FaBaby className="text-indigo-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-500">Pregnancy</p>
                  <p className="text-sm font-medium text-gray-800">{profile.pregnancyMonths} Months</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                <FaPhone className="text-indigo-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-500">Emergency Contact</p>
                  <p className="text-sm font-medium text-gray-800">{profile.emergencyContact}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                <span className="text-indigo-500 mr-3 font-bold">👤</span>
                <div>
                  <p className="text-xs text-gray-500">Relation</p>
                  <p className="text-sm font-medium text-gray-800">{profile.relation}</p>
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  value={editForm.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Pregnancy (Months)</label>
                <input
                  type="number"
                  name="pregnancyMonths"
                  value={editForm.pregnancyMonths}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={editForm.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Relation</label>
                <select
                  name="relation"
                  value={editForm.relation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Husband">Husband</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Sibling">Sibling</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyTrendChart />
          </div>
          <div>
            <RiskStatusCard riskLevel={liveData.riskLevel} />
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h4 className="text-indigo-800 font-medium">Stay Healthy!</h4>
          <p className="text-indigo-600 text-sm mt-1">
            {liveData.riskLevel === 'low' 
              ? 'Your vitals are stable. Keep up the good work!' 
              : liveData.riskLevel === 'mid' 
              ? 'Please take care. Contact your doctor if you feel unwell.' 
              : '⚠️ High Risk detected! Please contact your doctor immediately.'
            }
          </p>
        </div>
      </div>
    </LayoutPatient>
  );
};

export default PatientDashboard;