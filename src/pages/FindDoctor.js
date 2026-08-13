import React from 'react';
import LayoutPatient from '../layout/LayoutPatient';
import { FaUserMd, FaPhone, FaVenusMars, FaHospital } from 'react-icons/fa';

const FindDoctor = () => {
  // ডাক্তারদের ডেটা (আপাতত ডেমো, ভবিষ্যতে Firebase থেকে আসবে)
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sharmin Akhter',
      designation: 'Senior Gynecologist',
      hospital: 'Dhaka Medical College Hospital',
      phone: '+880 1712 111 111',
      gender: 'Female'
    },
    {
      id: 2,
      name: 'Dr. Kamal Hossain',
      designation: 'Consultant, Obstetrics',
      hospital: 'Square Hospital, Dhaka',
      phone: '+880 1712 222 222',
      gender: 'Male'
    },
    {
      id: 3,
      name: 'Dr. Nusrat Jahan',
      designation: 'Associate Professor, Gynecology',
      hospital: 'Bangabandhu Sheikh Mujib Medical University',
      phone: '+880 1712 333 333',
      gender: 'Female'
    },
    {
      id: 4,
      name: 'Dr. Mahmudur Rahman',
      designation: 'Senior Consultant, Gynae & Obs',
      hospital: 'Holy Family Red Crescent Medical College',
      phone: '+880 1712 444 444',
      gender: 'Male'
    },
  ];

  return (
    <LayoutPatient>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Find a Doctor</h2>
          <p className="text-gray-500 mt-1">Browse and contact experienced specialists for maternal health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                    <FaUserMd className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-sm text-indigo-600">{doctor.designation}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FaVenusMars className="inline mr-1" /> {doctor.gender}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaHospital className="mr-2 text-gray-400" /> {doctor.hospital}
                </div>
                <div className="flex items-center text-indigo-600 font-medium">
                  <FaPhone className="mr-2" /> {doctor.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Contact Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutPatient>
  );
};

export default FindDoctor;