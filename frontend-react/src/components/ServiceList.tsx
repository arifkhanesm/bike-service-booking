import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Button,
  Box,
  useTheme,
  CardActions,
  Chip,
  Divider
} from '@mui/material';
import { BikeService } from '../types';
import { Timer as TimerIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';

interface ServiceListProps {
  services: BikeService[];
  onServiceSelect: (service: BikeService) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onServiceSelect }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom 
        align="center"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          mb: { xs: 4, md: 6 },
          color: theme.palette.primary.main
        }}
      >
        Our Services
      </Typography>
      <Typography 
        variant="h5" 
        component="p" 
        align="center" 
        color="text.secondary"
        sx={{ 
          mb: { xs: 4, md: 6 },
          maxWidth: 800,
          mx: 'auto',
          px: 2
        }}
      >
        Choose from our range of professional bike maintenance and repair services
      </Typography>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid key={service.id} item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.primary.main
                  }}
                >
                  {service.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {service.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip
                    icon={<TimerIcon />}
                    label={`${service.duration} min`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<MoneyIcon />}
                    label={`$${service.price}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>

              <Divider />
              
              <CardActions sx={{ p: 2, pt: 1 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => onServiceSelect(service)}
                  fullWidth
                  sx={{
                    py: 1,
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceList; 