import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building, 
  Store, 
  PlusCircle, 
  List, 
  Eye,
  MessageSquare,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import SellerSidebar from '../../components/Main_pages/Sidebar';

export const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalProperties: 0,
    flats: 0,
    shops: 0,
    bunglows: 0,
    totalViews: 0,
    totalInquiries: 0,
    recentProperties: []
  });
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (!id) {
      window.location.href = '/login';
      return;
    }
    setSellerId(id);
    fetchDashboardData(id);
  }, []);

  const fetchDashboardData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/seller/seller/dashboard/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
        <div className="p-4 rounded-full" style={{ backgroundColor: bgColor }}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold" style={{ color: '#3a6ea5' }}>Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <SellerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab="dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Seller Account</p>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-gray-600 mt-1">Welcome to your seller dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={<List size={32} className="text-white" />}
                title="Total Properties"
                value={dashboardData.totalProperties}
                color="#3a6ea5"
                bgColor="#3a6ea5"
              />
              <StatCard 
                icon={<Eye size={32} className="text-white" />}
                title="Total Views"
                value={dashboardData.totalViews}
                color="#10b981"
                bgColor="#10b981"
              />
              <StatCard 
                icon={<MessageSquare size={32} className="text-white" />}
                title="Inquiries"
                value={dashboardData.totalInquiries}
                color="#f59e0b"
                bgColor="#f59e0b"
              />
              <StatCard 
                icon={<Building size={32} className="text-white" />}
                title="Active Listings"
                value={dashboardData.totalProperties}
                color="#8b5cf6"
                bgColor="#8b5cf6"
              />
            </div>

            {/* Property Type Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Building size={24} style={{ color: '#3a6ea5' }} />
                  <h3 className="text-xl font-bold text-gray-800">Flats</h3>
                </div>
                <p className="text-4xl font-bold" style={{ color: '#3a6ea5' }}>
                  {dashboardData.flats}
                </p>
                <p className="text-sm text-gray-500 mt-2">Listed Properties</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Store size={24} style={{ color: '#3a6ea5' }} />
                  <h3 className="text-xl font-bold text-gray-800">Shops</h3>
                </div>
                <p className="text-4xl font-bold" style={{ color: '#3a6ea5' }}>
                  {dashboardData.shops}
                </p>
                <p className="text-sm text-gray-500 mt-2">Listed Properties</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Home size={24} style={{ color: '#3a6ea5' }} />
                  <h3 className="text-xl font-bold text-gray-800">Bunglows</h3>
                </div>
                <p className="text-4xl font-bold" style={{ color: '#3a6ea5' }}>
                  {dashboardData.bunglows}
                </p>
                <p className="text-sm text-gray-500 mt-2">Listed Properties</p>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recent Properties</h3>
                <button
                  onClick={() => window.location.href = '/myproperties'}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.recentProperties.length > 0 ? (
                  dashboardData.recentProperties.map((property, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/pdetail/${property._id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                          {property.imgUrl ? (
                            <img 
                              src={property.imgUrl} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building size={24} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{property.title || 'Property'}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={14} />
                            {property.location || property.city}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">₹{property.price?.toLocaleString()}</p>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mt-1">
                          {property.propertyType}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Building size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 mb-4">No properties listed yet</p>
                    <button
                      onClick={() => window.location.href = '/add-property'}
                      className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90"
                      style={{ backgroundColor: '#3a6ea5' }}
                    >
                      Add Your First Property
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Account Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Listings</span>
                    <span className="font-bold text-gray-800">{dashboardData.totalProperties}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Inquiries</span>
                    <span className="font-bold text-gray-800">{dashboardData.totalInquiries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-bold text-gray-800">{dashboardData.totalViews}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
