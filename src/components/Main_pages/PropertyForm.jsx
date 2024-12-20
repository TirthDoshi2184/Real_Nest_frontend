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
  Checkbox,
  FormGroup
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PropertyForm = ({ 
  propertyType, 
  fields,
  apiEndpoint 
}) => {
  const navigate = useNavigate();

  // Dynamically create initial state based on fields
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {});

  const [propertyData, setPropertyData] = useState(initialState);
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
  
    // Append all property fields
    Object.keys(propertyData).forEach((key) => {
      formData.append(key, propertyData[key]);
    });
  
    // Append the file
    if (images.length > 0) {
      formData.append("makaanFile", images[0]); // Assuming single file upload
    }
  
    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(`${propertyType} added successfully:`, response.data);
      navigate("/");
    } catch (error) {
      console.error(`Error adding ${propertyType}:`, error);
    }
  };
   
  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth variant="outlined">
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={propertyData[field.name]}
              onChange={handleChange}
              label={field.label}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'radio':
        return (
          <FormControl fullWidth>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              row
              name={field.name}
              value={propertyData[field.name]}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      
      case 'checkbox':
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyData[field.name]}
                  onChange={handleChange}
                  name={field.name}
                />
              }
              label={field.label}
            />
          </FormGroup>
        );
      
      default:
        return (
          <TextField
            fullWidth
            name={field.name}
            label={field.label}
            variant="outlined"
            type={field.inputType || 'text'}
            value={propertyData[field.name]}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f4f9' }}>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Add New {propertyType}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {fields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {renderField(field)}
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
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
                  Upload Property Images
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
                Submit {propertyType}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PropertyForm;