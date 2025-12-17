import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonFields from '../../components/Add_Properties/CommonFields';
import FlatFields from '../../components/Add_Properties/FlatFields';
import ImageUpload from '../../components/Add_Properties/ImageUploadFields';
import '../../add.css';

const AddFlat = () => {
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
    availableForRent: false,  // Match your backend field name
    
    // Flat specific
    type: '',
    sqrft: '',
    society: '',
    floorNumber: '',
    totalFloors: '',
    parking: 0
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get user ID on component mount
  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    console.log('User ID from localStorage:', userId);
    
    if (!userId) {
      alert('Please login first!');
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
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.type) newErrors.type = 'Flat type is required';
    if (!formData.sqrft || formData.sqrft <= 0) newErrors.sqrft = 'Valid area is required';
    if (!formData.pincode || formData.pincode.length !== 6) newErrors.pincode = 'Valid 6-digit pincode is required';
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
      
      if (!userId) {
        alert('User ID not found. Please login again.');
        navigate('/login');
        return;
      }

      // Append all form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('interiorType', formData.interiorType);
      formDataToSend.append('sqrft', formData.sqrft);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('society', formData.society);
      formDataToSend.append('floorNumber', formData.floorNumber || 0);
      formDataToSend.append('totalFloors', formData.totalFloors || 1);
      formDataToSend.append('parking', formData.parking || 0);
      formDataToSend.append('availableForRent', formData.availableForRent);
      formDataToSend.append('isAvailableForSale', formData.isAvailableForSale);
      formDataToSend.append('user', userId);  // Valid user ID
      
      // Append image
      if (image) {
        formDataToSend.append('image', image);
      }

      console.log('Sending data:', {
        title: formData.title,
        description: formData.description,
        sqrft: formData.sqrft,
        pincode: formData.pincode,
        userId: userId
      });

      const response = await fetch('http://localhost:3000/flat/insertflat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Flat added successfully!');
        navigate('/MyProperties');
      } else {
        alert(data.message || 'Failed to add flat');
        console.error('Server response:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding flat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-header">
        <h2>Add New Flat</h2>
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

        {/* Flat Specific Fields */}
        <FlatFields 
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
            {loading ? 'Adding Flat...' : 'Add Flat'}
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

export default AddFlat;