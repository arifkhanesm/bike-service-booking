import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, useTheme, useMediaQuery, Snackbar, Alert, Fade } from '@mui/material';
import ServiceList from '../components/ServiceList';
import BookingForm from '../components/BookingForm';
import { BikeService, Booking } from '../types';
import { getServices } from '../services/bikeServices';
import { bookingService } from '../services/bookingService';
import { Build as BuildIcon, DirectionsBike as BikeIcon } from '@mui/icons-material';
import { backgroundImageStyles, overlayStyles } from '../styles/common';

const HomePage: React.FC = () => {
  const [services, setServices] = useState<BikeService[]>([]);
  const [selectedService, setSelectedService] = useState<BikeService | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Royal Enfield Classic",
      description: "Experience the legendary Royal Enfield"
    },
    {
      url: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Expert Service",
      description: "Professional maintenance by certified mechanics"
    },
    {
      url: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Keep Your Bike Healthy",
      description: "Regular maintenance for peak performance"
    }
  ];

  useEffect(() => {
    const loadServices = async () => {
      const fetchedServices = await getServices();
      setServices(fetchedServices);
    };
    loadServices();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleServiceSelect = (service: BikeService) => {
    setSelectedService(service);
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!bookingData.bikeBrand || !bookingData.manufactureYear || !bookingData.appointmentDate) {
        setNotification({
          open: true,
          message: 'Please fill in all required fields',
          severity: 'error'
        });
        return;
      }

      // Transform the booking data to match the API format
      const bookingRequest = {
        customerEmail: bookingData.customerEmail,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        bikeBrand: bookingData.bikeBrand,
        bikeModel: bookingData.bikeModel,
        manufactureYear: bookingData.manufactureYear,
        appointmentDate: bookingData.appointmentDate,
        serviceType: bookingData.serviceType,
        notes: bookingData.notes || '',
        bookingStatus: 'PENDING' as const
      };

      const response = await bookingService.createBooking(bookingRequest);
      
      setNotification({
        open: true,
        message: 'Booking created successfully! We will contact you shortly.',
        severity: 'success'
      });
      
      // Reset form
    setSelectedService(null);
    } catch (error: any) {
      console.error('Error creating booking:', error);
      
      // Handle validation errors from the backend
      if (error.response?.data?.errors) {
        const errorMessage = error.response.data.errors.join('\n');
        setNotification({
          open: true,
          message: `Failed to create booking: ${errorMessage}`,
          severity: 'error'
        });
      } else {
        setNotification({
          open: true,
          message: 'Failed to create booking. Please try again.',
          severity: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '80vh', md: '90vh' },
          minHeight: { xs: '500px', md: '600px' },
          color: 'white',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Images with Fade Effect */}
        {heroImages.map((image, index) => (
          <Fade 
            key={index} 
            in={currentImageIndex === index} 
            timeout={1000}
          >
        <Box
          sx={{
            ...backgroundImageStyles,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("${image.url}")`,
                backgroundPosition: 'center center',
                display: currentImageIndex === index ? 'block' : 'none',
          }}
        />
          </Fade>
        ))}
        
        {/* Overlay */}
        <Box sx={overlayStyles} />

        {/* Content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative',
            zIndex: 2,
            pt: { xs: 4, md: 0 }
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <Fade in={true} timeout={1000}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
                {heroImages[currentImageIndex].title}
            </Typography>
            </Fade>
            <Fade in={true} timeout={1000}>
            <Typography 
              variant="h5" 
              paragraph 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
                {heroImages[currentImageIndex].description}
            </Typography>
            </Fade>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<BuildIcon />}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  }
                }}
              >
                View Our Services
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BikeIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box 
        id="services" 
        sx={{ 
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.default',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <ServiceList 
            services={services} 
            onServiceSelect={handleServiceSelect} 
          />
        </Container>
      </Box>
      
      {/* Booking Form Section */}
      <Box 
        id="booking-form" 
        sx={{ 
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.paper'
        }}
      >
        <Container maxWidth="lg">
            <BookingForm 
              services={services}
              onSubmit={handleBookingSubmit}
            loading={loading}
            />
        </Container>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 6,
              fontWeight: 'bold'
            }}
          >
            Why Choose Us
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr'
              },
              gap: 4
            }}
          >
            {[
              {
                title: 'Expert Mechanics',
                description: 'Our certified mechanics have years of experience with all bike types.'
              },
              {
                title: 'Quality Service',
                description: 'We use only high-quality parts and provide warranty on all repairs.'
              },
              {
                title: 'Quick Turnaround',
                description: 'Most services completed within 24-48 hours.'
              }
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1">
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 