import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";

const ShopProperty = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/shop/getshop");
        console.log(response.data.data); // Log the data
        setShops(response.data.data); // Update state
      } catch (err) {
        setError("Error fetching shop data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchShops();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Shop Properties
      </Typography>
      <Grid container spacing={4}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {shop.location}
                </Typography>
                <Typography>
                  <strong>Interior:</strong> {shop.interiorType}
                </Typography>
                <Typography>
                  <strong>Sq. Ft:</strong> {shop.sqrft} sqft
                </Typography>
                <Typography>
                  <strong>Price:</strong> (₹){shop.price}
                </Typography>
                <Typography>
                  <strong>Review:</strong> {shop.review}
                </Typography>
                <Chip
                  label={shop.status}
                  color={shop.status === "Available" ? "success" : "default"}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopProperty;
