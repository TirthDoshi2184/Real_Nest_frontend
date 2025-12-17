import React, { useEffect, useState } from 'react';
import { Search, MapPin, Store, Building2, Filter, X, Square, Layers, Maximize2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopProperty = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filterShopType, setFilterShopType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:3000/shop/getshop");
        const data = await response.json();
        setShops(data.data);
      } catch (err) {
        setError("Error fetching shop data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    const matchesSearch = [
      shop?.title?.toLowerCase(),
      shop?.description?.toLowerCase(),
      shop?.location?.toLowerCase(),
      shop?.city?.toLowerCase(),
      shop?.shopType?.toLowerCase(),
      shop?.address?.toLowerCase(),
      shop?.commercialComplex?.toLowerCase()
    ].some(field => field?.includes(searchQuery.toLowerCase()));

    const matchesType = filterShopType === 'all' || shop?.shopType?.toLowerCase() === filterShopType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || shop?.status?.toLowerCase() === filterStatus.toLowerCase();
    
    const matchesPrice = (!priceRange.min || shop?.price >= Number(priceRange.min)) &&
                        (!priceRange.max || shop?.price <= Number(priceRange.max));

    return matchesSearch && matchesType && matchesStatus && matchesPrice;
  });

  const shopTypes = ['All', 'Retail', 'Restaurant', 'Office', 'Showroom', 'Warehouse', 'Medical', 'Salon'];
  const statusTypes = ['All', 'Available', 'Sold', 'Reserved', 'Rented'];

  const clearFilters = () => {
    setFilterShopType('all');
    setFilterStatus('all');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3a6ea5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading shops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-xl max-w-md">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const ShopCard = ({ shop }) => (
    <Link to={`/pdetail/${shop._id}`} className="group">
    <div className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
          <img
            src={shop.imgUrl || '/api/placeholder/400/300'}
            alt={shop.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-[#3a6ea5] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {shop.status}
            </span>
            {shop.isAvailableForRent && (
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                For Rent
              </span>
            )}
            {shop.isAvailableForSale && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                For Sale
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
              <p className="text-[#3a6ea5] text-xl font-bold">₹{shop.price?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-[#3a6ea5]" />
            <span className="text-sm font-semibold text-[#3a6ea5] uppercase">{shop.shopType}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#3a6ea5] transition-colors">
            {shop.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 text-[#3a6ea5] flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {shop.commercialComplex && `${shop.commercialComplex}, `}
              {shop.address}, {shop.city}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {shop.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-[#3a6ea5]" />
              <span className="text-sm text-gray-700">{shop.sqrft} sqft</span>
            </div>
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#3a6ea5]" />
              <span className="text-sm text-gray-700">{shop.interiorType}</span>
            </div>
            {shop.shopNumber && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3a6ea5]" />
                <span className="text-sm text-gray-700">Shop #{shop.shopNumber}</span>
              </div>
            )}
            {shop.floorNumber > 0 && (
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3a6ea5]" />
                <span className="text-sm text-gray-700">Floor {shop.floorNumber}</span>
              </div>
            )}
            {shop.frontageSize > 0 && (
              <div className="flex items-center gap-2 col-span-2">
                <Maximize2 className="w-4 h-4 text-[#3a6ea5]" />
                <span className="text-sm text-gray-700">Frontage: {shop.frontageSize} ft</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{shop.location}</span>
            <button className="bg-[#3a6ea5] text-white px-4 py-2 rounded-lg hover:bg-[#2d5682] transition-colors text-sm font-semibold" 
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#3a6ea5] to-[#2d5682] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Commercial Shops For You
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Find the perfect commercial space for your business
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by shop type, location, or complex name..."
                className="flex-1 px-4 py-4 text-gray-800 text-lg focus:outline-none"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#3a6ea5] text-white px-6 py-4 rounded-xl hover:bg-[#2d5682] transition-colors flex items-center gap-2 font-semibold"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Advanced Filters</h3>
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="text-[#3a6ea5] hover:text-[#2d5682] font-semibold flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Shop Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Type</label>
                <select
                  value={filterShopType}
                  onChange={(e) => setFilterShopType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3a6ea5] focus:outline-none"
                >
                  {shopTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3a6ea5] focus:outline-none"
                >
                  {statusTypes.map(status => (
                    <option key={status} value={status.toLowerCase()}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  placeholder="₹ 0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3a6ea5] focus:outline-none"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  placeholder="₹ Any"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#3a6ea5] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-[#3a6ea5] text-lg">{filteredShops.length}</span> shops found
            </p>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#3a6ea5]" />
              <span className="text-sm font-semibold text-gray-700">Commercial Properties</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Store className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Shops Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={clearFilters}
              className="bg-[#3a6ea5] text-white px-8 py-3 rounded-lg hover:bg-[#2d5682] transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProperty;