import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/system';

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("id") // Check if the user is logged in
  );

  const handleLogout = () => {
    sessionStorage.removeItem("id"); // Clear the session
    setIsAuthenticated(false); // Update state
    window.location.href = "/"; // Redirect to home
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  // Styled button with theme integration
  const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    padding: "8px 20px",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  }));

  return (
    <Box
      sx={{
        bgcolor: "primary.main", // Navbar background color from theme
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", // Subtle shadow for depth
        borderBottom: "1px solid",
        borderColor: "primary.dark", // Subtle border for separation
      }}
    >
      {/* Navbar Title */}
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: "Poppins, Arial, sans-serif",
          fontWeight: 700,
          color: "primary.contrastText",
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit", // Inherits the theme color
          }}
        >
          PrimeProperty Explorer
        </a>
      </Typography>

      {/* Authentication Buttons */}
      <Box>
        {isAuthenticated ? (
          <CustomButton onClick={handleLogout}>Logout</CustomButton>
        ) : (
          <CustomButton onClick={handleLogin}>Login</CustomButton>
        )}
      </Box>
    </Box>
  );
};
