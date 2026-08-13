import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import WeeklyTrendChart from '../components/WeeklyTrendChart';
import { FaArrowLeft, FaHeart, FaLungs, FaThermometerHalf, FaWalking } from 'react-icons/fa';

const PatientDetails = () => {
  const { id } = useParams();

  const patient = {
    id: id,
    name: 'Rokeya Begum',
    age: 28,
    risk: 'Low',
    lastVisit: '2026-08-10',
    heartRate: 86,
    spo2: 98,
    temperature: 98.4,
    movement: 4.2,
    history: 'Normal pregnancy. No complications detected.',
    doctorNote: 'Advise to take iron supplements and walk daily.',
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Link to="/patients" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
          <FaArrowLeft className="mr-2" /> Back to Patients
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Age: <span className="font-medium">{patient.age}</span></span>
            <span>Risk: <span className={`font-medium ${patient.risk === 'Low' ? 'text-green-600' : patient.risk === 'Mid' ? 'text-yellow-600' : 'text-red-600'}`}>{patient.risk}</span></span>
            <span>Last Visit: <span className="font-medium">{patient.lastVisit}</span></span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700">Current Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="text-sm text-gray-500">Heart Rate</p>
            <p className="text-xl font-bold text-red-600 mt-1">{patient.heartRate} <span className="text-sm font-normal text-gray-500">bpm</span></p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-gray-500">SpO2</p>
            <p className="text-xl font-bold text-blue-600 mt-1">{patient.spo2} <span className="text-sm font-normal text-gray-500">%</span></p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-xl font-bold text-yellow-600 mt-1">{patient.temperature} <span className="text-sm font-normal text-gray-500">°F</span></p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-gray-500">Movement</p>
            <p className="text-xl font-bold text-green-600 mt-1">{patient.movement} <span className="text-sm font-normal text-gray-500">steps</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">Patient History</h4>
            <p className="text-gray-600 text-sm">{patient.history}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">Doctor's Note</h4>
            <p className="text-gray-600 text-sm">{patient.doctorNote}</p>
          </div>
        </div>

        {/* এখানে পেশেন্টের নিজস্ব গ্রাফ বসানো হয়েছে */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-700 mb-4">Weekly Trend</h4>
          <WeeklyTrendChart />
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetails;