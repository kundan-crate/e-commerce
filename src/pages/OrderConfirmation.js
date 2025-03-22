import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Rating,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { blueGrey } from '@mui/material/colors';

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [review, setReview] = useState({
    rating: 5,
    comment: '',
    products: [],
  });

  // Get orderId from location state or URL params
  const orderId = location.state?.orderId || new URLSearchParams(location.search).get('orderId');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const userData = await response.json();

        let foundOrder = null;

        if (orderId) {
          foundOrder = userData.orders?.find(o => o.id === orderId);
        }

        if (!foundOrder && userData.orders && userData.orders.length > 0) {
          foundOrder = userData.orders[0]; // Assuming the most recent order is first
          console.log("No order ID specified, showing most recent order:", foundOrder.id);
        }

        if (foundOrder) {
          setOrder(foundOrder);

          if (foundOrder.items?.length) {
            setReview(prev => ({
              ...prev,
              products: foundOrder.items.map(item => ({
                id: item.id,
                name: item.name,
                rating: 5,
                comment: ''
              }))
            }));
          }
        } else {
          throw new Error('No orders found for this account');
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || 'Failed to load order information');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get current user data
      const userResponse = await fetch(`http://localhost:3000/users/${user.id}`);

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data for review submission');
      }

      const userData = await userResponse.json();

      // Create review object
      const newReview = {
        id: `review-${Date.now()}`,
        orderId: orderId,
        overallRating: review.rating,
        comment: review.comment,
        productReviews: review.products.map(product => ({
          productId: product.id,
          productName: product.name,
          rating: product.rating,
          comment: product.comment
        })),
        date: new Date().toISOString()
      };

      // Add review to user data
      const updatedReviews = [...(userData.reviews || []), newReview];

      // Update user record
      const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews: updatedReviews
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to submit review');
      }

      setReviewSubmitted(true);
      setTimeout(() => {
        setShowReviewForm(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.message || 'Failed to submit review');
    }
  };

  const handleRatingChange = (value) => {
    setReview(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handleProductRatingChange = (index, value) => {
    const updatedProducts = [...review.products];
    updatedProducts[index].rating = value;
    setReview(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  const handleProductCommentChange = (index, value) => {
    const updatedProducts = [...review.products];
    updatedProducts[index].comment = value;
    setReview(prev => ({
      ...prev,
      products: updatedProducts
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </Box>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">Order not found. Please check the order ID and try again.</Alert>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/account/orders')}>
            View All Orders
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Snackbar
        open={reviewSubmitted}
        autoHideDuration={3000}
        onClose={() => setReviewSubmitted(false)}
      >
        <Alert severity="success">Review submitted successfully!</Alert>
      </Snackbar>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <CheckCircleIcon color="success" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h4" component="h1">
              Order Confirmed!
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            Thank you for your order. We've received your order and will begin processing it soon.
          </Typography>

          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Order Number: {order.id}
            </Typography>
            <Typography variant="body2">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <List sx={{ mb: 3 }}>
            {order.items.map((item) => (
              <ListItem key={item.id} alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="span">
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.primary">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                      <Typography component="span" variant="body2" display="block">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Shipping Address
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {order.shippingAddress.fullName}
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.line1}
                    {order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`}
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.country}
                  </Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payment Information
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {order.paymentMethod === 'credit' ? 'Credit Card' :
                      order.paymentMethod === 'paypal' ? 'PayPal' :
                        order.paymentMethod === 'stripe' ? 'Stripe' :
                          order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Other'}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Billing Address:</strong> Same as shipping
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Total
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="body2">Subtotal:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" align="right">${order.subtotal.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Shipping:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" align="right">${order.shipping.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">Tax:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" align="right">${order.tax.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight="bold" align="right">${order.total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalShippingIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Delivery Information
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Estimated Delivery: {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Chip
                  label={order.status.toUpperCase()}
                  color={order.status === 'pending' ? 'warning' : 'success'}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2">
                  Status: {order.status}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button
              sx={{backgroundColor: `${blueGrey[500]}`}}
              variant="contained"
              onClick={() => navigate('/')
              }
            >
              Continue Shopping
            </Button>
          </Box>

          {!showReviewForm ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: `${blueGrey[500]}` }}
                onClick={() => setShowReviewForm(true)}
                startIcon={<StarIcon />}
              >
                Rate Your Order
              </Button>
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Rate Your Order
                </Typography>

                <form onSubmit={handleReviewSubmit}>
                  <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Overall Rating
                    </Typography>
                    <Rating
                      name="overall-rating"
                      value={review.rating}
                      onChange={(event, newValue) => handleRatingChange(newValue)}
                      precision={0.5}
                      size="large"
                    />
                  </Box>

                  <Box mb={3}>
                    <TextField
                      label="Overall Comment"
                      multiline
                      rows={4}
                      value={review.comment}
                      onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                      fullWidth
                      variant="outlined"
                      placeholder="How was your overall experience?"
                    />
                  </Box>

                  <Typography variant="subtitle1" gutterBottom>
                    Product Ratings
                  </Typography>

                  {review.products.map((product, index) => (
                    <Box key={product.id} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {product.name}
                      </Typography>
                      <Rating
                        name={`product-rating-${product.id}`}
                        value={product.rating}
                        onChange={(event, newValue) => handleProductRatingChange(index, newValue)}
                        precision={0.5}
                      />
                      <TextField
                        label="Product Comment"
                        multiline
                        rows={2}
                        value={product.comment}
                        onChange={(e) => handleProductCommentChange(index, e.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="Comments about this product"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  ))}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      type="button"
                      sx={{ color: `${blueGrey[500]}` }}
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: `${blueGrey[500]}` }}
                    >
                      Submit Review
                    </Button>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};