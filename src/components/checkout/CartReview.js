import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Divider, 
  Box, 
  Button 
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import { blueGrey } from '@mui/material/colors';

export const CartReview = ({ cart, handleNext }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Review Your Cart
      </Typography>
      
      {cart.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          Your cart is empty
        </Alert>
      ) : (
        <Box>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.productId}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {" - "}{item.description || ""}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    ${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={cart.length === 0}
              sx={{ backgroundColor: `${blueGrey[500]}` }}
            >
              Continue to Shipping
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};