import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Close,
  Visibility
} from '@mui/icons-material';

const primaryColor = '#3a6ea5';

export default function MyInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const buyerId = sessionStorage.getItem('id');

      if (!buyerId) {
        setError('Please login to view your inquiries');
        return;
      }

      const response = await fetch(`http://localhost:3000/inquire/buyer/${buyerId}`);
      const data = await response.json();

      if (data.success) {
        setInquiries(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching inquiries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenDialog(true);
  };

  const handleCancelInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to cancel this inquiry?')) {
      return;
    }

    try {
      setCancelLoading(true);
      const buyerId = sessionStorage.getItem('userId');

      const response = await fetch(`http://localhost:3000/inquire/cancel/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ buyerId })
      });

      const data = await response.json();

      if (data.success) {
        fetchInquiries(); // Refresh list
        setOpenDialog(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error cancelling inquiry: ' + err.message);
    } finally {
      setCancelLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'cancelled':
        return 'default';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <HourglassEmpty />;
      case 'accepted':
        return <CheckCircle />;
      case 'rejected':
      case 'cancelled':
        return <Cancel />;
      default:
        return <HourglassEmpty />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: primaryColor }}>
          My Inquiries
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {inquiries.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No inquiries found
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/allproperties')}
              sx={{ mt: 3, bgcolor: primaryColor }}
            >
              Browse Properties
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {inquiries.map((inquiry) => (
              <Grid item xs={12} md={6} key={inquiry._id}>
                <Card elevation={2} sx={{ display: 'flex', height: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, objectFit: 'cover' }}
                    image={inquiry.propertyImage || 'https://via.placeholder.com/200'}
                    alt={inquiry.propertyTitle}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip
                          icon={getStatusIcon(inquiry.status)}
                          label={inquiry.status.toUpperCase()}
                          color={getStatusColor(inquiry.status)}
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(inquiry.createdAt)}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {inquiry.propertyTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {inquiry.propertyLocation}
                      </Typography>
                      <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold', mb: 1 }}>
                        ₹{inquiry.propertyPrice?.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Seller: {inquiry.sellerName}
                      </Typography>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetails(inquiry)}
                        startIcon={<Visibility />}
                        sx={{ color: primaryColor, borderColor: primaryColor }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Inquiry Details
              </Typography>
              <Button onClick={() => setOpenDialog(false)}>
                <Close />
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {selectedInquiry && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <img
                      src={selectedInquiry.propertyImage || 'https://via.placeholder.com/600x300'}
                      alt={selectedInquiry.propertyTitle}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {selectedInquiry.propertyTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedInquiry.propertyLocation}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Price
                    </Typography>
                    <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                      ₹{selectedInquiry.propertyPrice?.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      icon={getStatusIcon(selectedInquiry.status)}
                      label={selectedInquiry.status.toUpperCase()}
                      color={getStatusColor(selectedInquiry.status)}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Your Message
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedInquiry.message}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Interested In: <strong>{selectedInquiry.interestedIn}</strong>
                </Typography>

                {selectedInquiry.sellerResponse && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Seller's Response
                    </Typography>
                    <Typography variant="body2">
                      {selectedInquiry.sellerResponse}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Responded on: {formatDate(selectedInquiry.respondedAt)}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {selectedInquiry?.status === 'pending' && (
              <Button
                onClick={() => handleCancelInquiry(selectedInquiry._id)}
                color="error"
                disabled={cancelLoading}
              >
                {cancelLoading ? 'Cancelling...' : 'Cancel Inquiry'}
              </Button>
            )}
            <Button onClick={() => setOpenDialog(false)} sx={{ color: primaryColor }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}