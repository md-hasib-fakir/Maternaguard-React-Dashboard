import React from 'react';

const StatsCard = ({ title, value, unit, icon: Icon, color, bgColor }) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm border border-gray-100 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className={`text-2xl font-bold mt-1 ${color}`}>
            {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
          </h4>
        </div>
        <div className={`p-3 rounded-full ${color} bg-white bg-opacity-50`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;