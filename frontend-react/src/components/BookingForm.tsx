import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  Grid,
  Fade,
  Chip,
  CircularProgress,
  FormHelperText,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  EventAvailable as CalendarIcon,
  DirectionsBike as BikeIcon,
  Person as PersonIcon,
  WhatsApp as WhatsAppIcon,
  MyLocation as LocationIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import { Booking, BikeService } from '../types';
import { bikeData, BikeModel } from '../data/bikeData';
import { backgroundImageStyles } from '../styles/common';
import { Autocomplete } from '@mui/material';

// Add this at the top of your file
declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface BookingFormProps {
  services: BikeService[];
  onSubmit: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  loading?: boolean;
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  const re = /^\+?[\d\s-]{10,}$/;
  return re.test(phone);
};

const validateDate = (date: string): boolean => {
  if (!date) return false;
  const selectedDate = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  return selectedDate >= now;
};

const BookingForm: React.FC<BookingFormProps> = ({ services, onSubmit, loading = false }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bikeBrand: '',
    bikeModel: '',
    manufactureYear: '',
    serviceId: '',
    appointmentDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedBikeDetails, setSelectedBikeDetails] = useState<BikeModel | null>(null);

  // Generate years array from 2000 to current year
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1999 }, (_, i) => (currentYear - i).toString());
  }, []);

  const handleValidate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bikeBrand) newErrors.bikeBrand = 'Please select a bike brand';
    if (!formData.bikeModel) newErrors.bikeModel = 'Please select a bike model';
    if (!formData.manufactureYear) newErrors.manufactureYear = 'Please select manufacture year';
    if (!formData.serviceId) newErrors.serviceId = 'Please select a service';
    if (!formData.customerName) newErrors.customerName = 'Please enter your name';
    if (!formData.customerEmail) {
      newErrors.customerEmail = 'Please enter your email';
    } else if (!validateEmail(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }
    if (!formData.customerPhone) {
      newErrors.customerPhone = 'Please enter your phone number';
    } else if (!validatePhone(formData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number';
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select an appointment date';
    } else if (!validateDate(formData.appointmentDate)) {
      newErrors.appointmentDate = 'Please select a future date and time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));

    if (name === 'bikeModel') {
      const selectedBike = bikeData.find(bike => bike.model === value);
      setSelectedBikeDetails(selectedBike || null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidate()) {
      const selectedService = services.find(s => s.id === formData.serviceId);
      const bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'> = {
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        bikeBrand: formData.bikeBrand,
        bikeModel: formData.bikeModel,
        manufactureYear: formData.manufactureYear,
        appointmentDate: formData.appointmentDate,
        serviceType: selectedService?.name || '',
        notes: formData.notes
      };
      onSubmit(bookingData);
    }
  };

  // Get unique brands
  const availableBrands = Array.from(new Set(bikeData.map(bike => bike.brand)));
  
  // Get models for selected brand
  const availableModels = bikeData.filter(bike => bike.brand === formData.bikeBrand);

  const selectedService = services.find(service => service.id === formData.serviceId);

  return (
    <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', opacity: loading ? 0.7 : 1 }}>
      {loading && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
          <CircularProgress />
          <Typography>Submitting your booking...</Typography>
        </Box>
      )}

      <Box sx={{
        ...backgroundImageStyles,
        backgroundImage: 'url("https://images.unsplash.com/photo-1565965314171-6a937d870545?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        opacity: 0.15
      }} />

      <Paper elevation={0} sx={{
        position: 'relative',
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        p: { xs: 2, md: 4 },
        borderRadius: 4
      }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          mb: 4
        }}>
          Book Your Service
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Bike Details Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Bike Details</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Brand</InputLabel>
                <Select
                  name="bikeBrand"
                  value={formData.bikeBrand || ''}
                  label="Brand"
                  onChange={handleInputChange}
                >
                  {availableBrands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Model</InputLabel>
                <Select
                  name="bikeModel"
                  value={formData.bikeModel || ''}
                  label="Model"
                  onChange={handleInputChange}
                  disabled={!formData.bikeBrand}
                >
                  {availableModels.map((bike) => (
                    <MenuItem key={bike.id} value={bike.model}>
                      {bike.model} - {bike.engineCC}cc
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth required error={!!errors.manufactureYear}>
                <InputLabel>Year of Manufacture</InputLabel>
                <Select
                  name="manufactureYear"
                  value={formData.manufactureYear}
                  label="Year of Manufacture"
                  onChange={handleInputChange}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
                {errors.manufactureYear && <FormHelperText>{errors.manufactureYear}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Service Selection Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Service Selection</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.serviceId}>
                <InputLabel>Select Service</InputLabel>
                <Select
                  name="serviceId"
                  value={formData.serviceId}
                  label="Select Service"
                  onChange={handleInputChange}
                >
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </MenuItem>
                  ))}
                </Select>
                {errors.serviceId && <FormHelperText>{errors.serviceId}</FormHelperText>}
              </FormControl>
            </Grid>

            {selectedService && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                  <Typography variant="h6" gutterBottom>
                    Service Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedService.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {selectedService.duration} minutes
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Price: {selectedService.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}

            {/* Personal Details Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Personal Details</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                error={!!errors.customerPhone}
                helperText={errors.customerPhone}
              />
            </Grid>

            {/* Appointment Details Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Appointment Details</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                type="datetime-local"
                label="Appointment Date & Time"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate}
                InputProps={{
                  startAdornment: <CalendarIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requirements or comments..."
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Submitting...' : 'Book Service'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingForm; 