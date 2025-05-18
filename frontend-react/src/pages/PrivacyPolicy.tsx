import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 } }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last updated on Jul 28th 2023
        </Typography>

        <Typography variant="body1" paragraph>
          This privacy policy sets out how our Bike Service Booking platform uses and protects any information that you give us when you use this website.
        </Typography>

        <Typography variant="body1" paragraph>
          We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
        </Typography>

        <Typography variant="body1" paragraph>
          We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Name and contact details" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Contact information including email address" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Demographic information such as postcode, preferences and interests" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Bike-related information and service preferences" />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We require this information to understand your needs and provide you with a better service, specifically for:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Internal record keeping" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Improving our products and services" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Sending promotional emails about new services, special offers or other information" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Market research purposes" />
          </ListItem>
        </List>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Security
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual.
        </Typography>
        <Typography variant="body1" paragraph>
          We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website. We only use this information for statistical analysis purposes.
        </Typography>
        <Typography variant="body1" paragraph>
          You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Controlling Your Personal Information
        </Typography>
        <Typography variant="body1" paragraph>
          You may choose to restrict the collection or use of your personal information in the following ways:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Look for opt-out options in forms for marketing communications" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Contact us to change your preferences regarding marketing communications" />
          </ListItem>
        </List>

        <Typography variant="body1" paragraph>
          We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.
        </Typography>

        <Typography variant="body1" paragraph>
          If you believe that any information we are holding on you is incorrect or incomplete, please contact us as soon as possible. We will promptly correct any information found to be incorrect.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 