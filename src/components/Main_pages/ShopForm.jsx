import React, { useState } from 'react';
import { Box, Typography, Grid, Card, TextField, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShopForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    type: '',
    interiorType: '',
    sqrft: '',
    price: '',
    status: 'Available',
    location: '',
    user: '',
    review: '',
    availabilityForRent: 'false',
    society: '',
    city: '',
    address: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files[0];

    if (!file) {
      setFileError('Please select a file');
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }

    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      setFileError('Invalid file type. Please select PNG, JPG, or JPEG.');
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size should be less than 5MB');
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setFileError('Please upload an image');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    formDataToSend.append('shopImage', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/shop/insertshop', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Shop added successfully!');
        navigate('/');
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding shop:', error);
      alert('Failed to add shop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#1976d2' }}>
          Add New Shop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={formData.type}
                onChange={handleChange}
                name="type"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="">Select Shop Type</MenuItem>
                <MenuItem value="retail">Retail</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
                <MenuItem value="warehouse">Warehouse</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={formData.interiorType}
                onChange={handleChange}
                name="interiorType"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="">Select Interior Type</MenuItem>
                <MenuItem value="furnished">Furnished</MenuItem>
                <MenuItem value="semifurnished">Semi-Furnished</MenuItem>
                <MenuItem value="unfurnished">Unfurnished</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Square Feet"
                name="sqrft"
                value={formData.sqrft}
                onChange={handleChange}
                required
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={formData.status}
                onChange={handleChange}
                name="status"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Sold">Sold</MenuItem>
                <MenuItem value="Rented">Rented</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={formData.availabilityForRent}
                onChange={handleChange}
                name="availabilityForRent"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="false">Not Available for Rent</MenuItem>
                <MenuItem value="true">Available for Rent</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Society ID"
                name="society"
                value={formData.society}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Review (Optional)"
                name="review"
                value={formData.review}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {fileError && <Typography color="error">{fileError}</Typography>}
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '200px', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Shop'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
)}

export default ShopForm;