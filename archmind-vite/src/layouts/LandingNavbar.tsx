import React, { useState, useEffect } from 'react';
import {
  Box, Container, Button, IconButton, Drawer,
  List, ListItemButton, Stack, alpha,
} from '@mui/material';
import { MenuOutlined, CloseOutlined, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../component/common/Logo';
import { navigation } from '@/config/navigation';
import { useThemeMode } from '@/contexts/ThemeContext';

export function LandingNavbar() {
  const navigate = useNavigate();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <Box
      component={motion.div}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1300,
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid' : '1px solid transparent',
        borderColor: scrolled ? 'divider' : 'transparent',
        backgroundColor: scrolled
          ? (t) => alpha(t.palette.background.default, 0.88)
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
          <Logo size="medium" onClick={() => navigate('/')} />

          {/* Desktop links */}
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navigation.topNav.map((item) => (
              <Button key={item.label} component={Link} to={item.path}
                sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.875rem' }}>
                {item.label}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
              {mode === 'dark'
                ? <LightModeOutlined sx={{ fontSize: 18 }} />
                : <DarkModeOutlined  sx={{ fontSize: 18 }} />
              }
            </IconButton>
            <Button variant="text" onClick={() => navigate('/login')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'text.secondary', fontWeight: 500 }}>
              Log in
            </Button>
            <Button variant="contained" onClick={() => navigate('/signup')}
              sx={{
                background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)', fontWeight: 600, px: 2.5,
                '&:hover': { background: 'linear-gradient(135deg, #5B52EE, #3DBCB4)' },
              }}>
              Get Started
            </Button>
            <IconButton sx={{ display: { md: 'none' } }} onClick={() => setMobileOpen(true)}>
              <MenuOutlined />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)}><CloseOutlined /></IconButton>
          </Box>
          <List>
            {navigation.topNav.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link} to={item.path}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
