import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', heartRate: 82, spo2: 98 },
  { day: 'Tue', heartRate: 85, spo2: 97 },
  { day: 'Wed', heartRate: 88, spo2: 99 },
  { day: 'Thu', heartRate: 80, spo2: 96 },
  { day: 'Fri', heartRate: 86, spo2: 98 },
  { day: 'Sat', heartRate: 90, spo2: 100 },
  { day: 'Sun', heartRate: 84, spo2: 99 },
];

const WeeklyTrendChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Weekly Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate (bpm)" strokeWidth={2} />
            <Line type="monotone" dataKey="spo2" stroke="#3b82f6" name="SpO2 (%)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrendChart;