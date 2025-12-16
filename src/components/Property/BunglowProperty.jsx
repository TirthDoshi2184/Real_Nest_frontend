import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { BsHouseDoor, BsCheckCircle } from 'react-icons/bs';

const BunglowDisplay = () => {
  const [bunglows, setBunglows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBunglow, setSelectedBunglow] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const fetchBunglows = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bunglow/getbunglow');
        setBunglows(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bunglow data');
        setLoading(false);
      }
    };
    fetchBunglows();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[50vh] bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <motion.h1 
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Dream Bungalow
            </motion.h1>
            <motion.p 
              className="text-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore our collection of luxurious properties
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Properties Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {bunglows.map((bunglow, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedBunglow(bunglow)}
            >
              <div className="relative h-64">
                <img 
                  src={bunglow.imageUrl} 
                  alt="Bungalow" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-blue-600 font-semibold">{bunglow.status}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{bunglow.type}</h3>
                <div className="flex items-center mb-4">
                  <FaRegMoneyBillAlt className="text-blue-600 mr-2" />
                  <span className="text-xl font-bold text-blue-600">₹{bunglow.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <FaRulerCombined className="text-gray-500 mr-2" />
                    <span>{bunglow.area} </span>
                  </div>
                  <div className="flex items-center">
                    <BsHouseDoor className="text-gray-500 mr-2" />
                    <span>{bunglow.interiorType}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{bunglow.review}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full ${
                    bunglow.isAvailableForRent === 'true' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                  }`}>
                    {bunglow.isAvailableForRent === 'true' ? 'Available for Rent' : 'Not for Rent'}
                  </span>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add contact or booking logic
                    }}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Selected Bunglow Modal */}
      {selectedBunglow && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedBunglow(null)}
        >
          <motion.div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedBunglow.imageUrl} 
                alt="Bungalow" 
                className="w-full h-[40vh] object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-white rounded-full p-2"
                onClick={() => setSelectedBunglow(null)}
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedBunglow.type}</h2>
                  <p className="text-xl text-blue-600 font-bold">₹{selectedBunglow.price}</p>
                </div>
                <span className={`px-4 py-2 rounded-full ${
                  selectedBunglow.status === 'Available' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
                }`}>
                  {selectedBunglow.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center">
                  <FaRulerCombined className="text-blue-600 text-xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{selectedBunglow.area} sq ft</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BsHouseDoor className="text-blue-600 text-xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Interior</p>
                    <p className="font-semibold">{selectedBunglow.interiorType}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BsCheckCircle className="text-blue-600 text-xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-semibold">
                      {selectedBunglow.isAvailableForRent === 'true' ? 'Available for Rent' : 'Not for Rent'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-600">{selectedBunglow.review}</p>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Visit
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BunglowDisplay;