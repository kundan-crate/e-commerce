import React from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Typography variant="body1">{item.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <Typography variant="body1">${item.price.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <IconButton 
              size="small" 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              size="small"
              value={item.quantity}
              inputProps={{ 
                min: 1, 
                style: { textAlign: 'center', width: '30px' } 
              }}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  updateQuantity(item.id, value);
                }
              }}
            />
            <IconButton 
              size="small" 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" textAlign="right" sx={{ flex: 1 }}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
          <IconButton 
            color="error" 
            onClick={() => removeItem(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default CartItem;