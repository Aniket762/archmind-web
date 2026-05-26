import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box sx={{
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
        ml: { md: collapsed ? '64px' : '220px' },
        transition: 'margin-left 0.25s ease',
      }}>
        <TopNavbar onMenuClick={() => setMobileOpen(true)} />
        <Box
          component="main"
          sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2.5, sm: 3 }, maxWidth: '100%' }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
