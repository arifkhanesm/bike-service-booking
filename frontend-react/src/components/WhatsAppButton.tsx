import React from 'react';
import { Fab, Tooltip, useTheme } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';

const WhatsAppButton = () => {
  const theme = useTheme();

  return (
    <Tooltip title="Chat on WhatsApp" placement="left">
      <Fab
        component="a"
        href="https://wa.me/917004425326"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#25D366',
          '&:hover': {
            bgcolor: '#128C7E'
          },
          zIndex: theme.zIndex.drawer + 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.4)'
            },
            '70%': {
              boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)'
            },
            '100%': {
              boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)'
            }
          }
        }}
      >
        <WhatsAppIcon sx={{ color: '#fff' }} />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton; 