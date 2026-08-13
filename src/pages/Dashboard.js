import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Layout from '../layout/Layout';
import StatsCard from '../components/StatsCard';
import RiskStatusCard from '../components/RiskStatusCard';
import PatientList from '../components/PatientList';
import RecentAlerts from '../components/RecentAlerts';
import { FaHeart, FaLungs, FaThermometerHalf, FaWalking } from 'react-icons/fa';

const Dashboard = () => {
  const [liveData, setLiveData] = useState({
    heartRate: 86,
    spo2: 98,
    temperature: 98.4,
    movement: 4.2,
    riskLevel: 'low'
  });

  useEffect(() => {
    const dbRef = ref(db, 'sensorData/latest');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLiveData(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { title: 'Heart Rate', value: liveData.heartRate, unit: 'bpm', icon: FaHeart, color: 'text-red-500', bgColor: 'bg-red-50' },
    { title: 'SpO2', value: liveData.spo2, unit: '%', icon: FaLungs, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Temperature', value: liveData.temperature, unit: '°F', icon: FaThermometerHalf, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { title: 'Movement', value: liveData.movement, unit: 'steps', icon: FaWalking, color: 'text-green-500', bgColor: 'bg-green-50' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 mt-1">Real-time maternal health monitoring overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentAlerts />
          </div>
          <div>
            <RiskStatusCard riskLevel={liveData.riskLevel} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             {/* এখানে আগে গ্রাফ ছিল, এখন খালি রাখা হয়েছে */}
          </div>
          <div>
            <PatientList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;