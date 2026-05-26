import {
  DashboardOutlined,
  CodeOutlined,
  ForumOutlined,
  BarChartOutlined,
  PersonOutlined,
  AdminPanelSettingsOutlined,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
}

export const navigation = {
  sidebar: [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: DashboardOutlined },
    { id: 'problems',  label: 'Problems',  path: '/problems',  icon: CodeOutlined },
    { id: 'discussions', label: 'Discussions', path: '/discussions', icon: ForumOutlined },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: BarChartOutlined },
    { id: 'profile',   label: 'Profile',   path: '/profile',   icon: PersonOutlined },
  ] satisfies NavItem[],

  adminSidebar: [
    { id: 'admin', label: 'Admin', path: '/admin', icon: AdminPanelSettingsOutlined },
  ] satisfies NavItem[],

  topNav: [
    { label: 'Product', path: '/#features' },
    { label: 'Problems', path: '/#problems' },
    { label: 'Pricing', path: '/#pricing' },
  ],
} as const;