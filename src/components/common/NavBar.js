import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { blueGrey } from '@mui/material/colors';
import { motion } from 'framer-motion';
import LoggedInMenu from '../common/LoggedInMenu';
import LoggedOutMenu from '../common/LoggedOutMenu';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    console.log("Navbar itemCount updated:", itemCount);
  }, [itemCount]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: `${blueGrey[700]}` }}>
      <Toolbar className="navbar">
        <Typography
          variant="h5"
          component={Link}
          to="/"
          className="logo"
          sx={{ textDecoration: 'none', color: 'white', fontStyle: 'italic' }}
        >
          E-Gadget store
        </Typography>

        <Box className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
        </Box>

        <Box className="nav-icons">
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            sx={{pt: 2}}
          >
            <Badge 
              badgeContent={itemCount || 0} 
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              overlap="circular"
            >
              <motion.div
                key={itemCount}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCartIcon />
              </motion.div>
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <PersonIcon />
          </IconButton>

          {isAuthenticated ? (
            <LoggedInMenu
              anchorEl={anchorEl}
              onClose={handleClose}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          ) : (
            <LoggedOutMenu
              anchorEl={anchorEl}
              onClose={handleClose}
              onNavigate={handleNavigate}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;