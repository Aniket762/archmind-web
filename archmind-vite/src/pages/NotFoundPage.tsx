import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/variants';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'background.default', textAlign: 'center', p: 4,
    }}>
      <motion.div {...fadeIn}>
        <Typography sx={{ fontSize: 72, mb: 2 }}>🧭</Typography>
        <Typography variant="h3" fontWeight={800} letterSpacing="-0.03em" mb={1}>
          404 — Lost in the Architecture
        </Typography>
        <Typography color="text.secondary" mb={4} maxWidth={400}>
          The page you're looking for doesn't exist, or has been moved.
        </Typography>
        <Button
          variant="contained" size="large"
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
            fontWeight: 700, px: 4,
          }}
        >
          Back to Home
        </Button>
      </motion.div>
    </Box>
  );
}
