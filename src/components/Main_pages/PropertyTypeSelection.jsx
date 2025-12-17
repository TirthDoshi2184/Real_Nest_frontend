import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { Menu, X } from 'lucide-react';
import SellerSidebar from './Sidebar'; // Import your sidebar

const PropertyTypeSelection = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const propertyTypes = [
    {
      type: 'Flat',
      icon: <HomeIcon sx={{ fontSize: 100, color: '#1976d2' }} />,
      description: 'Add a residential flat or apartment',
      route: '/addproperty/flat',
      color: '#1976d2'
    },
    {
      type: 'Shop',
      icon: <StorefrontIcon sx={{ fontSize: 100, color: '#4caf50' }} />,
      description: 'List a commercial shop or retail space',
      route: '/addproperty/shop',
      color: '#4caf50'
    },
    {
      type: 'Bunglow',
      icon: <LandscapeIcon sx={{ fontSize: 100, color: '#ff9800' }} />,
      description: 'Add a bungalow or villa property',
      route: '/addproperty/bunglow',
      color: '#ff9800'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SellerSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab="add-property"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-right">
              <p className="font-semibold text-gray-800">Add Property</p>
              <p className="text-sm text-gray-500">Select property type</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Box sx={{ 
            backgroundColor: '#f4f4f9', 
            minHeight: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}>
            <Typography 
              variant="h4" 
              align="center" 
              color="textPrimary" 
              gutterBottom 
              sx={{ marginBottom: 4, fontWeight: 600 }}
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
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 8px 16px ${property.color}33`
                      }
                    }}
                  >
                    <CardActionArea onClick={() => navigate(property.route)}>
                      <CardContent sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        padding: 3,
                        minHeight: '240px'
                      }}>
                        {property.icon}
                        <Typography 
                          gutterBottom 
                          variant="h5" 
                          component="div" 
                          sx={{ 
                            marginTop: 2,
                            fontWeight: 600,
                            color: property.color
                          }}
                        >
                          {property.type}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          align="center"
                          sx={{ marginTop: 1 }}
                        >
                          {property.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default PropertyTypeSelection;