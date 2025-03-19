// LoggedOutMenu.jsx
import React from 'react';
import { 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText 
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const LoggedOutMenu = ({ anchorEl, onClose, onNavigate }) => {
  const handleMenuItemClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <Menu
      id="profile-menu-logged-out"
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
      <MenuItem onClick={() => handleMenuItemClick('/login')}>
        <ListItemIcon>
          <LoginIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Login</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default LoggedOutMenu;