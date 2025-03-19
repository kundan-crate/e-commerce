import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MemoryIcon from '@mui/icons-material/Memory';
import RouterIcon from '@mui/icons-material/Router';
import { blueGrey } from '@mui/material/colors';

const categories = [
  {
    id: 1,
    name: 'Gaming & Consoles',
    description: 'Latest gaming systems, accessories & games',
    icon: SportsEsportsIcon
  },
  {
    id: 2,
    name: 'Audio Equipments',
    description: 'Premium headphones, speakers & accessories',
    icon: HeadphonesIcon
  },
  {
    id: 3,
    name: 'Computer Components',
    description: 'High-performance GPUs, CPUs & PC parts',
    icon: MemoryIcon
  },
  {
    id: 4,
    name: 'Computer Accessories',
    description: 'Routers, switches & networking solutions',
    icon: RouterIcon
  }
];

const CategoryCard = ({ category, index, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;

  const cardStyles = isActive ? {
    backgroundColor: blueGrey[50],
    transform: 'translateY(-8px)',
    boxShadow: 6,
    borderLeft: `4px solid ${blueGrey[700]}`
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(category.name)}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 6
          },
          ...cardStyles
        }}
      >
        <motion.div
          animate={{
            scale: isHovered || isActive ? 1.05 : 1,
            rotate: isHovered || isActive ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            padding: 40,
            borderRadius: '50%',
            backgroundColor: isActive ? blueGrey[300] : blueGrey[200],
          }}
        />
        
        <CardContent sx={{ p: 4 }}>
          <motion.div
            animate={{
              scale: isHovered || isActive ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon 
              sx={{ 
                fontSize: 48, 
                color: isActive ? blueGrey[900] : blueGrey[700],
                mb: 2
              }}
            />
          </motion.div>

          <Typography 
            variant="h5" 
            component="h3"
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: isActive ? blueGrey[900] : 'inherit'
            }}
          >
            {category.name}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProductCategories = ({ onCategoryClick, activeCategory }) => {
  const theme = useTheme();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

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

  const handleCardClick = (categoryName) => {
    if (onCategoryClick) {
      // If clicking the same category, deselect it
      onCategoryClick(activeCategory === categoryName ? null : categoryName);
    }
  };

  return (
    <Box 
      ref={sectionRef}
      component="section" 
      sx={{ 
        py: 8,
        bgcolor: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <CategoryCard 
                category={category} 
                index={index}
                isActive={activeCategory === category.name}
                onClick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductCategories;