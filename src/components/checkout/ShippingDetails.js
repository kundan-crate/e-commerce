import React from 'react';
import {
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Collapse,
  Grid,
  TextField
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, AddCircleOutline as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { blueGrey } from '@mui/material/colors';

export const ShippingDetails = ({
  addresses,
  selectedAddress,
  handleAddressChange,
  handleAddAddress,
  handleAddressInputChange,
  newAddress,
  showAddressForm,
  setShowAddressForm,
  handleNext,
  handleBack
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>

      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <FormLabel component="legend">Select Delivery Address</FormLabel>

        {addresses.length === 0 && !showAddressForm ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No addresses found. Please add a new address.
          </Alert>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            {addresses.map((address) => (
              <Paper
                key={address.id}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  borderColor: selectedAddress === address.id ? 'primary.main' : 'divider'
                }}
              >
                <FormControlLabel
                  value={address.id}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1">{address.fullName}</Typography>
                      <Typography variant="body2">
                        {address.line1}
                        {address.line2 ? `, ${address.line2}` : ''}
                      </Typography>
                      <Typography variant="body2">
                        {address.city}, {address.state} {address.zipCode}
                      </Typography>
                      <Typography variant="body2">{address.country}</Typography>
                      <Typography variant="body2">{address.phone}</Typography>
                    </Box>
                  }
                />
              </Paper>
            ))}
          </RadioGroup>
        )}

        <Collapse in={showAddressForm}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Add New Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  value={newAddress.fullName}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="line1"
                  label="Address Line 1"
                  value={newAddress.line1}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="line2"
                  label="Address Line 2 (Optional)"
                  value={newAddress.line2}
                  onChange={handleAddressInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  value={newAddress.city}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  label="State/Province"
                  value={newAddress.state}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="zipCode"
                  label="Zip/Postal Code"
                  value={newAddress.zipCode}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  label="Country"
                  value={newAddress.country}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={newAddress.phone}
                  onChange={handleAddressInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleAddAddress}
                  fullWidth
                  sx={{ backgroundColor: `${blueGrey[500]}` }}
                >
                  Save Address
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>

        <Button
          startIcon={showAddressForm ? <CloseIcon /> : <AddIcon />}
          onClick={() => setShowAddressForm(!showAddressForm)}
          sx={{ mt: 1 }}
        >
          {showAddressForm ? 'Cancel' : 'Add New Address'}
        </Button>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{ color: `${blueGrey[800]}` }}
        >
          Back to Cart
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          disabled={!selectedAddress}
          sx={{ backgroundColor: `${blueGrey[500]}` }}
        >
          Continue to Payment
        </Button>
      </Box>
    </Paper>
  );
};