import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { CardActionArea, CardActions } from '@mui/material';

// Styled Grid for Image Gallery
const ImageGallery = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PropertyDetail = () => {
  // Sample property data

  const [singleProperty, setSingleProperty] = useState({});
  const AmenityCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }));

  useEffect(() => {
    const getSocietyData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/society/singlesociety/664ecfafcedd735cc6853bc0");
        setSingleProperty(response.data); 
        console.log(response.data); 
        console.log(response.data.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getSocietyData(); 
  }, []); 
    
  const property = {
    name:"Beautifull Beach Islands",
    images: [
      'https://via.placeholder.com/400x300',
    ],
    // title: {singleSociety.name},
    description: 'This beautiful beach house offers stunning ocean views and modern amenities. It is located just steps from the sandy shores and is perfect for a relaxing getaway.',
    amenities: ['3 Bedrooms', '2 Bathrooms', 'Fully Equipped Kitchen', 'Private Pool', 'Wi-Fi'],
    price: "7899",
    contact: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
  };

  // const { pname, pamenities } = singleProperty;
  // const {name, images, title, description, amenities, price, contact,  } = property;

  return (
    <Container>
      {/* Property Title and Price */}
      <Typography variant="h3" gutterBottom>
        {singleProperty?.data?.name} 
      </Typography>
      <Typography variant="h3" gutterBottom>
        {singleProperty.data.constructionStatus}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {/* ${price} / month */}
      </Typography>

      {/* Image Gallery */}
      {/* {images?.length > 0 ? (
        <ImageGallery container spacing={2}>
          {images?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt={title}
                  height="200"
                  image={image}
                  title={title}
                />
              </Card>
            </Grid>
          ))}
        </ImageGallery>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No images available.
        </Typography>
      )} */}

      {/* Property Description */}
      {/* <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography paragraph>
        {description || 'No description available.'}
      </Typography> */}

      {/* Amenities */}
     

      {/* <Typography variant="h6" gutterBottom>
        Amenities
      </Typography>
      <Grid container spacing={4}>
        {amenities?.length > 0 ? (
          amenities.map((amenity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AmenityCard>
                <CardContent>
                  <Typography variant="h6" component="div">{amenity.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{amenity.description}</Typography>
                </CardContent>
              </AmenityCard>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No amenities listed.
          </Typography>
        )}
      </Grid> */}


     
     

      {/* Contact Information */}
      {/* <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1">
        {contact?.name || 'No contact name available'}
      </Typography>
      <Typography variant="body1">
        {contact?.email || 'No contact email available'}
      </Typography>
      <Typography variant="body1">
        {contact?.phone || 'No contact phone available'}
      </Typography>
 */}
      {/* Contact Button */}
      {/* <Box mt={2}>
        <Button variant="contained" color="primary">
          Contact Seller
        </Button>
      </Box> */}
    </Container>
  );
};

export default PropertyDetail;
