import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  useMediaQuery,
  useTheme 
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { motion } from 'framer-motion';
import ProductCard from '../common/ProductCard'; 
import product1 from '../../assets/images/product1.jpg';
import product2 from '../../assets/images/product2.jpg';
import product3 from '../../assets/images/product3.jpg';
import { Link } from 'react-router-dom';

// Mock product data 
const mockProducts = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    image: product1,
    price: 29.99,
    rating: 4.5,
    reviewCount: 128,
    discount: 20,
    isNew: true
  },
  {
    id: 2,
    name: 'Nvidia Rtx 2080',
    image: product2,
    price: 89.99,
    rating: 4.7,
    reviewCount: 256,
    discount: 0,
    isNew: false
  },
  {
    id: 3,
    name: 'Gaming console',
    image: product3,
    price: 59.99,
    rating: 4.3,
    reviewCount: 98,
    discount: 10,
    isNew: true
  }
];

// Main Component
const FeaturedProducts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Monitor when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box 
      ref={sectionRef}
      component="section" 
      sx={{ 
        py: 6,
        bgcolor: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              mb: 5,
              textAlign: 'center',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Featured Products
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 3,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Discover our most popular items handpicked for you
            </Typography>
          </Box>
        </motion.div>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {mockProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} delay={index} />
            </Grid>
          ))}
        </Grid>

        {/* View All Products Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 5
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/products"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: `${blueGrey[500]}`,
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: `${blueGrey[600]}`,
                }
              }}
            >
              View All Products
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;