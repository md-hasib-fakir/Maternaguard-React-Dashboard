import React from 'react';

const RiskStatusCard = ({ riskLevel }) => {
  const getStatus = (risk) => {
    if (risk === 'low') return { text: 'Low Risk', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (risk === 'mid') return { text: 'Moderate Risk', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const status = getStatus(riskLevel);

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${status.border} ${status.bg}`}>
      <h3 className="text-sm font-medium text-gray-500">Current Risk Status</h3>
      <p className={`text-2xl font-bold mt-2 ${status.color}`}>{status.text}</p>
    </div>
  );
};

export default RiskStatusCard;