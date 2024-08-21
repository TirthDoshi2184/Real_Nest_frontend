import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Montserrat, Arial, sans-serif">
              PrimeProperty Explorer
            </Typography>
            <Typography variant="body2" fontFamily="Montserrat, Arial, sans-serif">
              © {new Date().getFullYear()} PrimeProperty Explorer. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Montserrat, Arial, sans-serif">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" fontFamily="Montserrat, Arial, sans-serif">
              Home
            </Link><br />
            <Link href="/about" color="inherit" underline="hover" fontFamily="Montserrat, Arial, sans-serif">
              About Us
            </Link><br />
            <Link href="/contact" color="inherit" underline="hover" fontFamily="Montserrat, Arial, sans-serif">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Montserrat, Arial, sans-serif">
              Contact Information
            </Typography>
            <Typography variant="body2" fontFamily="Montserrat, Arial, sans-serif">
              Email: info@primeproperty.com
            </Typography>
            <Typography variant="body2" fontFamily="Montserrat, Arial, sans-serif">
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2" fontFamily="Montserrat, Arial, sans-serif">
              Address: 1234 Real Estate St, City, State
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
