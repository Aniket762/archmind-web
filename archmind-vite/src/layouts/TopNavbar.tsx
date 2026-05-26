import React, { useState } from 'react';
import {
  AppBar, Toolbar, Box, IconButton, Avatar, Tooltip,
  Typography, Badge, Menu, MenuItem, Divider, alpha, Stack,
} from '@mui/material';
import {
  MenuOutlined, LightModeOutlined, DarkModeOutlined,
  NotificationsOutlined, KeyboardArrowDownOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectAuth } from '@/store';
import { logoutUser } from '@/store/slices/authSlice';
import { useThemeMode } from '@/contexts/ThemeContext';

interface Props {
  onMenuClick: () => void;
  title?: string;
}

export function TopNavbar({ onMenuClick, title }: Props) {
  const navigate       = useNavigate();
  const dispatch       = useAppDispatch();
  const { user }       = useAppSelector(selectAuth);
  const { mode, toggleTheme } = useThemeMode();
  const [anchor, setAnchor]   = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <AppBar
      position="sticky" elevation={0}
      sx={{
        backgroundColor: (t) => alpha(t.palette.background.default, 0.85),
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid', borderColor: 'divider',
        color: 'text.primary', zIndex: 1100,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: { xs: 56, md: 64 } }}>
        <IconButton onClick={onMenuClick} size="small" sx={{ mr: 1, display: { md: 'none' } }}>
          <MenuOutlined />
        </IconButton>

        {title && (
          <Typography component="h6" variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
              {mode === 'dark'
                ? <LightModeOutlined sx={{ fontSize: 19 }} />
                : <DarkModeOutlined  sx={{ fontSize: 19 }} />
              }
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={3} color="primary" max={9}>
                <NotificationsOutlined sx={{ fontSize: 19 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box
            onClick={(e) => setAnchor(e.currentTarget)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, ml: 0.5,
              px: 1, py: 0.5, borderRadius: 2, cursor: 'pointer',
              '&:hover': { backgroundColor: 'action.hover' }, transition: 'background 0.15s',
            }}
          >
            <Avatar sx={{
              width: 30, height: 30, fontSize: '0.8rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
            }}>
              {user?.name?.[0] ?? 'U'}
              
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
              {user?.name?.split(' ')[0] ?? 'User'}
            </Typography>
            <KeyboardArrowDownOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
          </Box>

          <Menu
            anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            PaperProps={{
              elevation: 4,
              sx: { mt: 1, minWidth: 180, borderRadius: 2, border: '1px solid', borderColor: 'divider' },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" fontWeight={600}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { navigate('/profile'); setAnchor(null); }} sx={{ fontSize: '0.875rem' }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/analytics'); setAnchor(null); }} sx={{ fontSize: '0.875rem' }}>
              Analytics
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem', color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
