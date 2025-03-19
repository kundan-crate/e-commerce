import React from 'react';
import { Paper, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Button, Grid, TextField } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { blueGrey } from '@mui/material/colors';

export const PaymentMethod = ({ paymentMethod, handlePaymentMethodChange, handleBack, handleSubmitOrder, processingOrder }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit Card"
            />
            {paymentMethod === 'credit' && (
              <Box sx={{ pl: 4, pt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      placeholder="123"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Name on Card"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
          
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal"
            />
            {paymentMethod === 'paypal' && (
              <Box sx={{ pl: 4, pt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  You'll be redirected to PayPal to complete your purchase securely.
                </Typography>
              </Box>
            )}
          </Paper>
          
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery"
            />
            {paymentMethod === 'cod' && (
              <Box sx={{ pl: 4, pt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  You'll pay when your order is delivered. Additional fees may apply.
                </Typography>
              </Box>
            )}
          </Paper>
        </RadioGroup>
      </FormControl>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button 
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{color: `${blueGrey[800]}`}}
        >
          Back to Shipping
        </Button>
        <Button
          variant="contained" 
          onClick={handleSubmitOrder}
          disabled={processingOrder || !paymentMethod}
          sx={{backgroundColor: `${blueGrey[500]}`}}
        >
          {processingOrder ? <CircularProgress size={24} /> : 'Place Order'}
        </Button>
      </Box>
    </Paper>
  );
};