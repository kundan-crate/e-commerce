import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Rating,
  Stack,
  Skeleton,
  Typography,
  useTheme
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { motion } from 'framer-motion';

// ProductCard component with animations
const ProductCard = ({ product, delay = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme();
  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300 + delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price - (price * discount / 100)).toFixed(2);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 1,
          '&:hover': {
            boxShadow: 6
          },
          transition: 'all 0.3s ease'
        }}
      >
        {/* Discount Tag */}
        {product.discount > 0 && (
          <Chip
            label={`${product.discount}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 2,
              fontWeight: 'bold'
            }}
          />
        )}

        {/* New Tag */}
        {product.isNew && (
          <Chip
            label="NEW"
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: product.discount > 0 ? 45 : 10,
              left: 10,
              zIndex: 2,
              backgroundColor: '#0288d1',
              fontWeight: 'bold'
            }}
          />
        )}


        {/* Product Image - with skeleton loading */}
        {!isLoaded ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            animation="wave"
          />
        ) : (
          <Box sx={{ position: 'relative', pt: '100%' }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Box>
        )}

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {!isLoaded ? (
            <>
              <Skeleton animation="wave" height={32} width="80%" />
              <Skeleton animation="wave" height={22} width="40%" />
              <Skeleton animation="wave" height={30} width="60%" />
            </>
          ) : (
            <>
              {/* Product Details */}
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                noWrap
                sx={{
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {product.name}
              </Typography>

              {/* Ratings */}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Rating
                  value={product.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  ({product.reviewCount})
                </Typography>
              </Stack>

              {/* Price */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mt: 'auto',
                  mb: 1.5
                }}
              >
                {product.discount > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through',
                    }}
                  >
                    ${product.price}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  color={product.discount > 0 ? "error.main" : "text.primary"}
                  fontWeight="bold"
                >
                  ${calculateDiscountedPrice(product.price, product.discount)}
                </Typography>
              </Stack>

              {/* Add to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleViewProduct}
                  sx={{
                    py: 1,
                    mt: 'auto',
                    borderRadius: 8,
                    textTransform: 'none',
                    backgroundColor: `${blueGrey[500]}`,
                    fontWeight: 'bold'
                  }}
                >
                  View Product
                </Button>
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;