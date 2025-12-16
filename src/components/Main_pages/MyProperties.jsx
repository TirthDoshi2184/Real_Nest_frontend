import React, { useState, useEffect } from 'react';
import { 
  Building, 
  PlusCircle, 
  Menu,
  X,
  MapPin,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import SellerSidebar from '../Main_pages/Sidebar';

const MyProperties = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePropertyTab, setActivePropertyTab] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (!id) {
      window.location.href = '/login';
      return;
    }
    setSellerId(id);
    fetchAllProperties(id);
  }, []);

  const fetchAllProperties = async (id) => {
    try {
      const [flatsRes, shopsRes, bunglowsRes] = await Promise.all([
        fetch(`http://localhost:3000/seller/seller/flats/${id}`),
        fetch(`http://localhost:3000/seller/seller/shops/${id}`),
        fetch(`http://localhost:3000/seller/seller/bunglows/${id}`)
      ]);

      const flatsData = await flatsRes.json();
      const shopsData = await shopsRes.json();
      const bunglowsData = await bunglowsRes.json();

      const allProperties = [
        ...(flatsData.data || []).map(f => ({ ...f, type: 'flat' })),
        ...(shopsData.data || []).map(s => ({ ...s, type: 'shop' })),
        ...(bunglowsData.data || []).map(b => ({ ...b, type: 'bunglow' }))
      ];

      setProperties(allProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      const endpoint = type === 'flat' ? 'flats' : type === 'shop' ? 'shops' : 'bunglows';
      const response = await fetch(`http://localhost:3000/seller/${endpoint}/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        alert('Property deleted successfully!');
        fetchAllProperties(sellerId);
      } else {
        alert('Failed to delete property: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  const handleEdit = (id, type) => {
    const editRoute = type === 'flat' ? 'edit-flat' : type === 'shop' ? 'edit-shop' : 'edit-bunglow';
    window.location.href = `/${editRoute}/${id}`;
  };

  // Filter properties based on active tab and search query
  const filteredProperties = properties.filter(property => {
    const matchesTab = activePropertyTab === 'all' || property.type === activePropertyTab;
    const matchesSearch = searchQuery === '' || 
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {property.imgUrl ? (
          <img 
            src={property.imgUrl} 
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <Building size={64} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold capitalize shadow-md">
            {property.type}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
            property.status === 'Available' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {property.status}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="truncate">{property.location || property.address || property.city}</span>
        </p>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div>
            <p className="text-2xl font-bold" style={{ color: '#3a6ea5' }}>
              ₹{property.price?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {property.sqrft || property.area} sq.ft
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Interior</p>
            <p className="font-semibold text-gray-700">{property.interiorType}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {property.bedrooms && (
            <div className="flex justify-between">
              <span className="text-gray-600">Bedrooms:</span>
              <span className="font-semibold">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex justify-between">
              <span className="text-gray-600">Bathrooms:</span>
              <span className="font-semibold">{property.bathrooms}</span>
            </div>
          )}
          {property.parking && (
            <div className="flex justify-between">
              <span className="text-gray-600">Parking:</span>
              <span className="font-semibold">{property.parking}</span>
            </div>
          )}
          {property.floorNumber && (
            <div className="flex justify-between">
              <span className="text-gray-600">Floor:</span>
              <span className="font-semibold">{property.floorNumber}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(property._id, property.type)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-lg hover:opacity-90 transition-all font-medium"
            style={{ backgroundColor: '#3a6ea5' }}
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(property._id, property.type)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl font-semibold" style={{ color: '#3a6ea5' }}>Loading Properties...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <SellerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab="properties"
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
                <p className="font-semibold text-gray-800">My Properties</p>
                <p className="text-sm text-gray-500">{filteredProperties.length} properties</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
                <p className="text-gray-600 mt-1">Manage and edit your property listings</p>
              </div>
              <button
                onClick={() => window.location.href = '/addproperty'}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 shadow-lg transition-all"
                style={{ backgroundColor: '#3a6ea5' }}
              >
                <PlusCircle size={20} />
                Add New Property
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by title, location, or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'flat', 'shop', 'bunglow'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePropertyTab(tab)}
                      className={`px-5 py-2 rounded-lg font-medium transition-all capitalize ${
                        activePropertyTab === tab
                          ? 'text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={activePropertyTab === tab ? { backgroundColor: '#3a6ea5' } : {}}
                    >
                      {tab} 
                      {tab !== 'all' && ` (${properties.filter(p => p.type === tab).length})`}
                      {tab === 'all' && ` (${properties.length})`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                {searchQuery ? (
                  <>
                    <Search size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90"
                      style={{ backgroundColor: '#3a6ea5' }}
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    <Building size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Yet</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
                    <button
                      onClick={() => window.location.href = '/add-property'}
                      className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 shadow-lg"
                      style={{ backgroundColor: '#3a6ea5' }}
                    >
                      <PlusCircle size={20} className="inline mr-2" />
                      Add Your First Property
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Statistics Summary */}
            {properties.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Property Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold" style={{ color: '#3a6ea5' }}>
                      {properties.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Properties</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">
                      {properties.filter(p => p.status === 'Available').length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Available</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">
                      {properties.filter(p => p.isAvailableForRent || p.availableForRent).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">For Rent</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">
                      {properties.filter(p => p.isAvailableForSale).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">For Sale</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyProperties;