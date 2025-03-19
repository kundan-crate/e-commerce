import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      className="footer"
      sx={{
        backgroundColor: `${blueGrey[400]}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={12}>
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your trusted online shopping destination for quality products.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/products" color="textSecondary" display="block" className="footer-link">
              Products
            </Link>
            <Link href="/cart" color="textSecondary" display="block" className="footer-link">
              Cart
            </Link>
            <Link href="/orders" color="textSecondary" display="block" className="footer-link">
              Orders
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: support@eshop.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} E-Shop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;