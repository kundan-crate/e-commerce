import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Avatar,
  IconButton
} from '@mui/material';
import { 
  ShoppingBag as ShoppingBagIcon, 
  Payment as PaymentIcon, 
  Favorite as FavoriteIcon 
} from '@mui/icons-material';

export const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Quick Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <ShoppingBagIcon />
                </Avatar>
              }
              title="Total Orders"
              action={
                <IconButton aria-label="settings">
                  <FavoriteIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                12 Orders
              </Typography>
              <Typography variant="body2">
                Lifetime total purchase: $1,245.67
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <PaymentIcon />
                </Avatar>
              }
              title="Payment Methods"
              action={
                <IconButton aria-label="settings">
                  <FavoriteIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                2 Payment Methods
              </Typography>
              <Typography variant="body2">
                Visa **** 4242, Mastercard **** 5555
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title="Recent Activity"
            />
            <CardContent>
              <Typography variant="body2">
                • Wireless Headphones order delivered
                • Profile updated on Jan 15, 2025
                • Smart Watch order shipped
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};