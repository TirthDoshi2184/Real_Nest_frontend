import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  HomeWorkOutlined,
  KeyOutlined,
  AttachMoneyOutlined,
  EmailOutlined,
  PhoneOutlined,
  ChatOutlined,
  Home,
  Store,
  LocationOn,
  Style,
  Search,
  Timer
} from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

// Initialize AOS
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

const InvestmentGuide = () => (
  <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 6 }}>
        Real Estate Investment Journey
      </Typography>
      <Timeline position="alternate">
        {[
          { title: 'Market Research', description: 'Comprehensive analysis of local property markets', icon: <HomeWorkOutlined /> },
          { title: 'Financial Planning', description: 'Develop strategic investment strategies', icon: <AttachMoneyOutlined /> },
          { title: 'Property Selection', description: 'Identify high-potential properties', icon: <KeyOutlined /> },
        ].map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">{step.icon}</TimelineDot>
              {index < 2 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">{step.title}</Typography>
                <Typography variant="body2">{step.description}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  </Box>
);

const ContactSection = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    console.log(formData);
    setOpen(false);
  };

 
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ mb: 3 }}>Connect with Our Team</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Have questions or need personalized property advice? Our experts are ready to help you make informed decisions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" startIcon={<EmailOutlined />} onClick={() => setOpen(true)}>
                Email Us
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, boxShadow: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ChatOutlined sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Quick Communication Channels</Typography>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: 'Phone', value: '+91 98985 43898' },
                  { label: 'Email', value: 'realnest2109@gmail.com' },
                  { label: 'Office', value: '23,Aditya Complex, Paldi' }
                ].map((contact, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography variant="subtitle1">{contact.label}:</Typography>
                    <Typography variant="body2" color="text.secondary">{contact.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Contact Our Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Send</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const StatisticsSection = () => (
  <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
    <Container>
      <Grid container spacing={4}>
        {[
          { number: '1000+', label: 'Properties Listed', icon: <Home /> },
          { number: '500+', label: 'Happy Clients', icon: <Style /> },
          { number: '50+', label: 'Cities Covered', icon: <LocationOn /> },
          { number: '24/7', label: 'Support Available', icon: <Timer /> }
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                {stat.icon}
                <Typography variant="h4" sx={{ my: 2, fontWeight: 'bold' }}>{stat.number}</Typography>
                <Typography variant="body1">{stat.label}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
const getPropertyDetailPath = (propertyType, itemId) => {
  switch (propertyType) {
    case 'flat':
      return `/pdetail/${itemId}`;
    case 'bunglow':
      return `/pdetail/${itemId}`;
    case 'shop':
      return `/pdetail/${itemId}`;
    case 'plot':
      return `/plot-detail/${itemId}`;
    default:
      return `/property-detail/${itemId}`;
  }
};
const PropertyCard = ({ item, index, propertyType }) => (
  
  <motion.div
  whileHover={{ scale: 1.03 }}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <Link 
    to={getPropertyDetailPath(propertyType, item._id)} 
    style={{ textDecoration: 'none' }}
  >
    <Card sx={{
      height: '100%',
      position: 'relative',
      '&:hover': {
        boxShadow: 20,
        '& .property-details': { transform: 'translateY(0)' }
      }
    }}>
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          image={item.imgUrl || 'https://via.placeholder.com/400x300'}
          alt={item.address || item.area}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>
      <Box 
        className="property-details" 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          p: 2,
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <Typography variant="h6" noWrap>{item.address || item.sqrft}</Typography>
        <Typography variant="h5" color="primary">{item.price}</Typography>
        <Chip
          label={`${item.sqrft || '343'} sq ft`}
          size="small"
          sx={{ mt: 1, bgcolor: 'primary.main', color: 'white' }}
        />
      </Box>
    </Card>
  </Link>
</motion.div>
);

const SearchSection = () => (
  <Box
    sx={{
      py: 4,
      backgroundColor: 'background.paper',
      borderRadius: '16px',
      mx: 2,
      mt: -8,
      position: 'relative',
      zIndex: 2,
      boxShadow: 3
    }}
    data-aos="fade-up"
  >
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            InputProps={{
              startAdornment: <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Property Type"
            variant="outlined"
            select
            SelectProps={{ native: true }}
          >
            <option value="">All Types</option>
            <option value="flat">Flat</option>
            <option value="bunglow">Bunglow</option>
            <option value="shop">Shop</option>
            <option value="plot">Plot</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Price Range"
            variant="outlined"
            select
            SelectProps={{ native: true }}
          >
            <option value="">Any Price</option>
            <option value="0-5000000">Under 50 Lakh</option>
            <option value="5000000-10000000">50 Lakh - 1 Cr</option>
            <option value="10000000+">Above 1 Cr</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Search />}
            sx={{ height: '56px' }}
          >
            Search Properties
          </Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const FeaturedCategories = () => (
  <Box sx={{ py: 3, backgroundColor: '#f5f5f5' }}>
  <Container>
    <Typography variant="h4" align="center" sx={{ mb: 6 }}>
      Browse by Property Type
    </Typography>
    <Grid container spacing={2}>
      {[
        { title: 'Residential Flats', icon: '🏢', count: '5+' },
        { title: 'Luxury Bunglows', icon: '🏠', count: '5+' },
        { title: 'Commercial Shops', icon: '🏪', count: '4+' },
      ].map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography variant="h2" sx={{ mb: 2 }}>
                {category.icon}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {category.title}
              </Typography>
              <Typography variant="body1" color="primary.main">
                {category.count} listings
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
);

const Testomorial = () => (
  <Container sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ mb: 4 }}>What Our Clients Say</Typography>
    <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
      "An incredible platform that made finding my dream home easier than ever!"
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>- Mark Twain</Typography>
  </Container>

)

const ServiceSection = () => (
  <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>Our Services</Typography>
      <Grid container spacing={4}>
        {[
          { icon: '🏡', title: 'Buy a Home', desc: 'Browse our extensive listings and find your perfect home.' },
          { icon: '🔑', title: 'Rent a Property', desc: 'Find the ideal rental that suits your lifestyle and budget.' },
          { icon: '💰', title: 'Sell Your Home', desc: 'Get the best value for your property with our expert guidance.' },
        ].map((service, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ textAlign: 'center', p: 3, '&:hover': { boxShadow: 3 } }}>
              <Typography variant="h2">{service.icon}</Typography>
              <Typography variant="h6">{service.title}</Typography>
              <Typography variant="body2" color="text.secondary">{service.desc}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)


const HomePage = ({ title, subtitle, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [shops, setShops] = useState([]);
  const [bunglows, setBunglows] = useState([]);
  const [plots, setPlots] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bunglowSlide, setBunglowSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flatsRes, shopsRes, bunglowsRes, plotsRes] = await Promise.all([
          axios.get('http://localhost:3000/flat/getflat'),
          axios.get('http://localhost:3000/shop/getshop'),
          axios.get('http://localhost:3000/bunglow/getbunglow'),
          axios.get('http://localhost:3000/plot/getplot')
        ]);

        setProperties(flatsRes.data.data);
        setShops(shopsRes.data.data);
        setBunglows(bunglowsRes.data.data);
        setPlots(plotsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev < Math.ceil(properties.length / itemsPerSlide) - 1 ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev > 0 ? prev - 1 : prev);
  };

  const bunglowNextSlide = () => {
    setBunglowSlide((prev) =>
      prev < Math.ceil(bunglows.length / itemsPerSlide) - 1 ? prev + 1 : prev
    );
  };

  const bunglowPrevSlide = () => {
    setBunglowSlide((prev) => prev > 0 ? prev - 1 : prev);
  };

  const handleLearnMore = () => {
    navigate('/');
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Enhanced Hero Section */}
      <Box sx={{
        height: '92vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.pixabay.com/photo/2019/09/30/16/00/house-4516175_640.jpg') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <Container sx={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6A82FB, #FC5C7D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Discover Your Perfect Property
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Your journey to finding the ideal property starts here
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
  variant="contained"
  size="large"
  sx={{ px: 4, py: 1.5 }}
  onClick={() => navigate("/allproperties")}
>
  Start Exploring
</Button>

              <Button
                variant="outlined"
                size="large"
                sx={{ px: 4, py: 1.5, color: 'white', borderColor: 'white' }}
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
      {/* 
        <SearchSection />
        <StatisticsSection /> */}
      <FeaturedCategories />

      {/* Enhanced Property Listings */}
      {[
        { title: 'Featured Flats', data: properties, currentSlide, prevSlide, nextSlide, propertyType: 'flat' },
        { title: 'Luxury Bunglows', data: bunglows, currentSlide: bunglowSlide, prevSlide: bunglowPrevSlide, nextSlide: bunglowNextSlide, propertyType: 'bunglow' }
      ].map((section, index) => (
        <Container key={index} sx={{ py: 6 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }} data-aos="fade-right">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{section.title}</Typography>
            <Box>
              <IconButton onClick={section.prevSlide}><ArrowBack /></IconButton>
              <IconButton onClick={section.nextSlide}><ArrowForward /></IconButton>
            </Box>
          </Box>
          <Grid container spacing={3}>
            {section.data
              .slice(section.currentSlide * itemsPerSlide, section.currentSlide * itemsPerSlide + itemsPerSlide)
              .map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <PropertyCard 
                    item={item} 
                    index={idx} 
                    propertyType={section.propertyType}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      ))}

      {/* Services Section */}
      <ServiceSection />
      {/* Testimonials */}
      <Testomorial />
      {/* InvestmentGuide */}
      <InvestmentGuide />
      {/* Contact Section */}
      <ContactSection />
    </Box>
  );
};

export default HomePage;