import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { AllRoutes } from './routes/AllRoutes';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <AllRoutes />
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
