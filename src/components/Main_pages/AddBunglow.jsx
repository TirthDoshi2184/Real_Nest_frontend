import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonFields from '../../components/Add_Properties/CommonFields';
import BungalowFields from '../Add_Properties/BunglowFields';
import ImageUpload from '../../components/Add_Properties/ImageUploadFields';
import '../../add.css';


const AddBungalow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Common fields
    title: '',
    description: '',
    price: '',
    interiorType: '',
    location: '',
    address: '',
    city: '',
    pincode: '',
    status: 'Available',
    isAvailableForSale: true,
    isAvailableForRent: false,
    
    // Bungalow specific
    type: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: 0,
    amenities: ''
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get user ID on component mount and verify login
  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    // const token = sessionStorage.getItem('token');
    
    console.log('User ID from localStorage:', userId);
    // console.log('Token exists:', !!token);
    
    if (!userId) {
      alert('Please login first to add properties!');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.type) newErrors.type = 'Bungalow type is required';
    if (!formData.area || formData.area <= 0) newErrors.area = 'Valid area is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode || formData.pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode is required';
    if (!formData.bedrooms || formData.bedrooms <= 0) newErrors.bedrooms = 'Number of bedrooms is required';
    if (!formData.bathrooms || formData.bathrooms <= 0) newErrors.bathrooms = 'Number of bathrooms is required';
    if (!image) newErrors.image = 'Property image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Get user ID from localStorage
      const userId = sessionStorage.getItem('id');
      // const token = localStorage.getItem('token');
      
      // Validate user ID
      if (!userId || userId === 'null' || userId === 'undefined') {
        alert('User ID not found. Please login again.');
        navigate('/login');
        return;
      }

      console.log('Sending with User ID:', userId);

      // Append all form fields explicitly
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('interiorType', formData.interiorType);
      formDataToSend.append('area', formData.area);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('bedrooms', formData.bedrooms || 0);
      formDataToSend.append('bathrooms', formData.bathrooms || 0);
      formDataToSend.append('parking', formData.parking || 0);
      formDataToSend.append('amenities', formData.amenities || '');
      formDataToSend.append('isAvailableForRent', formData.isAvailableForRent);
      formDataToSend.append('isAvailableForSale', formData.isAvailableForSale);
      formDataToSend.append('user', userId);  // ✅ Valid user ID
      
      // Append image
      if (image) {
        formDataToSend.append('image', image);
      }

      // Debug log
      console.log('Form data being sent:', {
        title: formData.title,
        description: formData.description,
        area: formData.area,
        bedrooms: formData.bedrooms,
        userId: userId
      });

      const response = await fetch('http://localhost:3000/bunglow/insertbunglow', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Bungalow added successfully!');
        navigate('/MyProperties');
      } else {
        alert(data.message || 'Failed to add bungalow');
        console.error('Server response:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding bungalow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-header">
        <h2>Add New Bungalow</h2>
        <button 
          type="button" 
          onClick={() => navigate('/addproperty')}
          className="btn-back"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Common Fields */}
        <CommonFields 
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />

        {/* Bungalow Specific Fields */}
        <BungalowFields 
          formData={formData}
          handleChange={handleChange}
        />

        {/* Image Upload */}
        <ImageUpload 
          onImageSelect={handleImageSelect}
          currentImage={null}
        />
        {errors.image && <span className="error">{errors.image}</span>}

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding Bungalow...' : 'Add Bungalow'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/addproperty')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBungalow;