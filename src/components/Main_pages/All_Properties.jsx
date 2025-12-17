import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Button,
  ButtonGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StorefrontIcon from '@mui/icons-material/Storefront';

const primaryColor = '#3a6ea5';

export default function AllProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, flats, bunglows, shops

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      setError('');

      const [flatsRes, bunglowsRes, shopsRes] = await Promise.all([
        axios.get('http://localhost:3000/flat/getflat'),
        axios.get('http://localhost:3000/bunglow/getbunglow'),
        axios.get('http://localhost:3000/shop/getshop')
      ]);

      const flats = flatsRes.data.data.map(item => ({ ...item, propertyType: 'Flat' }));
      const bunglows = bunglowsRes.data.data.map(item => ({ ...item, propertyType: 'Bunglow' }));
      const shops = shopsRes.data.data.map(item => ({ ...item, propertyType: 'Shop' }));

      setProperties([...flats, ...bunglows, ...shops]);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (propertyId) => {
    navigate(`/pdetail/${propertyId}`);
  };

  const getFilteredProperties = () => {
    if (filter === 'all') return properties;
    return properties.filter(p => p.propertyType.toLowerCase() === filter);
  };

  const filteredProperties = getFilteredProperties();

  const formatPrice = (price) => {
  if (!price || price === 0) {
    return 'Price not available';
  }
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lac`;
  }
  return `₹${price.toLocaleString()}`;
};

  const getPropertyIcon = (type) => {
    switch (type) {
      case 'Flat':
        return <ApartmentIcon />;
      case 'Bunglow':
        return <HomeIcon />;
      case 'Shop':
        return <StorefrontIcon />;
      default:
        return <HomeIcon />;
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
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: primaryColor,
              fontWeight: 'bold',
              mb: 1
            }}
          >
            All Properties
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            Find your dream property from our extensive collection
          </Typography>
        </Box>

        {/* Filter Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ButtonGroup variant="contained" sx={{ boxShadow: 2 }}>
            <Button
              onClick={() => setFilter('all')}
              sx={{
                bgcolor: filter === 'all' ? primaryColor : 'white',
                color: filter === 'all' ? 'white' : primaryColor,
                '&:hover': {
                  bgcolor: filter === 'all' ? primaryColor : '#e3f2fd'
                }
              }}
            >
              All ({properties.length})
            </Button>
            <Button
              onClick={() => setFilter('flat')}
              sx={{
                bgcolor: filter === 'flats' ? primaryColor : 'white',
                color: filter === 'flats' ? 'white' : primaryColor,
                '&:hover': {
                  bgcolor: filter === 'flats' ? primaryColor : '#e3f2fd'
                }
              }}
            >
              Flats ({properties.filter(p => p.propertyType === 'Flat').length})
            </Button>
            <Button
              onClick={() => setFilter('bunglow')}
              sx={{
                bgcolor: filter === 'bunglows' ? primaryColor : 'white',
                color: filter === 'bunglows' ? 'white' : primaryColor,
                '&:hover': {
                  bgcolor: filter === 'bunglows' ? primaryColor : '#e3f2fd'
                }
              }}
            >
              Bunglows ({properties.filter(p => p.propertyType === 'Bunglow').length})
            </Button>
            <Button
              onClick={() => setFilter('shop')}
              sx={{
                bgcolor: filter === 'shops' ? primaryColor : 'white',
                color: filter === 'shops' ? 'white' : primaryColor,
                '&:hover': {
                  bgcolor: filter === 'shops' ? primaryColor : '#e3f2fd'
                }
              }}
            >
              Shops ({properties.filter(p => p.propertyType === 'Shop').length})
            </Button>
          </ButtonGroup>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: '#666' }}>
              No properties found
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => handleCardClick(property._id)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.imgUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={property.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Property Type Badge */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        icon={getPropertyIcon(property.propertyType)}
                        label={property.propertyType}
                        size="small"
                        sx={{
                          bgcolor: primaryColor,
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip
                        label={property.status || 'Available'}
                        size="small"
                        color={property.status === 'Available' ? 'success' : 'default'}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: primaryColor,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {property.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {property.description}
                    </Typography>

                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 18, color: primaryColor, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.city}, {property.location}
                      </Typography>
                    </Box>

                    {/* Area */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <SquareFootIcon sx={{ fontSize: 18, color: primaryColor, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.sqrft || property.area} sq.ft
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #e0e0e0'
                      }}
                    >
                      <CurrencyRupeeIcon sx={{ fontSize: 20, color: primaryColor }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: primaryColor
                        }}
                      >
                        {formatPrice(property.price)}
                      </Typography>
                    </Box>

                    {/* Availability Tags */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      {property.isAvailableForSale && (
                        <Chip
                          label="For Sale"
                          size="small"
                          sx={{ bgcolor: '#e3f2fd', color: primaryColor }}
                        />
                      )}
                      {(property.isAvailableForRent || property.availableForRent) && (
                        <Chip
                          label="For Rent"
                          size="small"
                          sx={{ bgcolor: '#fff3e0', color: '#f57c00' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}