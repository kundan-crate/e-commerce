// LoggedInMenu.jsx
import React from 'react';
import { 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider 
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';

const LoggedInMenu = ({ anchorEl, onClose, onNavigate, onLogout }) => {
  const handleMenuItemClick = (path) => {
    onNavigate(path);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Menu
      id="profile-menu-logged-in"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={() => handleMenuItemClick('/profile')}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/orders')}>
        <ListItemIcon>
          <LocalShippingIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Orders</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default LoggedInMenu;