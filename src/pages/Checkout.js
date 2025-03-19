import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  styled
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import { CartReview } from '../components/checkout/CartReview';
import { ShippingDetails } from '../components/checkout/ShippingDetails';
import { PaymentMethod } from '../components/checkout/PaymentMethod';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { motion } from 'framer-motion';

const steps = ['Cart Review', 'Shipping Details', 'Payment'];

// Animation variants for content transition
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Animation variants for stepper icons
const iconVariants = {
  inactive: { scale: 1, opacity: 0.6 },
  active: {
    scale: [1, 1.2, 1],
    opacity: 1,
    color: "#1976d2",
    transition: {
      duration: 0.5,
      repeat: 0,
      repeatType: "reverse"
    }
  },
  completed: {
    scale: 1,
    opacity: 1,
    color: "#4caf50"
  }
};

// Create a custom styled connector with animation
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.Mui-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: 'linear-gradient(to right, #1976d2 100%, #eaeaf0 50%)',
    },
  },
  [`&.Mui-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundColor: '#4caf50',
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    transition: 'all 0.5s ease',
  },
}));

// Custom animated stepper icon
const AnimatedStepIcon = ({ icon, active, completed, index, activeStep }) => {
  // Determine animation state
  let animationState = "inactive";
  if (completed) {
    animationState = "completed";
  } else if (active) {
    animationState = "active";
  }

  return (
    <motion.div
      initial="inactive"
      animate={animationState}
      variants={iconVariants}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, // Ensure icons appear above connector lines
      }}
    >
      {icon}
    </motion.div>
  );
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [processingOrder, setProcessingOrder] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Form state for new address
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  // Get cart items and user addresses on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to checkout' } });
      return;
    }

    const fetchCartAndAddresses = async () => {
      try {
        setLoading(true);

        // Fetch user data including cart and addresses
        const response = await fetch(`http://localhost:3000/users/${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log(userData);
        setCart(userData.cart || []);
        setAddresses(userData.addresses || []);

        // Set default selected address if available
        if (userData.addresses && userData.addresses.length > 0) {
          setSelectedAddress(userData.addresses[0].id);
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndAddresses();
  }, [user, isAuthenticated, navigate]);

  // Set animation completion after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      // Get current user data
      const userResponse = await fetch(`http://localhost:3000/users/${user.id}`);

      const userData = await userResponse.json();

      // Create new address with ID
      const addressWithId = {
        ...newAddress,
        id: Date.now().toString()
      };

      // Add new address to existing addresses
      const updatedAddresses = [...(userData.addresses || []), addressWithId];

      // Update user record
      const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addresses: updatedAddresses
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to add address');
      }

      const updatedUser = await updateResponse.json();

      // Update local state
      setAddresses(updatedUser.addresses);
      setSelectedAddress(addressWithId.id);
      setShowAddressForm(false);
      setNewAddress({
        fullName: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        phone: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to add address');
    }
  };

  const calculateSubtotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 0);
      return sum + (price * quantity);
    }, 0);
  };

  const calculateShipping = () => {
    // Simple shipping calculation logic
    return cart.length > 0 ? 5.99 : 0;
  };

  const calculateTax = () => {
    // Simple tax calculation (e.g., 8% tax)
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    try {
      setProcessingOrder(true);

      // Get current user data
      const userResponse = await fetch(`http://localhost:3000/users/${user.id}`);

      const userData = await userResponse.json();

      // Create new order
      const newOrder = {
        id: `order-${Date.now()}`,
        items: [...cart],
        shippingAddress: addresses.find(addr => addr.id === selectedAddress),
        paymentMethod,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Add new order to existing orders
      const updatedOrders = [...(userData.orders || []), newOrder];

      // Update user record
      const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orders: updatedOrders,
          cart: [] // Clear the cart
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to place order');
      }

      // Navigate to order confirmation
      navigate('/order-confirmation', {
        state: { orderId: newOrder.id }
      });
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      </Collapse>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
        sx={{ mb: 4 }}
      >
        {steps.map((label, index) => {
          // Determine which icon to use
          const StepIcon = index === 0 ? ShoppingCartIcon :
            index === 1 ? LocalShippingIcon :
              PaymentIcon;

          return (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => (
                  <AnimatedStepIcon
                    {...props}
                    icon={<StepIcon />}
                    index={index}
                    activeStep={activeStep}
                  />
                )}
              >
                <motion.span
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0.7,
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                    color: activeStep === index ? '#1976d2' :
                      index < activeStep ? '#4caf50' : 'inherit'
                  }}
                >
                  {label}
                </motion.span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Animated Step Content */}
          <motion.div
            key={activeStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {activeStep === 0 && <CartReview cart={cart} handleNext={handleNext} />}
            {activeStep === 1 && (
              <ShippingDetails
                addresses={addresses}
                selectedAddress={selectedAddress}
                handleAddressChange={handleAddressChange}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                handlePaymentMethodChange={handlePaymentMethodChange}
                handleBack={handleBack}
                handleSubmitOrder={handleSubmitOrder}
                processingOrder={processingOrder}
              />
            )}
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary
            cart={cart}
            subtotal={calculateSubtotal()}
            shipping={calculateShipping()}
            tax={calculateTax()}
            total={calculateTotal()}
          />
        </Grid>
      </Grid>
    </Container>
  );
};