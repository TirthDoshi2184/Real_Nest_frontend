import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'; // Import the signup icon

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        PrimeProperty Explorer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function UserLogin() {
  const navigate = useNavigate();
  const [user, setuser] = React.useState({});
  const { register, handleSubmit } = useForm();

  const submithandle = async (data) => {
    var userObj = Object.assign({}, data);
    setuser(data);
    console.log("=====================>", data);
    const userDetails = await axios.post("http://localhost:3000/user/login", userObj);
    console.log("userdetIL", userDetails.data);
    console.log("DATA..", userDetails.data.user);
    console.log(data);
    if (userDetails.status === 200) {
      console.log(".........", userDetails.data.user.role);
      switch (userDetails.data.user.role) {
        case "Seller":
          sessionStorage.setItem("id", userDetails?.data?.user?._id);
          console.log("Data:---", data);
          navigate("/user/sellerdashboard");
          break;
        case "Buyer":
          sessionStorage.setItem("id", userDetails?.data.user?._id);
          console.log("Data:---", data);
          navigate("/user/buyerdashboard");
          break;
        default:
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(submithandle)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  {...register("email")}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                  <PersonAddAltIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Don't have an account? Sign up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
