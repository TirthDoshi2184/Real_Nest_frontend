import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";

const PlotsProperty = () => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const response = await axios.get("http://localhost:3000/plot/getplot");
        if (Array.isArray(response.data)) {
          setPlots(response.data);
        } else {
          setError("Invalid data format received from API");
        }
      } catch (err) {
        setError("Error fetching plot data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
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
      <Typography variant="h4" gutterBottom textAlign="center">
        Plots Properties
      </Typography>
      <Grid container spacing={4}>
        {plots.map((plot) => (
          <Grid item xs={12} sm={6} md={4} key={plot.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📍 {plot.location}
                </Typography>
                <Typography>
                  <strong>Area:</strong> {plot.area} sq. ft
                </Typography>
                <Typography>
                  <strong>Price:</strong> ₹ {plot.price.toLocaleString()}
                </Typography>
                <Typography>
                  <strong>Contact:</strong> {plot.contact}
                </Typography>
                <Typography>
                  <strong>Review:</strong> {plot.review}
                </Typography>
                <Typography>
                  <strong>For Rent:</strong>{" "}
                  {plot.isavailableforRent ? "Yes" : "No"}
                </Typography>
                <Chip
                  label={plot.status}
                  color={plot.status === "Available" ? "success" : "default"}
                  sx={{ marginTop: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                >
                  Contact Seller
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlotsProperty;
