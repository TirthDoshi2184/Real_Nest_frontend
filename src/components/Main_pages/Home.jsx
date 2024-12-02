import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  DialogTitle
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { HomeWorkOutlined, KeyOutlined, AttachMoneyOutlined, EmailOutlined, PhoneOutlined, ChatOutlined } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

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
    // Implement form submission logic
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
              <Button variant="outlined" color="primary" startIcon={<PhoneOutlined />}>
                Call Support
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
                  { label: 'Phone', value: '+1 (555) 123-4567' },
                  { label: 'Email', value: 'support@dreamhome.com' },
                  { label: 'Office', value: '123 Property Lane, City, State' }
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

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [properties, setProperties] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/flat/getflat')
      .then((res) => setProperties(res.data.data))
      .catch((err) => console.error('Error fetching properties:', err));
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % properties.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);
  const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;

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
            <Button variant="outlined" size="large">Learn More</Button>
          </Box>
        </Container>
      </Box>

      {/* Properties Slider */}
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Top Searched Properties</Typography>
          <Box>
            <IconButton onClick={prevSlide}><ArrowBack /></IconButton>
            <IconButton onClick={nextSlide}><ArrowForward /></IconButton>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {properties.slice(currentSlide, currentSlide + itemsPerSlide).map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Link to={`/pdetail/${property._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={property.imgUrl || 'https://via.placeholder.com/240'}
                    alt={property.address}
                  />
                  <CardContent>
                    <Typography variant="h6">{property.address}</Typography>
                    <Typography variant="body1" color="secondary">{property.price}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

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

      {/* Testimonial Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>What Our Clients Say</Typography>
        <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
          "An incredible platform that made finding my dream home easier than ever!"
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>- Jane Doe</Typography>
      </Container>

      {/* New Investment Guide and Contact Sections */}
      <InvestmentGuide />
      <ContactSection />
    </Box>
  );
};

export default HomePage;
