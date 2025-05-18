import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  SvgIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle,
  PendingActions,
  Cancel,
  DirectionsBike,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bookingService, BookingResponse } from '../services/bookingService';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingService.getAllBookings();
      setBookings(response.data);
      
      // Calculate stats
      const bookingsData = response.data;
      setStats({
        totalBookings: bookingsData.length,
        pendingBookings: bookingsData.filter(b => b.status === 'PENDING').length,
        completedBookings: bookingsData.filter(b => b.status === 'COMPLETED').length,
        cancelledBookings: bookingsData.filter(b => b.status === 'CANCELLED').length,
      });
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingService.deleteBooking(id);
        await fetchBookings(); // Refresh the list
      } catch (err) {
        console.error('Error deleting booking:', err);
        setError('Failed to delete booking. Please try again.');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/bookings/edit/${id}`);
  };

  const getStatusColor = (status: BookingResponse['status']): "warning" | "info" | "success" | "error" => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'warning';
    }
  };

  const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {icon}
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<SvgIcon component={DirectionsBike} sx={{ fontSize: 40, color: 'primary.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pendingBookings}
            icon={<SvgIcon component={PendingActions} sx={{ fontSize: 40, color: 'warning.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedBookings}
            icon={<SvgIcon component={CheckCircle} sx={{ fontSize: 40, color: 'success.main' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cancelled"
            value={stats.cancelledBookings}
            icon={<SvgIcon component={Cancel} sx={{ fontSize: 40, color: 'error.main' }} />}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bike Details</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {booking.bikeBrand} {booking.bikeModel}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {booking.manufactureYear}
                  </Typography>
                </TableCell>
                <TableCell>{booking.serviceType}</TableCell>
                <TableCell>
                  {new Date(booking.appointmentDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ 
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {booking.notes || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(booking.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard; 