import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const AddProperty = () => {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    type: '',
    interiorType: '',
    sqrft: '',
    price: '',
    status: '',
    location: '',
    review: '',
    society: '',
    image: null,
  });

  const typeOptions = ['2BHK', '3BHK', '4BHK'];
  const interiorTypeOptions = ['Furnished', 'Non-Furnished'];
  const statusOptions = ['Finished', 'Unfinished'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPropertyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPropertyData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('type', propertyData.type);
    formData.append('interiorType', propertyData.interiorType);
    formData.append('sqrft', propertyData.sqrft);
    formData.append('price', propertyData.price);
    formData.append('status', propertyData.status);
    formData.append('location', propertyData.location);
    formData.append('review', propertyData.review);
    formData.append('society', propertyData.society);
    if (propertyData.image) {
      formData.append('makaanFile', propertyData.image);
    }

    try {
      const response = await axios.post("http://localhost:3000/flat/insertflat", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Property added successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f9' }}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Add New Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel component="legend">Type of Flat</FormLabel>
                <RadioGroup row name="type" value={propertyData.type} onChange={handleChange}>
                  {typeOptions.map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Interior Type</InputLabel>
                <Select
                  name="interiorType"
                  value={propertyData.interiorType}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="">Select Interior Type</MenuItem>
                  {interiorTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="sqrft"
                label="Square Feet"
                variant="outlined"
                fullWidth
                value={propertyData.sqrft}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                value={propertyData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={propertyData.status}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="">Select Status</MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                fullWidth
                value={propertyData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="review"
                label="Review"
                variant="outlined"
                fullWidth
                value={propertyData.review}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="society"
                label="Society"
                variant="outlined"
                fullWidth
                value={propertyData.society}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ marginTop: 2, backgroundColor: '#1976d2', color: '#ffffff', '&:hover': { backgroundColor: '#115293' } }}
                  startIcon={<PhotoCamera />}
                >
                  Upload Property Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: 2, backgroundColor: '#f50057', color: '#ffffff', '&:hover': { backgroundColor: '#c51162' } }}
              >
                Submit Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProperty;
