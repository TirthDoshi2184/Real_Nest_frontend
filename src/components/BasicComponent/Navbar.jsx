import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../Redux/CitySlice';
import { styled } from '@mui/system';

export const Navbar = () => {
  const [cities, setCities] = useState([]);
  const selectedCity = useSelector((state) => state.city.city);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/city/getcity');
        setCities(response.data.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    dispatch(changeCity(selectedCity));
  };

  const handleAddProperty = () => {
    window.location.href = "/user/addproperty";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  // Styled component for a custom select input
  const CustomSelect = styled(Select)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '8px',
    '& .MuiSelect-icon': {
      color: theme.palette.primary.contrastText,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }));

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h5" component="div" color="primary.contrastText" fontFamily="Montserrat, Arial, sans-serif">
        PrimeProperty Explorer
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomSelect
          value={selectedCity}
          onChange={handleCityChange}
          variant="outlined"
          sx={{ marginRight: 2, color: 'white', backgroundColor: 'primary.main' }}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select City
          </MenuItem>
          {cities?.map((city) => (
            <MenuItem key={city._id} value={city._id}>
              {city.city}
            </MenuItem>
          ))}
        </CustomSelect>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddProperty}
          sx={{ marginRight: 2 }}
        >
          Add Property
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};
