import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Home,
  AspectRatio,
  AttachMoney,
  Bed,
  Bathtub,
  DirectionsCar,
  Stairs,
  Store,
  Villa,
  CheckCircle,
  Email,
  Phone,
  Person
} from '@mui/icons-material';

const primaryColor = '#3a6ea5';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      setError('');

      // Try fetching from all three endpoints
      let data = null;
      let type = '';

      try {
        const flatRes = await fetch(`http://localhost:3000/flat/singleflat/${id}`);
        const flatData = await flatRes.json();
        if (flatData.success) {
          data = flatData.data;
          type = 'flat';
        }
      } catch (err) {}

      if (!data) {
        try {
          const shopRes = await fetch(`http://localhost:3000/shop/singleshop/${id}`);
          const shopData = await shopRes.json();
          if (shopData.success) {
            data = shopData.data;
            type = 'shop';
          }
        } catch (err) {}
      }

      if (!data) {
        try {
          const bunglowRes = await fetch(`http://localhost:3000/bunglow/singlebunglow/${id}`);
          const bunglowData = await bunglowRes.json();
          if (bunglowData.success) {
            data = bunglowData.data;
            type = 'bunglow';
          }
        } catch (err) {}
      }

      if (data) {
        console.log('Fetched Property Data:', data);
        setProperty(data);
        setPropertyType(type);
      } else {
        setError('Property not found');
      }
    } catch (err) {
      setError('Error fetching property: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getPropertyIcon = () => {
    switch (propertyType) {
      case 'flat':
        return <Home sx={{ fontSize: 40, color: primaryColor }} />;
      case 'shop':
        return <Store sx={{ fontSize: 40, color: primaryColor }} />;
      case 'bunglow':
        return <Villa sx={{ fontSize: 40, color: primaryColor }} />;
      default:
        return <Home sx={{ fontSize: 40, color: primaryColor }} />;
    }
  };

  const handleInquiry = () => {
  navigate(`/inquiry/${id}`); // Navigate to inquiry form with property ID
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

  if (error || !property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Property not found'}</Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/allproperties')}
          sx={{ mt: 2, color: primaryColor }}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/allproperties')}
          sx={{ mb: 3, color: primaryColor }}
        >
          Back to Properties
        </Button>

        {/* Main Image and Basic Info */}
        <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              height: 500,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={property.imgUrl || 'https://via.placeholder.com/1200x500'}
              alt={property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                display: 'flex',
                gap: 1
              }}
            >
              <Chip
                icon={getPropertyIcon()}
                label={propertyType.toUpperCase()}
                sx={{
                  bgcolor: 'white',
                  color: primaryColor,
                  fontWeight: 'bold'
                }}
              />
              <Chip
                label={property.status}
                color={property.status === 'Available' ? 'success' : 'default'}
                sx={{ bgcolor: 'white', fontWeight: 'bold' }}
              />
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: primaryColor, mb: 1 }}>
                  {property.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                  <LocationOn />
                  <Typography variant="body1">
                    {property.address}, {property.city} - {property.pincode}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: primaryColor }}>
                  {formatPrice(property.price)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { md: 'flex-end' }, mt: 1 }}>
                  {property.isAvailableForSale && (
                    <Chip label="For Sale" size="small" sx={{ bgcolor: '#e3f2fd', color: primaryColor }} />
                  )}
                  {(property.isAvailableForRent || property.availableForRent) && (
                    <Chip label="For Rent" size="small" sx={{ bgcolor: '#fff3e0', color: '#f57c00' }} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column - Property Details */}
          <Grid item xs={12} md={8}>
            {/* Description */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: primaryColor }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
                {property.description}
              </Typography>
            </Paper>

            {/* Property Features */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: primaryColor }}>
                Property Features
              </Typography>
              <Grid container spacing={2}>
                {/* Common Features */}
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <AspectRatio sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Area
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {property.sqrft || property.area} sq.ft
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {propertyType === 'flat' && (
                  <>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Home sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Type
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.type}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Stairs sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Floor
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.floorNumber}/{property.totalFloors}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <DirectionsCar sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Parking
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.parking}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}

                {propertyType === 'bunglow' && (
                  <>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Villa sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Type
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.type}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Bed sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Bedrooms
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.bedrooms}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Bathtub sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Bathrooms
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.bathrooms}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <DirectionsCar sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Parking
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.parking}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}

                {propertyType === 'shop' && (
                  <>
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Store sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Shop Type
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.shopType}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    {property.shopNumber && (
                      <Grid item xs={6} sm={4}>
                        <Card variant="outlined">
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Shop Number
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {property.shopNumber}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                    {property.commercialComplex && (
                      <Grid item xs={6} sm={4}>
                        <Card variant="outlined">
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Complex
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {property.commercialComplex}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                    <Grid item xs={6} sm={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Stairs sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Floor
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {property.floorNumber}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    {property.frontageSize > 0 && (
                      <Grid item xs={6} sm={4}>
                        <Card variant="outlined">
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Frontage
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {property.frontageSize} ft
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </>
                )}

                <Grid item xs={6} sm={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 32, color: primaryColor, mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Interior
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {property.interiorType}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>

            {/* Additional Details */}
            {((propertyType === 'bunglow' && property.amenities) || 
              (propertyType === 'flat' && property.society)) && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: primaryColor }}>
                  Additional Information
                </Typography>
                {propertyType === 'bunglow' && property.amenities && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Amenities
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      {property.amenities}
                    </Typography>
                  </Box>
                )}
                {propertyType === 'flat' && property.society && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Society
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      {property.society}
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Grid>

          {/* Right Column - Contact Info & Inquiry */}
          <Grid item xs={12} md={4}>
            {/* Owner Information */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: primaryColor }}>
                Owner Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Person sx={{ fontSize: 40, color: primaryColor }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {property.user?.fullname || 'Property Owner'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.user?.role || 'Seller'}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Location Details */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: primaryColor }}>
                Location
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Area
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {property.location}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  City
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {property.city}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pincode
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {property.pincode}
                </Typography>
              </Box>
            </Paper>

            {/* Inquiry Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleInquiry}
              sx={{
                bgcolor: primaryColor,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#2d5580'
                }
              }}
            >
              Send Inquiry
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}