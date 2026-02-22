import React from 'react';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export const Hero = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down('md'));
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        minHeight: isMD ? '60vh' : '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isSM ? '2rem' : '4rem',
        borderBottom: '1px solid #EAEAEA',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          backgroundColor: 'rgba(163, 177, 138, 0.1)', // Sage Green light
          filter: 'blur(100px)',
          zIndex: 0
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: -150,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 163, 115, 0.08)', // Muted Peach light
          filter: 'blur(120px)',
          zIndex: 0
        }}
      />

      <Stack 
        spacing={4} 
        alignItems="center" 
        textAlign="center" 
        sx={{ zIndex: 1, maxWidth: '800px' }}
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#3A5A40', 
              letterSpacing: '0.2em', 
              fontWeight: 600,
              display: 'block',
              mb: 1
            }}
          >
            New Collection 2026
          </Typography>
          <Typography 
            variant={isSM ? "h3" : "h1"} 
            sx={{ 
              color: '#3A5A40', 
              fontWeight: 500, 
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              mb: 2
            }}
          >
            Elevate Your Everyday Style.
          </Typography>
          <Typography 
            variant="h6"
            sx={{ 
              color: '#555', 
              fontWeight: 400,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Discover our curated selection of premium essentials designed with modern minimalism and unparalleled comfort in mind.
          </Typography>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#A3B18A',
              color: 'white',
              fontSize: '1.1rem',
              padding: '12px 36px',
              borderRadius: '30px',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(163, 177, 138, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#588157',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(88, 129, 87, 0.5)',
              }
            }}
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
            }}
          >
            Shop the Collection
          </Button>
        </motion.div>
      </Stack>
    </Box>
  );
};
