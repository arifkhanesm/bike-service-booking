import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
  Grid
} from '@mui/material';
import { bookingService, BookingResponse } from '../services/bookingService';

const EditBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [formData, setFormData] = useState({
    customerEmail: '',
    customerName: '',
    customerPhone: '',
    bikeBrand: '',
    bikeModel: '',
    manufactureYear: '',
    appointmentDate: '',
    serviceType: '',
    notes: '',
    status: '' as BookingResponse['status']
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!id) return;
        const response = await bookingService.getBookingById(parseInt(id));
        const bookingData = response.data;
        setBooking(bookingData);
        setFormData({
          customerEmail: bookingData.customerEmail,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          bikeBrand: bookingData.bikeBrand,
          bikeModel: bookingData.bikeModel,
          manufactureYear: bookingData.manufactureYear,
          appointmentDate: bookingData.appointmentDate.split('.')[0], // Remove milliseconds for input
          serviceType: bookingData.serviceType,
          notes: bookingData.notes || '',
          status: bookingData.status
        });
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as BookingResponse['status'];
    setFormData(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!id) return;

      const bookingData = {
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        bikeBrand: formData.bikeBrand,
        bikeModel: formData.bikeModel,
        manufactureYear: formData.manufactureYear,
        appointmentDate: formData.appointmentDate,
        serviceType: formData.serviceType,
        notes: formData.notes,
        bookingStatus: formData.status
      };

      await bookingService.updateBooking(parseInt(id), bookingData);
      navigate('/admin/dashboard', { state: { message: 'Booking updated successfully' } });
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Failed to update booking details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Booking
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Email"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Phone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bike Brand"
                name="bikeBrand"
                value={formData.bikeBrand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bike Model"
                name="bikeModel"
                value={formData.bikeModel}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacture Year"
                name="manufactureYear"
                value={formData.manufactureYear}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="appointmentDate"
                type="datetime-local"
                value={formData.appointmentDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                required
              >
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Type"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBooking; 