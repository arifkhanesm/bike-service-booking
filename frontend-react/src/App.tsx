import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import EditBooking from './pages/EditBooking';
import WhatsAppButton from './components/WhatsAppButton';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Create theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  useEffect(() => {
    console.log('Auth Debug:', { 
      token: !!token, 
      userRole,
      isAuthenticated: !!token,
      isAdmin: userRole === 'ADMIN'
    });
  }, [token, userRole]);

  // Check authentication
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check admin role
  if (userRole !== 'ADMIN') {
    console.log('User is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is an admin
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <Box sx={{ 
        display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
      }}>
        <Header />
          <Box sx={{ flex: 1, py: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/bookings/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditBooking />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Box>
          <WhatsAppButton />
        <Footer />
      </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
