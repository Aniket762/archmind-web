import React from 'react';
import { Box, Typography } from '@mui/material';
import { branding } from '@/config/branding';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const sizes = {
  small:  { box: 28, text: '0.9rem'  },
  medium: { box: 36, text: '1.1rem'  },
  large:  { box: 48, text: '1.4rem'  },
};

export function Logo({ size = 'medium', onClick }: LogoProps) {
  const s = sizes[size];
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        cursor: onClick ? 'pointer' : 'default', userSelect: 'none',
      }}
    >
      <Box
        sx={{
          width: s.box, height: s.box, borderRadius: 1.5, flexShrink: 0,
          background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: `calc(${s.box}px * 0.4)`,
          color: 'white', letterSpacing: '-0.05em',
        }}
      >
        {branding.logoText}
      </Box>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: s.text, letterSpacing: '-0.03em', lineHeight: 1,
          background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}
      >
        {branding.appName}
      </Typography>
    </Box>
  );
}
