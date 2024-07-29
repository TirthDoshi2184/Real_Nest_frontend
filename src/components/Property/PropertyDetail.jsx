import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Styled Grid for Image Gallery
const ImageGallery = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const id = req.params.id

const PropertyDetail = () => {
  const [singleProperty, setSingleProperty] = useState({});
  const [singleflat, setsingleflat] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const societyResponse = await axios.get("http://localhost:3000/society/singlesociety/"+id);
        setSingleProperty(societyResponse.data);
        
        const flatResponse = await axios.get("http://localhost:3000/flat/singleflat/665330f08b336f64c724ca04");
        setsingleflat(flatResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const { images = [] } = singleflat?.data || {};

  return (
    <Container>
      {/* Property Title and Price */}
      <Typography variant="h3" gutterBottom>
        {singleProperty?.data?.name || 'Property Name'}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        ${singleflat?.data?.price || 'Price'} - All inclusive
      </Typography>

      {/* Image Gallery */}
      <br />
        <ImageGallery container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={singleflat?.data?.imgUrl} // Adjust according to your API response structure
                  alt={'Image'} // Adjust according to your API response structure
                />
              </Card>
            </Grid>
        </ImageGallery>
  

      {/* Property Description */}
      <Typography variant="h6" gutterBottom>
        {singleflat?.data?.location}, &nbsp; {singleflat?.data?.interiorType}
      </Typography>
      <Typography paragraph>
        {singleProperty?.data?.parkingArea}  Area Parking <br></br>
        No of Years Property Old : {singleProperty?.data?.yearsOld} Years 
      </Typography>

  
      {/* Contact Information */}
      <Typography variant="h6" gutterBottom>
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
    </Container>
  );
};

export default PropertyDetail;
