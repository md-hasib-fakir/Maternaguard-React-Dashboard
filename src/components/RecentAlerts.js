import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const RecentAlerts = () => {
  const alerts = [
    { id: 1, type: 'warning', message: 'Taslima Khanam (High Risk) - Check vitals immediately.', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Rokeya Begum (Low Risk) - Vitals are stable.', time: '10 min ago' },
    { id: 3, type: 'info', message: 'Fatema Akter (Mid Risk) - Schedule follow-up visit.', time: '1 hour ago' },
  ];

  const getIcon = (type) => {
    if (type === 'warning') return <FaExclamationTriangle className="text-yellow-500" />;
    if (type === 'success') return <FaCheckCircle className="text-green-500" />;
    return <FaInfoCircle className="text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Alerts & Reminders</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="mt-1">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;