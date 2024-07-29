import React from 'react'
import { Box, Container, ThemeProvider, Typography, createTheme } from "@mui/material";

export const SellerDashboard = () => {
  const constant = {
    backgroundColor: "rgb(0, 82, 204)",
  };
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
 
  });
  

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Hello</Typography>
          </Box>
        </Container>
      </ThemeProvider>
  )
}
