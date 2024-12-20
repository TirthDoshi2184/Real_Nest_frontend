import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
  Chip
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
  Store
} from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

const getPropertySize = (item) => {
  return `${item.size || 'N/A'} sq ft`;
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
    navigate('/aboutus');
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{
        height: '85vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.pixabay.com/photo/2019/09/30/16/00/house-4516175_640.jpg') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #6A82FB, #FC5C7D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Your Dream Home Awaits
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>Discover properties tailored to your needs with ease.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" size="large">Explore Listings</Button>
            <Button variant="outlined" size="large" onClick={handleLearnMore}>Learn More</Button>
          </Box>
        </Container>
      </Box>

      {/* Property Listings */}
      {[
        { title: 'Top Recent Flats', data: properties, currentSlide, prevSlide, nextSlide },
        { title: 'Top Famous Bunglows', data: bunglows, currentSlide: bunglowSlide, prevSlide: bunglowPrevSlide, nextSlide: bunglowNextSlide }
      ].map((section, index) => (
        <Container key={index} sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">{section.title}</Typography>
            <Box>
              <IconButton onClick={section.prevSlide}><ArrowBack /></IconButton>
              <IconButton onClick={section.nextSlide}><ArrowForward /></IconButton>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {section.data
              .slice(section.currentSlide * itemsPerSlide, section.currentSlide * itemsPerSlide + itemsPerSlide)
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Link to={`/pdetail/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card sx={{ '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={item.imgUrl || 'https://via.placeholder.com/240'}
                        alt={item.address || item.area}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.address || item.area}</Typography>
                        <Typography variant="body1" color="secondary">{(item.price)}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
            ))}
          </Grid>
        </Container>
      ))}

      {/* Services Section */}
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

      {/* Testimonials */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>What Our Clients Say</Typography>
        <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
          "An incredible platform that made finding my dream home easier than ever!"
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>- Mark Twain</Typography>
      </Container>

      <InvestmentGuide />
      <ContactSection />
    </Box>
  );
};

export default HomePage;