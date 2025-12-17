import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonFields from '../../components/Add_Properties/CommonFields';
import ShopFields from '../../components/Add_Properties/ShopFields';
import ImageUpload from '../../components/Add_Properties/ImageUploadFields';
import '../../add.css';

const AddShop = () => {
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
    
    // Shop specific
    shopType: '',
    sqrft: '',
    shopNumber: '',
    commercialComplex: '',
    floorNumber: 0,
    frontageSize: ''
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
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.shopType) newErrors.shopType = 'Shop type is required';
    if (!formData.sqrft || formData.sqrft <= 0) newErrors.sqrft = 'Valid area is required';
    if (!image) newErrors.image = 'Property image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append image
      if (image) {
        formDataToSend.append('image', image);
      }

      // Get user ID from localStorage
      const userId = sessionStorage.getItem('id');
      if (!userId || userId === 'null' || userId === 'undefined') {
        alert('User ID not found. Please login again.');
        navigate('/login');
        return;
      }

      console.log('Sending with User ID:', userId);

      formDataToSend.append('user', userId);

      const response = await fetch('http://localhost:3000/shop/insertshop', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        alert('Shop added successfully!');
        navigate('/MyProperties');
      } else {
        alert(data.message || 'Failed to add shop');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding shop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <div className="add-property-header">
        <h2>Add New Shop</h2>
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

        {/* Shop Specific Fields */}
        <ShopFields 
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
            {loading ? 'Adding Shop...' : 'Add Shop'}
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

export default AddShop;
