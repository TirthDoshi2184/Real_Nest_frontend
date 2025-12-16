import React, { useEffect, useState } from 'react';

const ShopProperty = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Shop Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {shop.location}
                </div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  For Sale
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold mr-2">Interior:</span>
                  {shop.interiorType}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold mr-2">Area:</span>
                  {shop.sqrft} sq.ft
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold mr-2">Price:</span>
                  ₹{shop.price.toLocaleString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold mr-2">Rating:</span>
                  <div className="flex items-center">
                    {Array.from({ length: Math.round(shop.review) }).map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopProperty;