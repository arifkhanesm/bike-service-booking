import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 4, md: 6 },
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              BikeService Pro
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph
              sx={{ mb: { xs: 2, md: 3 } }}
            >
              Professional bike repair and maintenance services. 
              We keep your wheels spinning and your rides smooth.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton 
                color="primary" 
                aria-label="Facebook"
                size={isMobile ? "small" : "medium"}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Twitter"
                size={isMobile ? "small" : "medium"}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Instagram"
                size={isMobile ? "small" : "medium"}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="LinkedIn"
                size={isMobile ? "small" : "medium"}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 0.5, md: 1 }
            }}>
              <Link 
                href="#services" 
                color="text.secondary" 
                underline="hover"
                sx={{ py: 0.5 }}
              >
                Our Services
              </Link>
              <Link 
                href="#booking-form" 
                color="text.secondary" 
                underline="hover"
                sx={{ py: 0.5 }}
              >
                Book Appointment
              </Link>
              <Link 
                href="#about" 
                color="text.secondary" 
                underline="hover"
                sx={{ py: 0.5 }}
              >
                About Us
              </Link>
              <Link 
                href="/privacy-policy" 
                color="text.secondary" 
                underline="hover"
                sx={{ py: 0.5 }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 1.5, md: 2 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                <Typography variant="body2" color="text.secondary">
                  1-800-BIKE-SVC
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                <Typography variant="body2" color="text.secondary">
                  contact@bikeservicepro.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Bike Street, Cycling City,<br />
                  BC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        {/* Copyright */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
        >
          © {new Date().getFullYear()} BikeService Pro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 