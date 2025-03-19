import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const CartSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Shipping:</Typography>
          <Typography variant="body1">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">Tax:</Typography>
          <Typography variant="body1">${tax.toFixed(2)}</Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Total:</Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ color: `${blueGrey[600]}` }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
        
        <Button variant="contained" fullWidth size="large" sx={{backgroundColor: `${blueGrey[500]}`}}>
          <Link to="/checkout" style={{color: 'white', textDecoration: 'none'}}>Proceed to Checkout</Link>
        </Button>
        
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Promo Code"
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />
          <Button variant="outlined" fullWidth sx={{ borderColor: `${blueGrey[600]}`, color: `${blueGrey[600]}` }}>
            Apply Coupon
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartSummary;