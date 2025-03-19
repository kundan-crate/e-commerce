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
  IconButton
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  AddLocation as AddLocationIcon 
} from '@mui/icons-material';

export const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      street: '123 E-Commerce St',
      city: 'Shopping City',
      state: 'SC',
      zipCode: '12345',
      phone: '(123) 456-7890',
      isDefault: true
    }
  ]);

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      name: editingAddress.name,
      street: editingAddress.street,
      city: editingAddress.city,
      state: editingAddress.state,
      zipCode: editingAddress.zipCode,
      phone: editingAddress.phone,
      isDefault: false
    };

    setAddresses([...addresses, newAddress]);
    setAddressDialogOpen(false);
    setEditingAddress(null);
  };

  const handleEditAddress = () => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id ? editingAddress : addr
    );
    setAddresses(updatedAddresses);
    setAddressDialogOpen(false);
    setEditingAddress(null);
  };

  const handleRemoveAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
  };

  const openAddressDialog = (address = null) => {
    setEditingAddress(address ? { ...address } : {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    });
    setAddressDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Address Management
      </Typography>
      <Button 
        variant="contained" 
        startIcon={<AddLocationIcon />}
        onClick={() => openAddressDialog()}
        sx={{ mb: 2 }}
      >
        Add New Address
      </Button>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {address.name}
                {address.isDefault && (
                  <Typography 
                    component="span" 
                    variant="caption" 
                    color="primary" 
                    sx={{ ml: 1 }}
                  >
                    (Default)
                  </Typography>
                )}
              </Typography>
              <Typography variant="body1">{address.street}</Typography>
              <Typography variant="body1">
                {address.city}, {address.state} {address.zipCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address.phone}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button 
                  size="small"
                  onClick={() => handleSetDefaultAddress(address.id)}
                  disabled={address.isDefault}
                >
                  Set as Default
                </Button>
                <Box>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => openAddressDialog(address)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleRemoveAddress(address.id)}
                    disabled={address.isDefault}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Address Dialog */}
      <Dialog 
        open={addressDialogOpen} 
        onClose={() => setAddressDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAddress?.id ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={editingAddress?.name || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  name: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={editingAddress?.street || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  street: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={editingAddress?.city || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  city: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                value={editingAddress?.state || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  state: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={editingAddress?.zipCode || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  zipCode: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={editingAddress?.phone || ''}
                onChange={(e) => setEditingAddress({
                  ...editingAddress,
                  phone: e.target.value
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={editingAddress?.id ? handleEditAddress : handleAddAddress}
          >
            {editingAddress?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};