import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  Chip,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  LocationOn,
  SquareFoot,
  LocalParking,
  Pool,
  Kitchen,
  Park,
  Security,
  Call,
  Email,
  WhatsApp,
  ArrowBack,
  BedOutlined,
  BathroomOutlined,
  HomeWorkOutlined,
} from '@mui/icons-material';

const BunglowDetail = () => {
  const { id } = useParams();
  const [bunglow, setBunglow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBunglow = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bunglow/singlebunglow/${id}`);
        setBunglow(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bunglow details:', error);
        setLoading(false);
      }
    };

    fetchBunglow();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!bunglow) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Bunglow not found</Typography>
        <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  const amenities = [
    { icon: <LocalParking />, label: 'Parking Space' },
    { icon: <Pool />, label: 'Swimming Pool' },
    { icon: <Kitchen />, label: 'Modular Kitchen' },
    { icon: <Park />, label: 'Park View' },
    { icon: <Security />, label: '24/7 Security' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'grey.900',
        }}
      >
        <motion.img
          src={bunglow.imgUrl?.[currentImageIndex] || 'https://via.placeholder.com/1200x800'}
          alt="Bunglow"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: 'white',
          }}
        >
          <Container>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              {bunglow.title || 'Luxury Bunglow'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<LocationOn />}
                label={bunglow.location}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              />
              <Chip
                label={`₹${bunglow.price.toLocaleString()}`}
                sx={{ bgcolor: 'secondary.main', color: 'white' }}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Container sx={{ mt: -5, mb: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
              <Typography variant="h5" sx={{ mb: 3 }}>Property Overview</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SquareFoot sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">{bunglow.sqrft} sq.ft</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Area</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BedOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">{bunglow.bedrooms || 4}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Bedrooms</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BathroomOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">{bunglow.bathrooms || 3}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Bathrooms</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <HomeWorkOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body1">{bunglow.floors || 2}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Floors</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Amenities */}
            <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
              <Typography variant="h5" sx={{ mb: 3 }}>Amenities</Typography>
              <Grid container spacing={3}>
                {amenities.map((amenity, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {amenity.icon}
                      <Typography variant="body1">{amenity.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Description */}
            <Paper sx={{ p: 4 }} elevation={3}>
              <Typography variant="h5" sx={{ mb: 3 }}>Description</Typography>
              <Typography variant="body1" color="text.secondary">
                {bunglow.description || `Luxurious ${bunglow.sqrft} sq.ft bunglow located in ${bunglow.location}. 
                This beautiful property features modern amenities, spacious rooms, and premium finishes throughout. 
                Perfect for families looking for comfort and elegance.`}
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }} elevation={3}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3 }}>Contact Agent</Typography>
                <Box sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Call />}
                    sx={{ mb: 2 }}
                  >
                    Call Now
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<WhatsApp />}
                    sx={{ mb: 2 }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Email />}
                  >
                    Email
                  </Button>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>Property Details</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Price</Typography>
                  <Typography variant="h5" color="primary.main">
                    ₹{bunglow.price.toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{bunglow.location}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BunglowDetail;