import React, { useState, useEffect } from 'react';
import { LineChart, PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Building, Home, Map, DollarSign, Users, Bell, Settings, LogOut, Search, Plus, Edit2, Trash2, Eye, X, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  // States for managing data and UI
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalContent, setModalContent] = useState('property'); // 'property' or 'user'
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  // Data states
  const [properties, setProperties] = useState([
    { id: 1, name: 'Luxury Villa', type: 'Bungalow', price: '850000', status: 'Active', location: 'Ahmedabad', image: '/api/placeholder/100/100' },
    { id: 2, name: 'City Apartment', type: 'Flat', price: '320000', status: 'Pending', location: 'Ahemedabad', image: '/api/placeholder/100/100' },
    { id: 3, name: 'Commercial Plot', type: 'Plot', price: '550000', status: 'Sold', location: 'Ahmedabad', image: '/api/placeholder/100/100' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Tirth Doshi', email: 'tirthdoshi9876@gmail.com', role: 'Admin', avatar: '/api/placeholder/50/50' },
    { id: 2, name: 'Aryan Malani', email: 'aryan23@gmail.com', role: 'Seller', avatar: '/api/placeholder/50/50' },
    { id: 3, name: 'Ruturaj Bagda', email: 'ruturajbagda@gmail.com', role: 'Buyer', avatar: '/api/placeholder/50/50' },
  ]);

  // Form states
  const [propertyForm, setPropertyForm] = useState({
    name: '', type: '', price: '', status: '', location: '', description: ''
  });

  const [userForm, setUserForm] = useState({
    name: '', email: '', role: '', password: ''
  });

  // Sample data for charts
  const salesData = [
    { month: 'Jan', sales: 65 }, { month: 'Feb', sales: 59 },
    { month: 'Mar', sales: 80 }, { month: 'Apr', sales: 81 },
    { month: 'May', sales: 56 }, { month: 'Jun', sales: 55 },
  ];

  const propertyTypes = [
    { name: 'Bungalow', value: 400 }, { name: 'Flat', value: 300 },
    { name: 'Plot', value: 200 }, { name: 'Commercial', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Notification handler
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // CRUD Operations for Properties
  const handleAddProperty = () => {
    setModalType('add');
    setModalContent('property');
    setPropertyForm({
      name: '', type: '', price: '', status: '', location: '', description: ''
    });
    setShowModal(true);
  };

  const handleEditProperty = (property) => {
    setModalType('edit');
    setModalContent('property');
    setPropertyForm(property);
    setShowModal(true);
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
    showNotification('Property deleted successfully');
  };

  // CRUD Operations for Users
  const handleAddUser = () => {
    setModalType('add');
    setModalContent('user');
    setUserForm({
      name: '', email: '', role: '', password: ''
    });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setModalType('edit');
    setModalContent('user');
    setUserForm(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    showNotification('User deleted successfully');
  };

  // Form submission handlers
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      setProperties([...properties, { ...propertyForm, id: properties.length + 1 }]);
      showNotification('Property added successfully');
    } else {
      setProperties(properties.map(p => 
        p.id === propertyForm.id ? propertyForm : p
      ));
      showNotification('Property updated successfully');
    }
    setShowModal(false);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      setUsers([...users, { ...userForm, id: users.length + 1 }]);
      showNotification('User added successfully');
    } else {
      setUsers(users.map(u => 
        u.id === userForm.id ? userForm : u
      ));
      showNotification('User updated successfully');
    }
    setShowModal(false);
  };

  // Render card component with animation
  const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setActiveHover(title)}
      onMouseLeave={() => setActiveHover(null)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className={`text-2xl font-bold mt-2 ${activeHover === title ? `text-${color}-600` : 'text-gray-800'}`}>
            {value}
          </h3>
        </div>
        <div className={`p-4 rounded-full bg-${color}-100 transition-colors duration-300`}>
          <Icon className={`w-8 h-8 text-${color}-500`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div 
        className={`fixed h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className={`text-2xl font-bold text-blue-600 transition-opacity duration-300 ${
            sidebarCollapsed ? 'opacity-0' : 'opacity-100'
          }`}>
           RealNest
          </h1>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRight className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
              sidebarCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard', value: 'dashboard' },
            { icon: Building, label: 'Properties', value: 'properties' },
            { icon: Users, label: 'Users', value: 'users' },
            { icon: Settings, label: 'Settings', value: 'settings' },
          ].map((item) => (
            <div
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center p-4 cursor-pointer transition-all duration-200 ${
                activeTab === item.value 
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`ml-3 transition-opacity duration-300 ${
                sidebarCollapsed ? 'opacity-0' : 'opacity-100'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      } flex-1 p-8`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white rounded-lg px-4 py-2 w-96 shadow-sm transition-all duration-200 focus-within:shadow-md">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110">
              <img src="/api/placeholder/40/40" alt="Profile" className="rounded-full" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total Properties" value={properties.length} icon={Building} color="blue" />
              <StatsCard title="Total Sales" value="₹4.2M" icon={DollarSign} color="green" />
              <StatsCard title="Active Users" value={users.length} icon={Users} color="purple" />
              <StatsCard title="Pending Reviews" value="24" icon={Bell} color="orange" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#0088FE"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, stroke: '#0088FE', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Property Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={propertyTypes}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Properties Content */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Properties Management</h2>
              <button
                onClick={handleAddProperty}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-blue-600 font-bold mb-4">
                      ₹{Number(property.price).toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center"><span className={`px-3 py-1 rounded-full text-sm ${
                        property.status === 'Active' ? 'bg-green-100 text-green-600' :
                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {property.status}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditProperty(property)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Content */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Users Management</h2>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add User</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'Agent' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {modalType === 'add' ? 'Add' : 'Edit'} {modalContent === 'property' ? 'Property' : 'User'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalContent === 'property' ? (
                <form onSubmit={handlePropertySubmit}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Property Name"
                      className="w-full p-2 border rounded-lg"
                      value={propertyForm.name}
                      onChange={(e) => setPropertyForm({...propertyForm, name: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full p-2 border rounded-lg"
                      value={propertyForm.type}
                      onChange={(e) => setPropertyForm({...propertyForm, type: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-full p-2 border rounded-lg"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full p-2 border rounded-lg"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                    />
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={propertyForm.status}
                      onChange={(e) => setPropertyForm({...propertyForm, status: e.target.value})}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {modalType === 'add' ? 'Add' : 'Update'} Property
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleUserSubmit}>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border rounded-lg"
                      value={userForm.name}
                      onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border rounded-lg"
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    />
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={userForm.role}
                      onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Agent">Agent</option>
                      <option value="User">User</option>
                    </select>
                    {modalType === 'add' && (
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded-lg"
                        value={userForm.password}
                        onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                      />
                    )}
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {modalType === 'add' ? 'Add' : 'Update'} User
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Notification */}
        {notification.show && (
          <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;