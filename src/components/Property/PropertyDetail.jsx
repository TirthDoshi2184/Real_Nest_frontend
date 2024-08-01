import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Divider, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Styled Card for Property Details
const PropertyCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  marginBottom: theme.spacing(4),
}));

// Styled Image Gallery Container
const ImageGalleryContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Styled Grid for Image Gallery
const ImageGalleryItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const PropertyDetail = () => {
  const { id } = useParams();
  const [singleProperty, setSingleProperty] = useState({});
  const [singleflat, setsingleflat] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const societyResponse = await axios.get(`http://localhost:3000/society/singlesociety/${id}`);
        setSingleProperty(societyResponse.data);
        
        const flatResponse = await axios.get(`http://localhost:3000/flat/singleflat/${id}`);
        setsingleflat(flatResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Error fetching data: {error.message}</Typography>
      </Container>
    );
  }

  const { images = [] } = singleflat?.data || {};

  return (
    <Container>
      {/* Property Title and Price */}
      <Typography variant="h2" gutterBottom align="center">
        {singleflat?.data?.society?.name || 'Property Name'}
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom align="center">
        ${singleflat?.data?.price || 'Price'} - All inclusive
      </Typography>

      {/* Image Gallery */}
      <ImageGalleryContainer>
        <Grid container spacing={2}>
          {images.length > 0 ? (
            images.map((img, index) => (
              <ImageGalleryItem item xs={12} sm={6} md={4} lg={3} key={index}>
                <PropertyCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={singleProperty?.data?.data?.imgUrl}
                    alt={`Property image ${index + 1}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Image {index + 1}
                    </Typography>
                  </CardContent>
                </PropertyCard>
              </ImageGalleryItem>
            ))
          ) : (
            <Typography variant="body1" align="center">No images available</Typography>
          )}
        </Grid>
      </ImageGalleryContainer>

      {/* Property Description */}
      <Divider />
      <Box marginY={4}>
        <Typography variant="h5" gutterBottom>
          {singleflat?.data?.location}, &nbsp; {singleflat?.data?.interiorType}
        </Typography>
        <Typography paragraph>
          {singleProperty?.data?.parkingArea} Area Parking
          <br />
          No of Years Property Old: {singleProperty?.data?.yearsOld} Years
        </Typography>
      </Box>

      {/* Contact Information */}
      <Divider />
      <Box marginY={4}>
        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">
          {singleflat?.data?.contact?.name || 'No contact name available'}
        </Typography>
        <Typography variant="body1">
          {singleflat?.data?.contact?.email || 'No contact email available'}
        </Typography>
        <Typography variant="body1">
          {singleflat?.data?.contact?.phone || 'No contact phone available'}
        </Typography>
      </Box>
    </Container>
  );
};

export default PropertyDetail;
