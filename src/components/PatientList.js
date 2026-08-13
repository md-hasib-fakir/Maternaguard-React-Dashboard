import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCircle } from 'react-icons/fa';

const PatientList = () => {
  const patients = [
    { id: 1, name: 'Rokeya Begum', age: 28, risk: 'low', lastUpdate: '2 min ago' },
    { id: 2, name: 'Fatema Akter', age: 32, risk: 'mid', lastUpdate: '5 min ago' },
    { id: 3, name: 'Taslima Khanam', age: 25, risk: 'high', lastUpdate: '1 min ago' },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-green-500';
      case 'mid': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Recent Patients</h3>
          <p className="text-xs text-gray-400">Currently active patients</p>
        </div>
        <Link to="/patients" className="text-xs text-indigo-600 font-medium hover:text-indigo-700">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <Link 
            key={patient.id}
            to={`/patient/${patient.id}`}
            className="block p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{patient.name}</p>
                  <p className="text-xs text-gray-500">Age: {patient.age} | {patient.lastUpdate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaCircle className={`text-xs ${getRiskColor(patient.risk)}`} />
                <span className={`text-xs font-medium ${getRiskColor(patient.risk)}`}>
                  {patient.risk.toUpperCase()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientList;