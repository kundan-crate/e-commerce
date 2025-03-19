import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import VerifiedIcon from '@mui/icons-material/Verified';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import BoltIcon from '@mui/icons-material/Bolt';
import { b } from 'framer-motion/client';
import { blueGrey } from '@mui/material/colors';

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: 'Secure Shopping',
    description: 'Bank-level security for all transactions with advanced encryption and fraud protection.',
    highlight: '100% Secure Payments'
  },
  {
    icon: <AccessTimeFilledIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service with expert technical assistance whenever you need it.',
    highlight: 'Always Available'
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: 'Quality Guaranteed',
    description: 'All products are thoroughly tested and come with manufacturer warranty coverage.',
    highlight: 'Premium Products'
  },
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: 'Fast Delivery',
    description: 'Express shipping options with real-time tracking for all your orders.',
    highlight: 'Quick & Reliable'
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy with free shipping on eligible items.',
    highlight: 'No Questions Asked'
  },
  {
    icon: <ThumbUpAltIcon sx={{ fontSize: 40, color: `${blueGrey[500]}` }} />,
    title: 'Best Prices',
    description: 'Competitive pricing with price match guarantee and regular deals & discounts.',
    highlight: 'Value for Money'
  }
];

const WhyUsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            We provide the best-in-class service with premium products and unmatched customer support
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '80%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[4],
                    bgcolor: `${blueGrey[500]}`,
                    '& .feature-icon': {
                      color: 'white !important'
                    },
                    '& .feature-text': {
                      color: 'white'
                    }
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box className="feature-icon">{feature.icon}</Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mb: 1 }}
                  className="feature-text"
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                  className="feature-text"
                >
                  {feature.description}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold' }}
                  className="feature-text"
                >
                  {feature.highlight}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default WhyUsSection;