import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Patients = () => {
  const [patientsList, setPatientsList] = useState([]);

  // ফায়ারবেস থেকে রিয়েল-টাইম ডেটা আনা
  useEffect(() => {
    const dbRef = ref(db, 'patients'); // 'patients' ফোল্ডার থেকে সব ডেটা আনা
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // ফায়ারবেস থেকে ডেটা পেয়ে অ্যারেতে রূপান্তর করা
        const formattedData = Object.keys(data).map((key) => ({
          id: key, // ফায়ারবেসের ইউনিক আইডি
          ...data[key].profile, // প্রোফাইল ডেটা (নাম, বয়স)
          risk: data[key].latest?.riskLevel || 'Low', // রিস্ক লেভেল
          lastVisit: '2026-08-10' // ডেমো (ভবিষ্যতে ডেটাবেসে যোগ করবেন)
        }));
        setPatientsList(formattedData);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Patients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientsList.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    <Link to={`/patient/${patient.id}`}>
                      {patient.name || 'Unknown Patient'}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      patient.risk === 'Mid' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {patient.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Patients;