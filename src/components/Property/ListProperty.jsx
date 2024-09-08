import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { changeCity } from '../Redux/CitySlice';

const cardStyles = {
  root: {
    maxWidth: 280,
    margin: 'auto',
    marginBottom: 20,
    backgroundColor: '#F0F0F0', // Light Gray background
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
  },
  media: {
    height: 160,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
};

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCity = useSelector((state) => state.city.city);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    dispatch(changeCity(selectedCity));
  };

  const handleAddProperty = () => {
    navigate("/user/addproperty");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProperties = properties.filter(property => {
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
    <Box sx={{ padding: '20px', backgroundColor: '#F5F5F5' }}>
      <TextField
        label="Search Properties"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          marginBottom: 3,
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00274D', // Navy Blue border
            },
            '&:hover fieldset': {
              borderColor: '#00274D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00274D',
            },
          },
        }}
      />

      <Grid container spacing={3}>
        {filteredProperties.map((pr) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pr?._id}>
            <Card style={cardStyles.root}>
              <CardMedia
                style={cardStyles.media}
                image={pr?.imgUrl}
                title={pr?.society?.name || 'Property Image'}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" color="textPrimary" fontWeight={600}>
                  {pr?.type || 'Flat type'}
                </Typography>
                <Typography color="textSecondary" variant="body2" fontWeight={400}>
                  {pr?.price ? `Price: ${pr.price}` : 'Price not available'}
                  <br/>
                  {pr?.location}
                </Typography>
                <Typography>

                </Typography><br />
                {/* <Button variant="contained" color="success"  onClick={() => handleViewProperty(pr?._id)}>View Property</Button> */}
                <Link to={`/pdetail/${pr?._id}`} style={{ textDecoration: 'none' }}>
                  <button style={{  padding:'5px 5px',borderRadius:"3px",fontSize: '16px', cursor: 'pointer',color:'white',backgroundColor:'green',border:'none' }}>
                    Detail
                  </button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    
  );
};

export default ListProperty;















