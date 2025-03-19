import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Paper,
  Stack,
  Fade
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import { blueGrey } from '@mui/material/colors';

const bannerImages = [banner1, banner2, banner3];

const HeroSection = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const handleView = (e) => {
    navigate('/products');
  }

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? '60vh' : '80vh',
        overflow: 'hidden',
        mb: 4
      }}
    >
      {/* Background Image with Parallax Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bannerImages[currentBanner]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease-out',
          transform: 'scale(1.05)',
          '&:hover': {
            transform: 'scale(1.0)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)', // Overlay to make text readable
          }
        }}
      />

      {/* Banner Indicators */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentBanner(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index === currentBanner ? `${blueGrey[500]}` : 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Stack>

      {/* Content Container */}
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Fade in={isVisible} timeout={800}>
          <Box>
            {/* Banner text content */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'transparent',
                color: 'white',
                maxWidth: isMobile ? '90%' : '60%',
                p: isMobile ? 2 : 4,
                borderLeft: `4px solid ${blueGrey[500]}`,
              }}
            >
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {currentBanner === 0 && "Summer Collection 2025"}
                {currentBanner === 1 && "New Arrivals Weekly"}
                {currentBanner === 2 && "Exclusive Deals"}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  maxWidth: '90%'
                }}
              >
                {currentBanner === 0 && "Discover the latest trends with up to 40% off selected items"}
                {currentBanner === 1 && "Be the first to explore our freshest styles every week"}
                {currentBanner === 2 && "Members get special access to limited edition products"}
              </Typography>

              <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleView}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: `${blueGrey[500]}`,
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      backgroundColor: `${blueGrey[600]}`,
                      boxShadow: 4
                    }
                  }}
                >
                  {currentBanner === 0 && "Shop Collection"}
                  {currentBanner === 1 && "Browse New Arrivals"}
                  {currentBanner === 2 && "View Deals"}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<LocalOfferIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Special Offers
                </Button>
              </Stack>

              {/* Optional promotional badge */}
              {currentBanner === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: isMobile ? -10 : -40,
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(15deg)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'rotate(15deg) scale(1)' },
                      '50%': { transform: 'rotate(15deg) scale(1.05)' },
                      '100%': { transform: 'rotate(15deg) scale(1)' }
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">LIMITED</Typography>
                  <Typography variant="h6" fontWeight="bold">40% OFF</Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeroSection;