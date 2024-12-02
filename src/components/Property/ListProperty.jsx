import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Box, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../Redux/CitySlice';

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCity = useSelector((state) => state.city.city);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      const fetchProperties = async () => {
        try {
          let url = 'http://localhost:3000/flat/getflat';
          if (selectedCity) {
            url += `?city=${selectedCity}`;
          }
          const response = await axios.get(url);
          setProperties(response.data.data);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };
      fetchProperties();
    }, [selectedCity]);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    dispatch(changeCity(selectedCity));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProperties = properties.filter((property) => {
    const price = property?.price?.toString().toLowerCase() || '';
    const type = property?.type?.toString().toLowerCase() || '';
    const area = property?.location?.toString().toLowerCase() || '';
    return (
      price.includes(searchQuery.toLowerCase()) ||
      type.includes(searchQuery.toLowerCase()) ||
      area.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box sx={{ padding: '30px 0', backgroundColor: '#F4F7FA' }}>
      <Container maxWidth="lg">
        {/* Search Box */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <TextField
            label="Search Properties"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4CAF50',
                },
                '&:hover fieldset': {
                  borderColor: '#388E3C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#388E3C',
                },
              },
            }}
          />
        </Box>

        {/* Property Listings */}
        <Grid container spacing={4}>
          {filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
              <Card sx={{ borderRadius: '16px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={property.imgUrl}
                  alt={property.society?.name || 'Property Image'}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="600">
                    {property.type || 'Flat type'}
                  </Typography>
                  <Typography color="textSecondary">{property.location || 'Unknown Location'}</Typography>
                  <Typography variant="body1" color="textPrimary" fontWeight="700" mt={1}>
                    {property.price ? `$${property.price}` : 'Price not available'}
                  </Typography>
                  <Link to={`/pdetail/${property._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>     
      </Container>
    </Box>


);
};

export default ListProperty;
