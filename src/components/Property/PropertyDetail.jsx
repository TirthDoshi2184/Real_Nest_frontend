import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  ParkingSquare,
  Trees,
  Home,
  Calendar,
  DollarSign,
  Sparkles
} from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [societyRes, flatRes] = await Promise.all([
          axios.get(`http://localhost:3000/society/singlesociety/${id}`),
          axios.get(`http://localhost:3000/flat/singleflat/${id}`)
        ]);
        setProperty({
          society: societyRes.data,
          flat: flatRes.data.data
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/properties" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Properties
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96">
              <img 
                src={property?.flat?.imgUrl || "/api/placeholder/800/600"} 
                alt={property?.flat?.society?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
                {property?.flat?.status}
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property?.flat?.society?.name}</h1>
              <div className="flex items-center mb-6">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <p className="text-gray-600">{property?.flat?.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-semibold">${property?.flat?.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Interior</p>
                    <p className="text-lg font-semibold">{property?.flat?.interiorType}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Property Features</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Floors</p>
                  <p className="font-medium">{property?.flat?.society?.floors}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{property?.society?.yearsOld} years</p>
                </div>
              </div>
              <div className="flex items-center">
                <ParkingSquare className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Parking</p>
                  <p className="font-medium">{property?.flat?.society?.parkingArea} sqft</p>
                </div>
              </div>
              <div className="flex items-center">
                <Trees className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Garden</p>
                  <p className="font-medium">{property?.flat?.society?.gardenArea} sqft</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Construction Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">{property?.flat?.society?.constructionStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Units</span>
                <span className="font-medium">{property?.society?.units}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Contact Owner</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{property?.flat?.user?.mobileNo}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{property?.flat?.location}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Contact Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;