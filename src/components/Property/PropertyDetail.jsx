import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Divider, Box, CardActions, Button } from '@mui/material';
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
        console.log(flatResponse.data);
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
      <Typography variant="h2" gutterBottom align="center" fontFamily={'inherit'}>
        {singleflat?.data?.society?.name || 'Property Name'}
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom align="center" fontFamily={'monospace'}>
        ${singleflat?.data?.price || 'Price'} - All inclusive
      </Typography>

      {/* Image Gallery */}
      {/* <ImageGalleryContainer>
        <Grid container spacing={2}>
          <ImageGalleryItem item xs={12}>
            <PropertyCard>
              <CardMedia
                component="img"
                height="200"
                image={singleProperty?.data?.imgUrl} // Assuming `image` has `imgUrl` property
                alt="Property image"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Image
                </Typography>
              </CardContent>
            </PropertyCard>
          </ImageGalleryItem>
        </Grid>
      </ImageGalleryContainer> */}
      {/* Property Description */}


      {/* Contact Information */}
      <Divider />
      <Box marginY={4}>
        <Typography variant="h3" gutterBottom fontFamily={'inherit'}>
          Contact Information
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph fontFamily={'monospace'}>
          Owner Name: {singleflat?.data?.user?.fullname || 'No contact name available'}
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph fontFamily={'monospace'}>
          Contact No: {singleflat?.data?.user?.mobileNo || 'No contact email available'}
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph fontFamily={'monospace'}>
          Role: {singleflat?.data?.user?.role || 'No contact phone available'}
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph fontFamily={'monospace'}>
          {singleflat?.data?.location} , {singleflat?.data?.interiorType}
        </Typography>

      </Box>


      <Card>
        {/* Displaying property image */}
        {/* <CardMedia
            component="img"
            height="200"
            image={singleProperty?.data?.data?.imgUrl} // Assuming `image` has `
            /> */}
        <Divider />
        <CardContent>
          <Typography variant="h3" component="div" fontFamily={'inherit'} >
            More Details
          </Typography><br />
          <Typography variant="h5" color="textSecondary" paragraph fontFamily={'monospace'}>
            Price Breakup : {singleflat?.data?.price}
          </Typography>

          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Prime Location: {singleflat?.data?.location}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Furnishing : {singleflat?.data?.interiorType}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Status : {singleflat?.data?.status}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            No of Floors : {singleflat?.data?.society?.floors}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Construction Status: {singleflat?.data?.society?.constructionStatus}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Property Old: {singleProperty?.data?.yearsOld} years
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Parking Area: {singleflat?.data?.society?.parkingArea}
          </Typography>
          <Typography variant="h5" color="textSecondary" marginTop={2} fontFamily={'monospace'}>
            Garden Area: {singleflat?.data?.society?.gardenArea} sqrft
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary" variant="contained" fontFamily={'monospace'}>
            Contact the Owner
          </Button>
          {/* Add more actions if needed */}
        </CardActions>
      </Card>




    </Container>
  );
};

export default PropertyDetail;
