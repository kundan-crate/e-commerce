import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Payment as PaymentIcon, 
  CreditCard as CreditCardIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

export const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: 1, 
      type: 'Visa', 
      cardNumber: '**** **** **** 4242', 
      last4: '4242', 
      expiry: '12/26',
      isDefault: true
    },
    { 
      id: 2, 
      type: 'Mastercard', 
      cardNumber: '**** **** **** 5555', 
      last4: '5555', 
      expiry: '09/25',
      isDefault: false
    }
  ]);

  const [addCardDialogOpen, setAddCardDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const [showCVV, setShowCVV] = useState(false);

  const handleAddCard = () => {
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardName || !newCard.expiry || !newCard.cvv) {
      alert('Please fill in all fields');
      return;
    }

    const cardMethod = {
      id: paymentMethods.length + 1,
      type: detectCardType(newCard.cardNumber),
      cardNumber: '**** **** **** ' + newCard.cardNumber.slice(-4),
      last4: newCard.cardNumber.slice(-4),
      expiry: newCard.expiry,
      isDefault: false
    };

    setPaymentMethods([...paymentMethods, cardMethod]);
    setAddCardDialogOpen(false);
    resetNewCard();
  };

  const detectCardType = (cardNumber) => {
    // Simple card type detection
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return 'Credit Card';
  };

  const handleRemoveCard = (id) => {
    // Prevent removing the default card
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
  };

  const handleSetDefaultCard = (id) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    setPaymentMethods(updatedMethods);
  };

  const resetNewCard = () => {
    setNewCard({
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>

      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={() => setAddCardDialogOpen(true)}
        sx={{ mb: 2 }}
      >
        Add New Payment Method
      </Button>

      <Grid container spacing={2}>
        {paymentMethods.map((method) => (
          <Grid item xs={12} sm={6} md={4} key={method.id}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">
                  {method.type}
                </Typography>
                <PaymentIcon />
              </Box>
              <Typography variant="body1">
                {method.cardNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expires: {method.expiry}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  size="small"
                  variant={method.isDefault ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleSetDefaultCard(method.id)}
                  disabled={method.isDefault}
                >
                  {method.isDefault ? 'Default' : 'Set as Default'}
                </Button>
                {!method.isDefault && (
                  <IconButton 
                    color="error" 
                    size="small"
                    onClick={() => handleRemoveCard(method.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add Card Dialog */}
      <Dialog 
        open={addCardDialogOpen} 
        onClose={() => setAddCardDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard(prev => ({
                  ...prev,
                  cardNumber: e.target.value.replace(/\D/g, '')
                }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  )
                }}
                placeholder="1234 5678 9012 3456"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                value={newCard.cardName}
                onChange={(e) => setNewCard(prev => ({
                  ...prev,
                  cardName: e.target.value
                }))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                value={newCard.expiry}
                onChange={(e) => setNewCard(prev => ({
                  ...prev,
                  expiry: e.target.value
                }))}
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                value={newCard.cvv}
                onChange={(e) => setNewCard(prev => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, '')
                }))}
                type={showCVV ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCVV(!showCVV)}
                        edge="end"
                      >
                        {showCVV ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCardDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddCard}
          >
            Add Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};