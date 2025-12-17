import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const primaryColor = '#3a6ea5';

export default function EditProperty() {
  const { propertyType, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    shopType: '',
    interiorType: '',
    sqrft: '',
    area: '',
    price: '',
    location: '',
    address: '',
    city: '',
    pincode: '',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    floorNumber: 0,
    totalFloors: 1,
    shopNumber: '',
    commercialComplex: '',
    frontageSize: 0,
    amenities: '',
    society: '',
    status: 'Available',
    availableForRent: false,
    isAvailableForRent: false,
    isAvailableForSale: true
  });

  useEffect(() => {
    fetchPropertyData();
  }, [id, propertyType]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      setError('');

      const endpoints = {
        'flat': `http://localhost:3000/flat/singleflat/${id}`,
        'shop': `http://localhost:3000/shop/singleshop/${id}`,
        'bunglow': `http://localhost:3000/bunglow/singlebunglow/${id}`
      };

      const response = await fetch(endpoints[propertyType]);
      const data = await response.json();

      if (data.success) {
        const property = data.data;
        setFormData({
          title: property.title || '',
          description: property.description || '',
          type: property.type || '',
          shopType: property.shopType || '',
          interiorType: property.interiorType || '',
          sqrft: property.sqrft || '',
          area: property.area || '',
          price: property.price || '',
          location: property.location || '',
          address: property.address || '',
          city: property.city || '',
          pincode: property.pincode || '',
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          parking: property.parking || 0,
          floorNumber: property.floorNumber || 0,
          totalFloors: property.totalFloors || 1,
          shopNumber: property.shopNumber || '',
          commercialComplex: property.commercialComplex || '',
          frontageSize: property.frontageSize || 0,
          amenities: property.amenities || '',
          society: property.society || '',
          status: property.status || 'Available',
          availableForRent: property.availableForRent || false,
          isAvailableForRent: property.isAvailableForRent || false,
          isAvailableForSale: property.isAvailableForSale !== undefined ? property.isAvailableForSale : true
        });
      } else {
        setError('Failed to fetch property data');
      }
    } catch (err) {
      setError('Error fetching property: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const endpoints = {
        'flat': `http://localhost:3000/flat/updateflat/${id}`,
        'shop': `http://localhost:3000/shop/updateshop/${id}`,
        'bunglow': `http://localhost:3000/bunglow/updatebunglow/${id}`
      };

      const response = await fetch(endpoints[propertyType], {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Property updated successfully!');
        setTimeout(() => {
          navigate('/myproperties');
        }, 2000);
      } else {
        setError(result.message || 'Failed to update property');
      }
    } catch (err) {
      setError('Error updating property: ' + err.message);
      console.error('Update error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}
      >
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/myproperties')}
            sx={{ mb: 2, color: primaryColor }}
          >
            Back to Properties
          </Button>
          <Typography
            variant="h4"
            sx={{
              color: primaryColor,
              fontWeight: 'bold'
            }}
          >
            Edit {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
          </Typography>
        </Box>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Form */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Common Fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>

              {/* Type Fields */}
              {propertyType === 'flat' && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Flat Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Flat Type"
                    >
                      <MenuItem value="1BHK">1BHK</MenuItem>
                      <MenuItem value="2BHK">2BHK</MenuItem>
                      <MenuItem value="3BHK">3BHK</MenuItem>
                      <MenuItem value="4BHK">4BHK</MenuItem>
                      <MenuItem value="Penthouse">Penthouse</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {propertyType === 'bunglow' && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Bunglow Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Bunglow Type"
                    >
                      <MenuItem value="Independent">Independent</MenuItem>
                      <MenuItem value="Row House">Row House</MenuItem>
                      <MenuItem value="Villa">Villa</MenuItem>
                      <MenuItem value="Farmhouse">Farmhouse</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {propertyType === 'shop' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Shop Type"
                    name="shopType"
                    value={formData.shopType}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Interior Type</InputLabel>
                  <Select
                    name="interiorType"
                    value={formData.interiorType}
                    onChange={handleChange}
                    label="Interior Type"
                  >
                    <MenuItem value="Furnished">Furnished</MenuItem>
                    <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                    <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Area Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={propertyType === 'bunglow' ? 'Area (sq.ft)' : 'Square Feet'}
                  name={propertyType === 'bunglow' ? 'area' : 'sqrft'}
                  type="number"
                  value={propertyType === 'bunglow' ? formData.area : formData.sqrft}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Location Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
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
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Conditional Fields for Flat/Bunglow */}
              {(propertyType === 'flat' || propertyType === 'bunglow') && (
                <>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Bedrooms"
                      name="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Bathrooms"
                      name="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Parking"
                      name="parking"
                      type="number"
                      value={formData.parking}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {/* Flat-specific fields */}
              {propertyType === 'flat' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Floor Number"
                      name="floorNumber"
                      type="number"
                      value={formData.floorNumber}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Total Floors"
                      name="totalFloors"
                      type="number"
                      value={formData.totalFloors}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Society"
                      name="society"
                      value={formData.society}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {/* Bunglow-specific fields */}
              {propertyType === 'bunglow' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
              )}

              {/* Shop-specific fields */}
              {propertyType === 'shop' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Shop Number"
                      name="shopNumber"
                      value={formData.shopNumber}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Commercial Complex"
                      name="commercialComplex"
                      value={formData.commercialComplex}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Floor Number"
                      name="floorNumber"
                      type="number"
                      value={formData.floorNumber}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Frontage Size (ft)"
                      name="frontageSize"
                      type="number"
                      value={formData.frontageSize}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {/* Status */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Sold">Sold</MenuItem>
                    <MenuItem value="Reserved">Reserved</MenuItem>
                    <MenuItem value="Rented">Rented</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Availability Checkboxes */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isAvailableForSale}
                        onChange={handleChange}
                        name="isAvailableForSale"
                        sx={{
                          color: primaryColor,
                          '&.Mui-checked': {
                            color: primaryColor,
                          },
                        }}
                      />
                    }
                    label="Available for Sale"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={propertyType === 'flat' ? formData.availableForRent : formData.isAvailableForRent}
                        onChange={handleChange}
                        name={propertyType === 'flat' ? 'availableForRent' : 'isAvailableForRent'}
                        sx={{
                          color: primaryColor,
                          '&.Mui-checked': {
                            color: primaryColor,
                          },
                        }}
                      />
                    }
                    label="Available for Rent"
                  />
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/myproperties')}
                    sx={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      '&:hover': {
                        borderColor: primaryColor,
                        bgcolor: 'rgba(58, 110, 165, 0.1)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={submitting}
                    sx={{
                      bgcolor: primaryColor,
                      '&:hover': {
                        bgcolor: '#2d5580'
                      }
                    }}
                  >
                    {submitting ? 'Updating...' : 'Update Property'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}