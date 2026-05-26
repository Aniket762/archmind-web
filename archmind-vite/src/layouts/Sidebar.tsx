import React from 'react';
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Drawer, Tooltip, Divider, alpha,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navigation, type NavItem } from '@/config/navigation';
import { Logo } from '@/component/common/Logo';
import { useAppSelector } from '@/hooks/redux';
import { selectAuth } from '@/store';

const FULL_WIDTH      = 220;
const COLLAPSED_WIDTH = 64;

interface SidebarProps {
  collapsed?: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function NavLink({ item, collapsed, onClick }: { item: NavItem; collapsed: boolean; onClick?: () => void }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const active    = location.pathname.startsWith(item.path);
  const Icon      = item.icon;

  const btn = (
    <motion.div whileHover={{ x: collapsed ? 0 : 2 }} transition={{ duration: 0.15 }}>
      <ListItemButton
        onClick={() => { navigate(item.path); onClick?.(); }}
        sx={{
          borderRadius: 2, mb: 0.5, px: 1.5, py: 1, minHeight: 40,
          justifyContent: collapsed ? 'center' : 'flex-start',
          backgroundColor: active ? (t) => alpha(t.palette.primary.main, 0.12) : 'transparent',
          '&:hover': {
            backgroundColor: (t) =>
              active ? alpha(t.palette.primary.main, 0.16) : alpha(t.palette.primary.main, 0.07),
          },
          '& .MuiListItemIcon-root': {
            color: active ? 'primary.main' : 'text.secondary',
            minWidth: collapsed ? 0 : 36,
          },
        }}
      >
        <ListItemIcon><Icon sx={{ fontSize: 20 }} /></ListItemIcon>
        {!collapsed && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: active ? 600 : 500,
              color: active ? 'primary.main' : 'text.primary',
            }}
          />
        )}
      </ListItemButton>
    </motion.div>
  );

  return collapsed
    ? <Tooltip key={item.id} title={item.label} placement="right" arrow>{btn}</Tooltip>
    : <React.Fragment key={item.id}>{btn}</React.Fragment>;
}

function SidebarContent({ collapsed, onMobileClose }: { collapsed: boolean; onMobileClose?: () => void }) {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const items    = [...navigation.sidebar, ...(user?.role === 'ADMIN' ? navigation.adminSidebar : [])];

  return (
    <Box sx={{
      width: collapsed ? COLLAPSED_WIDTH : FULL_WIDTH,
      height: '100%', display: 'flex', flexDirection: 'column',
      backgroundColor: 'background.paper',
      borderRight: '1px solid', borderColor: 'divider',
      overflow: 'hidden', transition: 'width 0.25s ease',
    }}>
      <Box sx={{ px: 2, py: 2.5, minHeight: 64, display: 'flex', alignItems: 'center' }}>
        {collapsed
          ? <Box onClick={() => navigate('/dashboard')} sx={{
              width: 32, height: 32, borderRadius: 1.5, cursor: 'pointer',
              background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 11, color: 'white',
            }}>AM</Box>
          : <Logo size="small" onClick={() => navigate('/dashboard')} />
        }
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 1.5, flex: 1 }} disablePadding>
        {items.map((item) => (
          <NavLink key={item.id} item={item} collapsed={collapsed} onClick={onMobileClose} />
        ))}
      </List>
    </Box>
  );
}

export function Sidebar({ collapsed = false, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <Box component="nav" sx={{
        display: { xs: 'none', md: 'block' },
        width: collapsed ? COLLAPSED_WIDTH : FULL_WIDTH,
        flexShrink: 0, transition: 'width 0.25s ease',
      }}>
        <Box sx={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 1200 }}>
          <SidebarContent collapsed={collapsed} />
        </Box>
      </Box>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: FULL_WIDTH, backgroundColor: 'background.paper' },
        }}
      >
        <SidebarContent collapsed={false} onMobileClose={onMobileClose} />
      </Drawer>
    </>
  );
}
