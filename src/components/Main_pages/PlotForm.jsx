import React, { useState } from 'react';
import { Box, Typography, Grid, Card, TextField, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlotForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    area: '',
    price: '',
    location: '',
    contact: '',
    review: '',
    isAvailableForRent: 'false',
    status: 'Available',
    user: '',
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

    formDataToSend.append('plotImage', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/plot/insertplot', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Plot added successfully!');
        navigate('/');
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding plot:', error);
      alert('Failed to add plot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#1976d2' }}>
          Add New Plot
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area (in sq ft)"
                name="area"
                value={formData.area}
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
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                type="tel"
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
                <MenuItem value="Reserved">Reserved</MenuItem>
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
              <Select
                fullWidth
                value={formData.isAvailableForRent}
                onChange={handleChange}
                name="isAvailableForRent"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="false">Not Available for Rent</MenuItem>
                <MenuItem value="true">Available for Rent</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="User ID"
                name="user"
                value={formData.user}
                onChange={handleChange}
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
                {loading ? <CircularProgress size={24} /> : 'Add Plot'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};


export default PlotForm;