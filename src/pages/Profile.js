import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Payment as PaymentIcon,
  LocationOn as LocationIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Import existing components or create new ones
import { PersonalInfo } from '../components/profile/PersonalInfo';
import { OrderHistory } from '../components/profile/OrderHistory';
import { PaymentMethods } from '../components/profile/PaymentMethods';
import { AddressManagement } from '../components/profile/AddressManagement';
import { Dashboard } from '../components/profile/Dashboard';
import { AccountSettings } from '../components/profile/AccountSettings';
import { Support } from '../components/profile/Support';
import { blueGrey } from '@mui/material/colors';

export const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [hoveredItem, setHoveredItem] = useState(null);

  const MotionListItem = motion(ListItem);

  // Sidebar menu items
  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      component: Dashboard
    },
    {
      key: 'personal',
      label: 'Personal Info',
      icon: <PersonIcon />,
      component: PersonalInfo
    },
    {
      key: 'orders',
      label: 'Order History',
      icon: <ShoppingBagIcon />,
      component: OrderHistory
    },
    {
      key: 'payments',
      label: 'Payment Methods',
      icon: <PaymentIcon />,
      component: PaymentMethods
    },
    {
      key: 'addresses',
      label: 'Addresses',
      icon: <LocationIcon />,
      component: AddressManagement
    },
    {
      key: 'settings',
      label: 'Account Settings',
      icon: <SettingsIcon />,
      component: AccountSettings
    },
    {
      key: 'support',
      label: 'Support',
      icon: <HelpIcon />,
      component: Support
    }
  ];

  // Render the selected component
  const renderSelectedComponent = () => {
    const selectedItem = menuItems.find(item => item.key === selectedMenuItem);
    const SelectedComponent = selectedItem ? selectedItem.component : Dashboard;
    return <SelectedComponent />;
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', mt: 4, mb: 4 }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            position: 'relative'
          },
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            {menuItems.map((item) => (
              <MotionListItem
                key={item.key}
                component="div"
                selected={selectedMenuItem === item.key}
                onClick={() => setSelectedMenuItem(item.key)}
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText'
                    }
                  }
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
              >
                <motion.div whileHover={{ rotate: selectedMenuItem === item.key ? 0 : 5 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </motion.div>
                <ListItemText primary={item.label} />
                
                {/* Hover Underline Animation */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredItem === item.key && selectedMenuItem !== item.key ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: `${blueGrey[500]}`,
                    transformOrigin: 'left',
                    borderRadius: 2
                  }}
                />
              </MotionListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: 3,
          width: 'calc(100% - 240px)'
        }}
      >
        <Paper sx={{ p: 3, minHeight: '80vh' }}>
          {renderSelectedComponent()}
        </Paper>
      </Box>
    </Container>
  );
};