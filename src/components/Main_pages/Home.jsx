import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [properties, setProperties] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/flat/getflat');
        setProperties(response.data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === properties.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? properties.length - 1 : prev - 1
    );
  };

  const getSliderConfig = () => {
    if (isMobile) return { itemsPerSlide: 1 };
    if (isTablet) return { itemsPerSlide: 2 };
    return { itemsPerSlide: 3 };
  };

  const { itemsPerSlide } = getSliderConfig();

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
     {/* Enhanced Hero Section */}
     <Box
  sx={{
    width: '100%',
    height: '85vh',
    backgroundImage: `url('https://cdn.pixabay.com/photo/2019/09/30/16/00/house-4516175_640.jpg')`, // High-resolution image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {/* Gradient Overlay */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for better text contrast
    }}
  />
  {/* Content */}
  <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
    {/* Animated Headline */}
    <Typography
      variant="h2"
      sx={{
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #6A82FB, #FC5C7D)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'fadeIn 1.5s ease',
      }}
    >
      Your Dream Home Awaits
    </Typography>

    {/* Subheading */}
    <Typography
      variant="h5"
      sx={{
        mt: 2,
        mb: 4,
        color: 'rgba(255,255,255,0.8)',
        animation: 'slideIn 2s ease',
      }}
    >
      Discover properties tailored to your needs with ease.
    </Typography>

    {/* Call-to-Action Buttons */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        animation: 'fadeInUp 2.5s ease',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          textTransform: 'uppercase',
          px: 4,
          py: 1.5,
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        Explore Listings
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{
          textTransform: 'uppercase',
          px: 4,
          py: 1.5,
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        Learn More
      </Button>
    </Box>
  </Container>

  {/* Decorative Elements */}
  <Box
    sx={{
      position: 'absolute',
      bottom: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      animation: 'bounce 2s infinite',
    }}
  >
    <Typography
      variant="body2"
      sx={{ color: 'rgba(255,255,255,0.8)' }}
    >
      Scroll Down for More
    </Typography>
    {/* <ArrowDownwardIcon
      sx={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: '2rem',
      }}
    /> */}
  </Box>
</Box>
      {/* Properties Slider */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Top Searched Properties
          </Typography>
          <Box>
            <IconButton onClick={prevSlide} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <IconButton onClick={nextSlide} color="primary">
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Responsive Property Grid */}
        <Grid container spacing={2}>
          {properties
            .slice(currentSlide, currentSlide + itemsPerSlide)
            .map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Link to={`/pdetail/${property._id}`} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                      textDecoration: 'none',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={property.imgUrl || 'https://via.placeholder.com/240'}
                      alt={property.address}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        {property.address}
                      </Typography>
                      <Typography variant="body1" color="secondary.main">
                        {property.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
      {/* Home Page Footer */}

{/* Services Section */}
   <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
     <Container>
       <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 700 }}>
         Our Services
       </Typography>
       <Grid container spacing={4}>
         {[
           { 
             icon: "🏡", 
             title: "Buy a Home", 
             description: "Browse our extensive listings and find your perfect home." 
           },
           { 
             icon: "🔑", 
             title: "Rent a Property", 
             description: "Find the ideal rental that suits your lifestyle and budget." 
           },
           { 
             icon: "💰", 
             title: "Sell Your Home", 
             description: "Get the best value for your property with our expert guidance." 
           }
         ].map((service, index) => (
           <Grid item xs={12} md={4} key={index}>
             <Card 
               sx={{ 
                 p: 3, 
                 textAlign: 'center',
                 transition: 'box-shadow 0.3s',
                 '&:hover': { boxShadow: 3 } 
               }}
             >
               <Typography variant="h2" sx={{ mb: 2 }}>
                 {service.icon}
               </Typography>
               <Typography variant="h6" sx={{ mb: 2 }}>
                 {service.title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                 {service.description}
               </Typography>
             </Card>
           </Grid>
         ))}
       </Grid>
     </Container>
   </Box>

   {/* Testimonial Section */}
   <Container sx={{ py: 8, textAlign: 'center' }}>
     <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
       What Our Clients Say
     </Typography>
     <Typography 
       variant="h6" 
       sx={{ 
         maxWidth: 'md', 
         mx: 'auto', 
         mb: 2, 
         fontStyle: 'italic',
         color: 'text.secondary'
       }}
     >
       "An incredible platform that made finding my dream home easier than ever!"
     </Typography>
     <Typography variant="body1" sx={{ fontWeight: 600 }}>
       - Jane Doe, Happy Homeowner
     </Typography>
     </Container>
    </Box>
  );
};

export default HomePage;