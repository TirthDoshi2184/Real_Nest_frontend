import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Typography, Card, CardContent, CardMedia, Button, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeCity } from '../Redux/CitySlice';

const Flatproperty = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const selectedCity = useSelector((state) => state.city.city);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const url = selectedCity 
          ? `http://localhost:3000/flat/getflat?city=${selectedCity}`
          : 'http://localhost:3000/flat/getflat';
        const response = await axios.get(url);
        setProperties(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProperties();
  }, [selectedCity]);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = [
      property?.price?.toString(),
      property?.type,
      property?.location
    ].some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = filterType === 'all' || property?.type?.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Apartment', 'House', 'Villa', 'Luxury'];
  const featuredProperties = properties.slice(0, 3);
  const recentProperties = [...properties].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box sx={{
        height: '70vh',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, color: 'white' }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
              Find Your Perfect Home
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Discover the most luxurious and comfortable properties
            </Typography>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Featured Properties */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Featured Properties
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {featuredProperties.map((property) => (
            <Card key={property._id} sx={{
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }
            }}>
              <Box sx={{ position: 'relative' }}>
              <CardMedia
  component="img"
  height="300"                    // Increased from 250px for better showcase
  width="100%"                    // Ensures full width
  image={property.imageUrl}
  alt={property.type}
  sx={{
    objectFit: 'cover',          // Ensures image covers area without distortion
    aspectRatio: '16/9',         // Maintains consistent aspect ratio
  }}
/>
                <Box sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2
                }}>
                  Featured
                </Box>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {property.type}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {property.location}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight={700} sx={{ mb: 2 }}>
                  ₹{property.price?.toLocaleString()}
                </Typography>
                <Link to={`/pdetail/${property._id}`} style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="contained">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Browse by Category
          </Typography>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => {
              setActiveTab(newValue);
              setFilterType(categories[newValue].toLowerCase());
            }}
            sx={{ mb: 4 }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category}
                label={category}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: 'primary.main'
                  }
                }}
              />
            ))}
          </Tabs>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {filteredProperties.map((property) => (
              <Card key={property._id} sx={{
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <CardMedia
  component="img"
  height="240"                    // Adjusted from 200px for better visibility
  width="100%"
  image={property.imageUrl}
  alt={property.type}
  sx={{
    objectFit: 'cover',
    aspectRatio: '4/3',          // Slightly more square ratio for property display
  }}
/>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {property.type}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {property.location}
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight={600} gutterBottom>
                    ₹{property.price?.toLocaleString()}
                  </Typography>
                  <Link to={`/pdetail/${property._id}`} style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Recent Properties */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Recent Properties
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3
        }}>
          {recentProperties.map((property) => (
            <Card key={property._id} sx={{
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <CardMedia
  component="img"
  height="200"                    // Adjusted from 160px for consistency
  width="100%"
  image={property.imageUrl}
  alt={property.type}
  sx={{
    objectFit: 'cover',
    aspectRatio: '3/2',
  }}
/>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {property.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.location}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{property.price?.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Flatproperty;