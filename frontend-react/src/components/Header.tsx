import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
  Menu as MenuIcon,
  AccountCircle,
  DirectionsBike
} from '@mui/icons-material';
import MobileMenu from './MobileMenu';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = localStorage.getItem('token') !== null;
  const isAdmin = localStorage.getItem('userRole') === 'ADMIN';

  const handleMenuClick = () => {
    setMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAdminDashboard = () => {
    navigate('/admin/dashboard');
    handleClose();
  };

  const scrollToSection = (sectionId: string) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={2}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 0 } }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsBike sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                BikeService Pro
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button 
                  color="inherit"
                  onClick={() => scrollToSection('#services')}
                >
                  Services
                </Button>
                <Button 
                  color="inherit"
                  onClick={() => scrollToSection('#about')}
                >
                  About Us
                </Button>
                <Button 
                  color="inherit"
                  onClick={() => scrollToSection('#contact')}
                >
                  Contact
                </Button>
                
                {/* Contact Info */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  ml: 2,
                  borderLeft: 1,
                  borderColor: 'divider',
                  pl: 2
                }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                    <PhoneIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Call Us
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      1-800-BIKE-SVC
                    </Typography>
                  </Box>
                </Box>

                {/* Business Hours */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  ml: 2,
                  borderLeft: 1,
                  borderColor: 'divider',
                  pl: 2
                }}>
                  <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                    <ScheduleIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Working Hours
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      9:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Authentication */}
            {!isMobile && (
              <Box sx={{ flexGrow: 0 }}>
                {isAuthenticated ? (
                  <>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {isAdmin && (
                        <MenuItem onClick={handleAdminDashboard}>Admin Dashboard</MenuItem>
                      )}
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button color="inherit" onClick={handleLogin}>
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <MobileMenu 
        open={mobileMenuOpen} 
        onClose={handleMenuClose}
      />
    </>
  );
};

export default Header; 