import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Paper, 
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

// Enhanced styled components
const FormWrapper = styled(motion.div)`
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1));
    border-radius: 25px;
    z-index: -1;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 12px 40px rgba(31, 38, 135, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImagePreview = styled(motion.img)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
  margin-top: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const UploadButton = styled(Button)`
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  border-radius: 15px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 5px 15px rgba(33, 203, 243, .4);
  }
  
  &:active {
    transform: translateY(1px) scale(0.98);
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &.Mui-focused {
      transform: translateY(-2px);
    }
  }
`;

const PropertyForm = ({ type = 'property' }) => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const getTitleByType = () => {
    switch(type) {
      case 'flat': return 'Add New Apartment';
      case 'shop': return 'List Your Shop';
      case 'plot': return 'Register Land Plot';
      case 'bungalow': return 'Add Luxury Bungalow';
      default: return 'Add Property';
    }
  };

  // Define specific fields before they're used
  const specificFields = {
    flat: [
      { name: 'type', label: 'Type', type: 'select', 
        options: ['1BHK', '2BHK', '3BHK'] },
      { name: 'interiorType', label: 'Interior Type', type: 'select',
        options: ['Furnished', 'Semi-Furnished', 'Unfurnished'] },
      { name: 'sqrft', label: 'Square Feet', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' }
    ],
    shop: [
      { name: 'interiorType', label: 'Interior Type', type: 'select',
        options: ['Furnished', 'Semi-Furnished', 'Unfurnished'] },
      { name: 'sqrft', label: 'Square Feet', type: 'text' }
    ],
    plot: [
      { name: 'area', label: 'Area (in sq ft)', type: 'number' },
      { name: 'contact', label: 'Contact Number', type: 'tel' }
    ],
    bungalow: [
      { name: 'type', label: 'Type', type: 'select',
        options: ['Single Story', 'Double Story', 'Villa'] },
      { name: 'interiorType', label: 'Interior Type', type: 'select',
        options: ['Furnished', 'Semi-Furnished', 'Unfurnished'] },
      { name: 'area', label: 'Area', type: 'text' },
      { name: 'pincode', label: 'Pincode', type: 'text' }
    ]
  };

  // Enhanced animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset');

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        setImage(data.secure_url);
        setFormData(prev => ({ ...prev, imgUrl: data.secure_url }));
        setSnackbar({
          open: true,
          message: 'Image uploaded successfully!',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Error uploading image',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add all form fields from the formData state
      Object.keys(formData).forEach(key => {
        formData.append(key, formData[key]);
      });
  
      // If there's an image file, append it
      const fileInput = document.querySelector('#image-upload');
      if (fileInput && fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
      }
  
      // Log the FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      const response = await fetch('/api/flat/addflat', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header when sending FormData
        // The browser will set it automatically with the correct boundary
        headers: {
          // Add any required authorization headers here
          'Accept': 'application/json',
        },
      });
  
      // Log the raw response for debugging
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
  
      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid response from server');
      }
  
      if (data.success) {
        setSnackbar({
          open: true,
          message: data.message || 'Property added successfully!',
          severity: 'success'
        });
        
        // Reset form
        setFormData({});
        setImage(null);
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        throw new Error(data.message || 'Failed to add property');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error adding property. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  const renderFormFields = () => {
    const commonFields = [
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', 
        options: ['Available', 'Sold', 'Under Contract'] }
    ];
    
    const fields = [...(specificFields[type] || []), ...commonFields];

    return (
      <Grid container spacing={3}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {field.type === 'select' ? (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    label={field.label}
                    sx={{
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        transition: 'transform 0.2s ease'
                      }
                    }}
                  >
                    {field.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <StyledTextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              )}
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <AnimatePresence>
      <FormWrapper
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
      >
        <StyledPaper elevation={3}>
          <motion.div variants={headerVariants}>
            <Box 
              display="flex" 
              alignItems="center" 
              mb={4}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HomeWorkIcon 
                sx={{ 
                  fontSize: 40, 
                  mr: 2, 
                  color: '#2196F3',
                  filter: 'drop-shadow(0 2px 4px rgba(33, 150, 243, 0.3))'
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {getTitleByType()}
              </Typography>
            </Box>
          </motion.div>

          <form onSubmit={handleSubmit}>
            {renderFormFields()}

            <motion.div 
              variants={itemVariants} 
              className="mt-6"
              whileHover={{ scale: 1.01 }}
            >
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                label="Review"
                name="review"
                value={formData.review || ''}
                onChange={handleInputChange}
                variant="outlined"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="mt-6"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <UploadButton
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  disabled={loading}
                >
                  Upload Image
                </UploadButton>
              </label>
              {image && (
                <ImagePreview 
                  src={image} 
                  alt="Property"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  height: 56,
                  marginTop: 2,
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(33, 150, 243, 0.3)'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Add ${type.charAt(0).toUpperCase() + type.slice(1)}: 'Property'`
                )}
              </Button>
            </motion.div>
          </form>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '& .MuiAlert-icon': {
                  fontSize: '24px'
                }
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

        </StyledPaper>
      </FormWrapper>
    </AnimatePresence>
  );
};

export default PropertyForm;