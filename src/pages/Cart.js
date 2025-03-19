import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useNavigate } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  // Fetch user and their cart
  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    } else {
      // Check local storage as a fallback
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        fetchCartItems(storedUser.id);
      } else {
        // No user found, redirect to login or show error
        setError('Please log in to view your cart');
        setLoading(false);
      }
    }
  }, [user]);

  const fetchCartItems = async (userId) => {
    try {
      setLoading(true);

      // Fetch the user with their cart data
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();

      if (!userData.cart || userData.cart.length === 0) {
        // User has an empty cart
        setCartItems([]);
        setLoading(false);
        return;
      }

      // Fetch full product details for each item in the cart
      const productsResponse = await fetch('http://localhost:3000/products');
      if (!productsResponse.ok) {
        throw new Error('Failed to fetch products');
      }

      const allProducts = await productsResponse.json();

      // Combine cart items with product details
      const cartWithDetails = userData.cart.map(cartItem => {
        const productDetails = allProducts.find(p => p.id === cartItem.productId);
        if (!productDetails) {
          return null; // Skip items with missing product details
        }
        return {
          ...productDetails,
          quantity: cartItem.quantity
        };
      }).filter(item => item !== null);

      setCartItems(cartWithDetails);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load your shopping cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update updateQuantity, removeItem, and clearCart methods to use dynamic userId
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Determine userId from AuthContext or localStorage
      const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;

      if (!userId) {
        throw new Error('User not found');
      }

      // Rest of the method remains the same as in the original code
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));

      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();

      const updatedCart = userData.cart.map(item =>
        item.productId === id ? { ...item, quantity: newQuantity } : item
      );

      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart })
      });
    } catch (err) {
      console.error('Error updating cart:', err);
      fetchCartItems(user);
    }
  };

  const removeItem = async (id) => {
    try {
      // Determine userId from AuthContext or localStorage
      const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;

      if (!userId) {
        throw new Error('User not found');
      }

      // Rest of the method remains similar to the original
      setCartItems(cartItems.filter(item => item.id !== id));

      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();

      const updatedCart = userData.cart.filter(item => item.productId !== id);

      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart })
      });
    } catch (err) {
      console.error('Error removing item from cart:', err);
      fetchCartItems(user);
    }
  };

  const clearCart = async () => {
    try {
      // Determine userId from AuthContext or localStorage
      const userId = user?.id || JSON.parse(localStorage.getItem('user'))?.id;

      if (!userId) {
        throw new Error('User not found');
      }

      // Update local state immediately
      setCartItems([]);

      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: [] })
      });
    } catch (err) {
      console.error('Error clearing cart:', err);
      fetchCartItems(user);
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Rest of the component remains the same
  const handleContinueShopping = () => {
    navigate('/products');
  };

  // Rest of the return statement remains the same as in the original code
  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your cart...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Your Shopping Cart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Your cart is empty</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2}>
              {/* Cart Header */}
              <Box sx={{ p: 2, backgroundColor: `${blueGrey[300]}` }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Product
                    </Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Price
                    </Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Quantity
                    </Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}

              {/* Action Buttons */}
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  onClick={handleContinueShopping}
                  sx={{ backgroundColor: `${blueGrey[600]}` }}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
