import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Edit2, Save, X,Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from '../BasicComponent/Navbar';
import { s } from 'framer-motion/client';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    mobileNo: '',
    role: ''
  });
  const [editedData, setEditedData] = useState({
    fullname: '',
    email: '',
    mobileNo: '',
    role: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = sessionStorage.getItem('id');
      const role = sessionStorage.getItem('role');
      console.log('User role from sessionStorage:', role);
      setUserRole(role);
      if (!userId) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`http://localhost:3000/user/singleuser/${userId}`);
      const result = await response.json();
      console.log('Fetched user data:', result);
      
      if (result.data) {
        setUserData(result.data);
        setEditedData(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const userId = sessionStorage.getItem('id');
      
      // Remove _id and password from the update data
      const { _id, password, ...updateData } = editedData;
      
      const response = await fetch(`http://localhost:3000/user/updateuser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();
      
      if (response.ok) {
        setUserData(editedData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#3a6ea5' }}>
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
  <>
    {/* Conditionally render Sidebar for Seller */}
    {userRole === 'seller' ? (
      <div className="flex min-h-screen">
        <Sidebar
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          activeTab="profile" 
        />
        <div className="flex-1 min-h-screen py-12 px-4" style={{ backgroundColor: '#3a6ea5' }}>
          {/* Mobile Menu Toggle for Seller */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-800"
            >
              <Menu size={20} />
              Menu
            </button>
          </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-blue-100">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32" style={{ backgroundColor: '#3a6ea5' }}>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                {userData.fullname || 'User Name'}
              </h2>
              <p className="text-gray-500 capitalize">{userData.role || 'User'}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: '#3a6ea5' }}
                >
                  <Edit2 size={20} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold transition-all hover:bg-green-700 shadow-lg"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold transition-all hover:bg-gray-600 shadow-lg"
                  >
                    <X size={20} />
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullname"
                      value={editedData.fullname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.fullname || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Mail size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.email || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Phone size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobileNo"
                      value={editedData.mobileNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.mobileNo || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Shield size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Role
                  </label>
                  {isEditing ? (
                    <select
                      name="role"
                      value={editedData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 capitalize"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="agent">Agent</option>
                    </select>
                  ) : (
                    <p className="text-lg text-gray-800 font-medium capitalize">
                      {userData.role || 'User'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      ) : (
  <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#3a6ea5' }}>
    <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-blue-100">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32" style={{ backgroundColor: '#3a6ea5' }}>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                {userData.fullname || 'User Name'}
              </h2>
              <p className="text-gray-500 capitalize">{userData.role || 'User'}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-lg"
                  style={{ backgroundColor: '#3a6ea5' }}
                >
                  <Edit2 size={20} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold transition-all hover:bg-green-700 shadow-lg"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold transition-all hover:bg-gray-600 shadow-lg"
                  >
                    <X size={20} />
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <User size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullname"
                      value={editedData.fullname}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.fullname || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Mail size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.email || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Phone size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobileNo"
                      value={editedData.mobileNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-gray-800 font-medium">
                      {userData.mobileNo || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#3a6ea5' }}>
                  <Shield size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Role
                  </label>
                  {isEditing ? (
                    <select
                      name="role"
                      value={editedData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 capitalize"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="agent">Agent</option>
                    </select>
                  ) : (
                    <p className="text-lg text-gray-800 font-medium capitalize">
                      {userData.role || 'User'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </> 
  );
};

export default ProfilePage;