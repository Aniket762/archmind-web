import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { useThemeMode } from '@/contexts/ThemeContext';

interface Props { size?: 'small' | 'medium' }

export function ThemeToggle({ size = 'small' }: Props) {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton size={size} onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
        {mode === 'dark'
          ? <LightModeOutlined sx={{ fontSize: size === 'small' ? 18 : 22 }} />
          : <DarkModeOutlined  sx={{ fontSize: size === 'small' ? 18 : 22 }} />
        }
      </IconButton>
    </Tooltip>
  );
}
