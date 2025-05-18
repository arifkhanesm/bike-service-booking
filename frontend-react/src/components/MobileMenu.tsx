import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import {
  Build as BuildIcon,
  Info as InfoIcon,
  ContactPhone as ContactIcon,
  Schedule as ScheduleIcon,
  Phone as PhoneIcon,
  Close as CloseIcon
} from '@mui/icons-material';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Services', icon: <BuildIcon />, href: '#services' },
    { text: 'About Us', icon: <InfoIcon />, href: '#about' },
    { text: 'Contact', icon: <ContactIcon />, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '80%', maxWidth: '300px' }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            BikeService Pro
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => handleNavClick(item.href)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Contact Information */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
            <Typography variant="body2">1-800-BIKE-SVC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ScheduleIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
            <Typography variant="body2">9:00 AM - 6:00 PM</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu; 