// src/theme.js
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00274D', // Navy Blue
      contrastText: '#FFFFFF', // White
    },
    secondary: {
      main: '#D4AF37', // Gold
      contrastText: '#00274D', // Navy Blue
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#F0F0F0', // Light Gray
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#666666', // Medium Gray
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#00274D', // Navy Blue
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#00274D', // Navy Blue
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#00274D', // Navy Blue
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#00274D', // Navy Blue
    },
    body1: {
      fontSize: '1rem',
      color: '#333333', // Dark Gray
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
    Box:{
        fontFamily: 'Montserrat, Arial, sans-serif',
    },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#00274D',
          '&:hover': {
            backgroundColor: '#001a33',
          },
        },
        containedSecondary: {
          backgroundColor: '#D4AF37',
          color: '#00274D',
          '&:hover': {
            backgroundColor: '#b89230',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
