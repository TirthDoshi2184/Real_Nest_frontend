import React, { useState, useEffect } from 'react';
import SellerSidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tabs,
  Tab,
  Menu
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Delete,
  Visibility,
  Email,
  Phone,
  Close
} from '@mui/icons-material';

const primaryColor = '#3a6ea5';

export default function ReceivedInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResponseDialog, setOpenResponseDialog] = useState(false);
  const [sellerResponse, setSellerResponse] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [currentTab, inquiries]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const sellerId = sessionStorage.getItem('id');

      if (!sellerId) {
        setError('Please login to view inquiries');
        return;
      }

      const response = await fetch(`http://localhost:3000/inquire/seller/${sellerId}`);
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

  const filterInquiries = () => {
    switch (currentTab) {
      case 0: // All
        setFilteredInquiries(inquiries);
        break;
      case 1: // Pending
        setFilteredInquiries(inquiries.filter(i => i.status === 'pending'));
        break;
      case 2: // Accepted
        setFilteredInquiries(inquiries.filter(i => i.status === 'accepted'));
        break;
      case 3: // Rejected
        setFilteredInquiries(inquiries.filter(i => i.status === 'rejected'));
        break;
      default:
        setFilteredInquiries(inquiries);
    }
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenDialog(true);
  };

  const handleUpdateStatus = async (inquiryId, status, response = '') => {
    try {
      setActionLoading(true);
      const sellerId = sessionStorage.getItem('id');

      const requestBody = {
        sellerId,
        status,
        sellerResponse: response
      };

      const res = await fetch(`http://localhost:3000/inquire/update/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();

      if (data.success) {
        fetchInquiries(); // Refresh list
        setOpenDialog(false);
        setOpenResponseDialog(false);
        setSellerResponse('');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error updating inquiry: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    try {
      setActionLoading(true);
      const sellerId = sessionStorage.getItem('id');

      const response = await fetch(`http://localhost:3000/inquire/delete/${inquiryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sellerId })
      });

      const data = await response.json();

      if (data.success) {
        fetchInquiries(); // Refresh list
        setOpenDialog(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting inquiry: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAcceptWithResponse = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenResponseDialog(true);
  };

  const submitAcceptWithResponse = () => {
    if (!sellerResponse.trim()) {
      alert('Please enter a response message');
      return;
    }
    handleUpdateStatus(selectedInquiry._id, 'accepted', sellerResponse);
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    return {
      total: inquiries.length,
      pending: inquiries.filter(i => i.status === 'pending').length,
      accepted: inquiries.filter(i => i.status === 'accepted').length,
      rejected: inquiries.filter(i => i.status === 'rejected').length
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: primaryColor }} />
      </Box>
    );
  }

  return (
  <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    {/* Sidebar */}
    <SellerSidebar 
      sidebarOpen={sidebarOpen} 
      setSidebarOpen={setSidebarOpen} 
      activeTab="inquiries" 
    />
    
    {/* Main Content */}
    <Box sx={{ flex: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Mobile Menu Toggle */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, p: 2 }}>
        <Button
          startIcon={<Menu />}
          onClick={() => setSidebarOpen(true)}
          sx={{ color: primaryColor }}
        >
          Menu
        </Button>
      </Box>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: primaryColor }}>
          Received Inquiries
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Inquiries
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: primaryColor }}>
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Accepted
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.accepted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Rejected
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  {stats.rejected}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for filtering */}
        <Paper sx={{ mb: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label={`All (${stats.total})`} />
            <Tab label={`Pending (${stats.pending})`} />
            <Tab label={`Accepted (${stats.accepted})`} />
            <Tab label={`Rejected (${stats.rejected})`} />
          </Tabs>
        </Paper>

        {/* Inquiries Table */}
        {filteredInquiries.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No inquiries found
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead sx={{ bgcolor: primaryColor }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Property</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Buyer</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Interest</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry._id} hover>
                    <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {inquiry.propertyTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ₹{inquiry.propertyPrice?.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{inquiry.buyerName}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Email fontSize="small" />
                          <Typography variant="caption">{inquiry.buyerEmail}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone fontSize="small" />
                          <Typography variant="caption">{inquiry.buyerPhone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={inquiry.interestedIn} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(inquiry.status)}
                        label={inquiry.status.toUpperCase()}
                        color={getStatusColor(inquiry.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(inquiry)}
                          sx={{ color: primaryColor }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteInquiry(inquiry._id)}
                          color="error"
                          disabled={actionLoading}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* View Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Inquiry Details
              </Typography>
              <IconButton onClick={() => setOpenDialog(false)}>
                <Close />
              </IconButton>
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
                    <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold', mt: 1 }}>
                      ₹{selectedInquiry.propertyPrice?.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Buyer Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Name:</strong> {selectedInquiry.buyerName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedInquiry.buyerEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {selectedInquiry.buyerPhone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Interested In:</strong> {selectedInquiry.interestedIn}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Message
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedInquiry.message}
                </Typography>

                {selectedInquiry.sellerResponse && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Your Response
                    </Typography>
                    <Typography variant="body2">
                      {selectedInquiry.sellerResponse}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {selectedInquiry?.status === 'pending' && (
              <>
                <Button
                  onClick={() => handleAcceptWithResponse(selectedInquiry)}
                  variant="contained"
                  color="success"
                  disabled={actionLoading}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(selectedInquiry._id, 'rejected')}
                  variant="contained"
                  color="error"
                  disabled={actionLoading}
                >
                  Reject
                </Button>
              </>
            )}
            <Button onClick={() => setOpenDialog(false)} sx={{ color: primaryColor }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Response Dialog */}
        <Dialog open={openResponseDialog} onClose={() => setOpenResponseDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Accept Inquiry with Response</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Response"
              value={sellerResponse}
              onChange={(e) => setSellerResponse(e.target.value)}
              placeholder="Write a message to the buyer..."
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenResponseDialog(false)}>Cancel</Button>
            <Button
              onClick={submitAcceptWithResponse}
              variant="contained"
              color="success"
              disabled={actionLoading}
            >
              {actionLoading ? 'Sending...' : 'Accept & Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      </Box>
      
    </Box>
  );
}