import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  textAlign: "center",
  color: theme.palette.text.primary,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  },
  transition: "all 0.3s ease",
}));

export const AdminDashboard = () => {
  // Static data
  const usersCount = 100;  // Example: 100 users
  const propertiesCount = 250;  // Example: 250 properties listed
  const userPropertyCounts = [
    { name: "John Doe", propertyCount: 5 },
    { name: "Jane Smith", propertyCount: 3 },
    { name: "Alice Johnson", propertyCount: 8 },
    { name: "Bob Brown", propertyCount: 12 },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("id"); // Clear session
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <Box sx={{ padding: "20px", bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Manage users, properties, and website statistics.
        </Typography>
      </Box>

      {/* Dashboard Options */}
      <Grid container spacing={3}>
        {/* Total Users */}
        <Grid item xs={12} md={4}>
          <DashboardPaper>
            <Typography variant="h6" fontWeight="bold">
              Total Users
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, opacity: 0.7 }}>
              {usersCount} registered users
            </Typography>
          </DashboardPaper>
        </Grid>

        {/* Total Properties */}
        <Grid item xs={12} md={4}>
          <DashboardPaper>
            <Typography variant="h6" fontWeight="bold">
              Total Properties
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, opacity: 0.7 }}>
              {propertiesCount} properties listed
            </Typography>
          </DashboardPaper>
        </Grid>

        {/* Properties per User */}
        <Grid item xs={12} md={4}>
          <DashboardPaper>
            <Typography variant="h6" fontWeight="bold">
              Properties per User
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, opacity: 0.7 }}>
              {userPropertyCounts.map((user, index) => (
                <div key={index}>
                  {user.name}: {user.propertyCount} properties
                </div>
              ))}
            </Typography>
          </DashboardPaper>
        </Grid>
      </Grid>

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "12px",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
