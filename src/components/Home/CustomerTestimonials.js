import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Rating, 
  IconButton,
  Paper,
  useTheme 
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { blueGrey } from '@mui/material/colors';
import johnsmith from '../../assets/images/johnsmith.jpg';
import sarahjohnson from '../../assets/images/sarahjohnson.jpg';
import mikewilliams from '../../assets/images/mikewilliams.jpg';

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Tech Enthusiast',
    avatar: johnsmith,
    rating: 5,
    review: "The quality of products and customer service is exceptional. I've purchased several gaming accessories, and each one has exceeded my expectations.",
    purchasedItem: 'Gaming Headset Pro X'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Professional Gamer',
    avatar: sarahjohnson,
    rating: 5,
    review: "Best tech store I've found! Their computer components are top-notch, and the technical support team is incredibly knowledgeable.",
    purchasedItem: 'RTX 4080 Graphics Card'
  },
  {
    id: 3,
    name: 'Mike Williams',
    role: 'IT Professional',
    avatar: mikewilliams,
    rating: 4,
    review: "Great selection of networking equipment. The detailed product descriptions and competitive prices make it my go-to store for all networking needs.",
    purchasedItem: 'Enterprise Router'
  }
];

const TestimonialCard = ({ testimonial, isActive }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={isActive ? 6 : 1}
      sx={{
        p: 4,
        height: '100%',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
        opacity: isActive ? 1 : 0.7,
        borderRadius: 4,
      }}
    >
      <FormatQuoteIcon 
        sx={{ 
          fontSize: 60,
          color: `${blueGrey[500]}`,
          position: 'absolute',
          top: 20,
          right: 20
        }} 
      />

      <Box sx={{ mb: 3 }}>
        <Rating value={testimonial.rating} readOnly precision={0.5} />
      </Box>

      <Typography 
        variant="body1" 
        sx={{ 
          mb: 3,
          fontStyle: 'italic',
          color: 'text.secondary',
          minHeight: 100
        }}
      >
        "{testimonial.review}"
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{ 
            width: 56, 
            height: 56,
            bgcolor: theme.palette.primary.main
          }}
          src={testimonial.avatar}
        >
          {!testimonial.avatar && "No Image"}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {testimonial.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {testimonial.role}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color:  `${blueGrey[400]}`,
              display: 'block',
              mt: 0.5
            }}
          >
            Purchased: {testimonial.purchasedItem}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const CustomerTestimonials = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box 
      component="section" 
      sx={{ 
        py: 8,
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2"
            sx={{ 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Customer Reviews
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            See what our customers have to say about their experience with us
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[4],
              zIndex: 2,
              '&:hover': {
                backgroundColor: `${blueGrey[500]}`,
                color: 'white'
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[4],
              zIndex: 2,
              '&:hover': {
                backgroundColor: `${blueGrey[500]}`,
                color: 'white'
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Testimonials Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 3,
              px: { xs: 2, md: 8 }
            }}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isVisible = 
                index === currentIndex || 
                index === (currentIndex + 1) % testimonials.length || 
                index === (currentIndex + 2) % testimonials.length;

              return isVisible && (
                <TestimonialCard 
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={isActive}
                />
              );
            })}
          </Box>

          {/* Pagination Dots */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 7
            }}
          >
            {testimonials.map((_, index) => (
              <IconButton
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  p: 0.5,
                  color: index === currentIndex 
                    ? 'primary.main'
                    : 'grey.400'
                }}
              >
                <FiberManualRecordIcon 
                  sx={{ 
                    fontSize: index === currentIndex ? 12 : 8,
                    transition: 'all 0.3s ease'
                  }} 
                />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerTestimonials;