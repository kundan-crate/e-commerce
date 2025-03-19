import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

export const OrderSummary = ({ subtotal = 0, shipping = 0, tax = 0, total = 0 }) => {
  // Ensure all values are numbers before formatting
  const formatValue = (value) => Number(value || 0).toFixed(2);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Subtotal" />
            <Typography variant="body1">${formatValue(subtotal)}</Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Shipping" />
            <Typography variant="body1">${formatValue(shipping)}</Typography>
          </ListItem>

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Tax" />
            <Typography variant="body1">${formatValue(tax)}</Typography>
          </ListItem>

          <Divider />

          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="h6">${formatValue(total)}</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};