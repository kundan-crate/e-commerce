import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Rating,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { useCart } from '../context/CartContext'; // Import the cart hook
import { useAuth } from '../context/AuthContext'; // Import the auth hook - assume it exists

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Get cart functions from context
  const { addToCart } = useCart();
  // Get user from auth context
  const { user } = useAuth(); // Changed from currentUser to user

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // First, fetch the entire products array
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      
      // Find the specific product by id (as string)
      const foundProduct = products.find(p => p.id === id);
      if (!foundProduct) {
        throw new Error('Product not found');
      }
      
      setProduct(foundProduct);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!user || !user.id) { // Changed from currentUser to user
        // Redirect to login if user is not authenticated
        setNotification({
          open: true,
          message: 'Please log in to add items to your cart',
          severity: 'warning'
        });
        // Optionally redirect to login page
        // navigate('/login', { state: { from: `/products/${id}` } });
        return;
      }

      const userId = user.id; // Changed from currentUser to user
      
      // Get current user data including their cart
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      
      const userData = await response.json();
      const currentCart = userData.cart || [];
      
      // Check if product already exists in cart
      const existingProductIndex = currentCart.findIndex(item => item.productId === id);
      
      let updatedCart;
      if (existingProductIndex >= 0) {
        // Product already in cart, update quantity
        updatedCart = [...currentCart];
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        // Product not in cart, add it
        updatedCart = [...currentCart, { productId: id, quantity: quantity }];
      }
      
      // Update the user's cart in the database
      const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart })
      });
      
      if (!updateResponse.ok) throw new Error("Failed to update cart");
      
      // Add to cart context if available
      if (typeof addToCart === 'function') {
        addToCart(product, quantity);
      }
      
      setNotification({
        open: true,
        message: `${product.name} added to your cart`,
        severity: 'success'
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      setNotification({
        open: true,
        message: 'Failed to add product to cart',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error || 'Product not found'}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 4, backgroundColor: `${blueGrey[500]}`, color: 'white' }}
      >
        Back to Products
      </Button>

      {/* Product Header */}
      <Grid container spacing={6}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: 1
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Tags */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {product.isNew && (
                <Chip label="NEW" color="primary" size="small" />
              )}
              {product.discount > 0 && (
                <Chip label={`${product.discount}% OFF`} color="error" size="small" />
              )}
              <Chip label={product.category} size="small" />
            </Stack>

            {/* Title */}
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>

            {/* Brand & SKU */}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Brand: {product.brand} | SKU: {product.sku}
            </Typography>

            {/* Rating */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} reviews)
              </Typography>
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              {product.discount > 0 && (
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.price}
                </Typography>
              )}
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${((100 - product.discount) * product.price / 100).toFixed(2)}
              </Typography>
            </Stack>

            {/* Quantity Selector */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Typography>Quantity:</Typography>
              <Paper variant="outlined" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <IconButton 
                  size="small"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                <IconButton 
                  size="small"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                >
                  <AddIcon />
                </IconButton>
              </Paper>
              <Typography variant="body2" color="text.secondary">
                {product.stock} units available
              </Typography>
            </Stack>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ mb: 3, backgroundColor: `${blueGrey[500]}`, color: 'white' }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            
            {product.stock === 0 && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                Out of stock
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Sections */}
      {product.description && (
        <Box sx={{ mt: 8 }}>
          <Grid container spacing={4}>
            {/* Description */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>Description</Typography>
              <Typography>{product.description}</Typography>
            </Grid>

            {/* Highlights */}
            {product.highlights && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Highlights</Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    {product.highlights.map((highlight, index) => (
                      <Typography key={index} variant="body1">
                        • {highlight}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            )}

            {/* Specifications */}
            {product.specifications && (
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Specifications</Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableBody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                            {key}
                          </TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            {/* Features */}
            {product.features && (
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>Key Features</Typography>
                <Grid container spacing={3}>
                  {product.features.map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 2, height: '100%' }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;