import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A6EA5",     // Deep Nautical Blue - more professional and trustworthy
      light: "#5E8DC4",    // Softer blue for hover and lighter applications
      dark: "#2A4F7C",     // Darker blue for depth
      contrastText: "#FFFFFF", // White text for contrast
    },
    secondary: {
      main: "#4A9C57",     // Soft Sage Green - representing growth and freshness
      light: "#6AB277",    // Lighter green for hover states
      dark: "#3A7D45",     // Darker green for depth
      contrastText: "#FFFFFF", // White text for contrast
    },
    background: {
      default: "#F4F6F9",  // Soft, cool gray-blue for overall background
      paper: "#FFFFFF",    // Clean white for cards and elevated surfaces
    },
    text: {
      primary: "#2C3E50",  // Deep charcoal blue for primary text
      secondary: "#7F8C8D", // Soft gray for secondary text
      disabled: "#BDC3C7", // Light gray for disabled states
    },
    button: {
      main: "#E67E22",     // Warm Orange - energetic and inviting
      hover: "#D35400",    // Deeper orange for hover states
    },
    footer: {
      background: "#2C3E50", // Deep navy for footer
      text: "#ECF0F1",     // Light gray for footer text
      hover: "#3498DB",    // Bright blue for hover effects
    },
    error: {
      main: "#E74C3C",     // Vibrant red for error states
    },
    success: {
      main: "#2ECC71",     // Bright green for success states
    }
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif", // Modern, clean font stack
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.5px",
      color: "#2C3E50"
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#34495E"
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6
    },
    button: {
      textTransform: "none", // Keeps text in normal case
      fontWeight: 600,
      fontSize: "1rem"
    }
  },
  shape: {
    borderRadius: 12 // Consistent, modern rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "12px 24px",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle elevation
          transition: "all 0.3s ease", // Smooth transitions
          "&:hover": {
            transform: "translateY(-2px)", // Slight lift on hover
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)"
          }
        },
        containedPrimary: {
          backgroundColor: "#3A6EA5",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2A4F7C"
          }
        },
        outlinedPrimary: {
          borderColor: "#3A6EA5",
          color: "#3A6EA5",
          "&:hover": {
            backgroundColor: "rgba(58, 110, 165, 0.05)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)", // Refined shadow
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.12)"
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Clean white navbar
          color: "#2C3E50", // Dark text
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", // Subtle shadow
          borderBottom: "1px solid #ECF0F1" // Soft border
        }
      }
    }
  },
  // Add custom breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

export default theme;