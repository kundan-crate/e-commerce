import React, { useState } from 'react';
import { 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Avatar
} from '@mui/material';
import { Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material';

export const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 E-Commerce St, Shopping City, SC 12345',
    profileImage: 'https://via.placeholder.com/150'
  });

  const [editFormData, setEditFormData] = useState({...userData});

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditFormData({...userData});
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({...editFormData});
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <Avatar 
            src={userData.profileImage} 
            sx={{ width: 150, height: 150, mb: 2 }} 
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button 
            variant={isEditing ? "outlined" : "contained"} 
            color={isEditing ? "error" : "primary"}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSubmit : handleEditToggle}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={isEditing ? editFormData.firstName : userData.firstName}
            onChange={handleFormChange}
            disabled={!isEditing}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={isEditing ? editFormData.lastName : userData.lastName}
            onChange={handleFormChange}
            disabled={!isEditing}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={isEditing ? editFormData.email : userData.email}
            onChange={handleFormChange}
            disabled={!isEditing}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={isEditing ? editFormData.phone : userData.phone}
            onChange={handleFormChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={isEditing ? editFormData.address : userData.address}
            onChange={handleFormChange}
            disabled={!isEditing}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Box>
  );
};