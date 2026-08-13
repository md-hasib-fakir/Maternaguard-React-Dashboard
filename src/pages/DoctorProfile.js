import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { FaUserMd, FaGraduationCap, FaVenusMars, FaBriefcase, FaBuilding, FaPhone, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const DoctorProfile = () => {
  // ডাক্তারের ডেটা (ভবিষ্যতে Firebase থেকে আসবে)
  const [profile, setProfile] = useState({
    name: 'Dr. Sharmin Akhter',
    degree: 'MBBS, FCPS (Gynecology)',
    gender: 'Female',
    experience: '12 Years',
    hospital: 'Dhaka Medical College Hospital',
    type: 'Government',
    phone: '+880 1712 111 111'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

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

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
    // ভবিষ্যতে এখানে Firebase-এ সেভ করার কোড যোগ করবেন
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-500 mt-1">Manage your professional information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <FaUserMd className="text-3xl text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="border-b-2 border-indigo-500 focus:outline-none text-xl font-bold"
                    />
                  ) : (
                    profile.name
                  )}
                </h3>
                {!isEditing && (
                  <p className="text-indigo-600 font-medium">{profile.degree}</p>
                )}
              </div>
            </div>

            {/* Edit/Save/Cancel বাটন */}
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FaSave className="mr-2" /> Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-gray-600"><FaGraduationCap className="mr-2 text-gray-400" /> {profile.degree}</div>
              <div className="flex items-center text-gray-600"><FaVenusMars className="mr-2 text-gray-400" /> {profile.gender}</div>
              <div className="flex items-center text-gray-600"><FaBriefcase className="mr-2 text-gray-400" /> {profile.experience}</div>
              <div className="flex items-center text-gray-600"><FaBuilding className="mr-2 text-gray-400" /> {profile.hospital}</div>
              <div className="flex items-center text-gray-600"><FaPhone className="mr-2" /> {profile.phone}</div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  profile.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {profile.type}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
                <input name="degree" value={editForm.degree} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
                <select name="gender" value={editForm.gender} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Experience</label>
                <input name="experience" value={editForm.experience} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Hospital</label>
                <input name="hospital" value={editForm.hospital} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input name="phone" value={editForm.phone} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select name="type" value={editForm.type} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;