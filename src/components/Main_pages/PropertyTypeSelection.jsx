import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LandscapeIcon from '@mui/icons-material/Landscape';

const PropertyTypeSelection = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    {
      type: 'Flat',
      icon: <HomeIcon sx={{ fontSize: 100, color: '#1976d2' }} />,
      description: 'Add a residential flat or apartment',
      route: '/addproperty/flat'
    },
    {
      type: 'Shop',
      icon: <StorefrontIcon sx={{ fontSize: 100, color: '#4caf50' }} />,
      description: 'List a commercial shop or retail space',
      route: '/addproperty/shop'
    },
    {
      type: 'Plot',
      icon: <LandscapeIcon sx={{ fontSize: 100, color: '#ff9800' }} />,
      description: 'Add a land or plot for sale',
      route: '/addproperty/plot'
    }
  ];

  return (
    <Box sx={{ 
      padding: 4, 
      backgroundColor: '#f4f4f9', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' 
    }}>
      <Typography 
        variant="h4" 
        align="center" 
        color="textPrimary" 
        gutterBottom 
        sx={{ marginBottom: 4 }}
      >
        Select Property Type to Add
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {propertyTypes.map((property) => (
          <Grid item xs={12} sm={4} key={property.type}>
            <Card 
              sx={{ 
                maxWidth: 345, 
                margin: 'auto', 
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }
              }}
            >
              <CardActionArea onClick={() => navigate(property.route)}>
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  padding: 3 
                }}>
                  {property.icon}
                  <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 2 }}>
                    {property.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {property.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyTypeSelection;