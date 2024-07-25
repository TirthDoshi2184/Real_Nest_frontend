import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Box, Button, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCities, setSelectedCity,fetchCities } from '../Redux/CityFilter';
// import { setCities, setSelectedCity, fetchCities } from './CityFilter';

const cardStyles = {
  root: {
    maxWidth: 260,
    margin: 'auto',
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
};

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const cities = useSelector((state) => state.city.cities);
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let url = "http://localhost:3000/flat/getflat";
        if (selectedCity) {
          url += `?city=${selectedCity}`;
        }
        const response = await axios.get(url);
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [selectedCity]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    dispatch(setSelectedCity(selectedCity));
  };

  const handleAddProperty = () => {
    navigate("/user/addproperty");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const filteredProperties = properties.filter(property =>
    property?.society?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property?.price?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Box sx={{ bgcolor: '#f0f0f0', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Company Name
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            variant="outlined"
            style={{ marginRight: 10 }}
          >
            <MenuItem value="">Select City</MenuItem>
            {cities?.map((city) => (
              <MenuItem key={city.id} value={city._id}>
                {city.city}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" onClick={handleAddProperty} style={{ marginRight: 10 }}>
            Add Property
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>

      <TextField
        label="Search Properties"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: 20, marginTop: 10 }}
      />

      <Grid container spacing={2}>
        {filteredProperties.map((pr) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={pr?._id}>
            <Card style={cardStyles.root}>
              <CardMedia
                style={cardStyles.media}
                image={pr?.imgUrl}
                title={pr?.society?.name || 'Property Image'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {pr?.society?.name || 'Society Name'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {pr?.price ? `Price: ${pr.price}` : 'Price not available'}
                </Typography>
                <Button variant="contained" color="success">View Property</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ListProperty;
