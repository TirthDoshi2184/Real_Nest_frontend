import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';

const primaryColor = '#3a6ea5';

export default function InquiryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [property, setProperty] = useState(null);

  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    message: ''
  });

  useEffect(() => {
    fetchPropertyAndUserData();
  }, [id]);

  const fetchPropertyAndUserData = async () => {
    try {
      setLoading(true);
      
      // Get user data from sessionStorage
      const userId = sessionStorage.getItem('id');
      const userRole = sessionStorage.getItem('role');
      const userName = sessionStorage.getItem('fullName');
      const userEmail = sessionStorage.getItem('email');
      const userPhone = sessionStorage.getItem('phone');

      if (!userId) {
        setError('Please login to send an inquiry');
        return;
      }

      // Pre-fill user data
      setFormData(prev => ({
        ...prev,
        buyerName: userName || '',
        buyerEmail: userEmail || '',
        buyerPhone: userPhone || ''
      }));

      // Fetch property details
      let propertyData = null;
      
      try {
        const flatRes = await fetch(`http://localhost:3000/flat/singleflat/${id}`);
        const flatData = await flatRes.json();
        if (flatData.success) propertyData = { ...flatData.data, type: 'flat' };
      } catch (err) {}

      if (!propertyData) {
        try {
          const shopRes = await fetch(`http://localhost:3000/shop/singleshop/${id}`);
          const shopData = await shopRes.json();
          if (shopData.success) propertyData = { ...shopData.data, type: 'shop' };
        } catch (err) {}
      }

      if (!propertyData) {
        try {
          const bunglowRes = await fetch(`http://localhost:3000/bunglow/singlebunglow/${id}`);
          const bunglowData = await bunglowRes.json();
          if (bunglowData.success) propertyData = { ...bunglowData.data, type: 'bunglow' };
        } catch (err) {}
      }

      if (propertyData) {
        setProperty(propertyData);
      } else {
        setError('Property not found');
      }

    } catch (err) {
      setError('Error loading data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPropertyAvailability = () => {
    if (!property) return 'buying';
    
    const isForSale = property.isAvailableForSale;
    const isForRent = property.isAvailableForRent || property.availableForRent;
    
    if (isForSale && isForRent) return 'both';
    if (isForRent) return 'renting';
    return 'buying';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.buyerName || !formData.buyerEmail || !formData.buyerPhone || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.buyerEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.buyerPhone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setSubmitLoading(true);

      const buyerId = sessionStorage.getItem('id');
      

      const inquiryData = {
        propertyId: id,
        propertyType: property.type,
        buyerId,
        buyerName: formData.buyerName,
        buyerEmail: formData.buyerEmail,
        buyerPhone: formData.buyerPhone,
        message: formData.message,
        interestedIn: getPropertyAvailability() // Automatically determine from property
      };

      const response = await fetch('http://localhost:3000/inquire/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inquiryData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Inquiry sent successfully! The seller will contact you soon.');
        setTimeout(() => {
          navigate('/my-inquiries');
        }, 2000);
      } else {
        setError(data.message || 'Failed to send inquiry');
      }

    } catch (err) {
      setError('Error sending inquiry: ' + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/property/${id}`)}
          sx={{ mb: 3, color: primaryColor }}
        >
          Back to Property
        </Button>

        <Grid container spacing={3}>
          {/* Property Summary Card */}
          <Grid item xs={12} md={4}>
            {property && (
              <Card elevation={3}>
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${property.imgUrl || 'https://via.placeholder.com/400x200'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {property.location}, {property.city}
                  </Typography>
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                    ₹{property.price?.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    {property.isAvailableForSale && (
                      <Chip label="For Sale" size="small" color="primary" />
                    )}
                    {(property.isAvailableForRent || property.availableForRent) && (
                      <Chip label="For Rent" size="small" color="secondary" />
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Inquiry Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: primaryColor }}>
                Send Inquiry
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="buyerEmail"
                      type="email"
                      value={formData.buyerEmail}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="buyerPhone"
                      value={formData.buyerPhone}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Write your message or questions about the property..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={submitLoading}
                      startIcon={submitLoading ? <CircularProgress size={20} /> : <Send />}
                      sx={{
                        bgcolor: primaryColor,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: '#2d5580'
                        }
                      }}
                    >
                      {submitLoading ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}