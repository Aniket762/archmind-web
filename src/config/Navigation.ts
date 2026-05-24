import React from "react";
import {
  DashboardOutlined,
  CodeOutlined,
  ForumOutlined,
  BarChartOutlined,
  PersonOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";

export interface SidebarNavItem{
    id: string;
    label: string;
    path: string;
    icon: React.ComponentType;
}

export interface TopNavItem{
    label: string;
    path: string;
}

export interface NavigationConfig{
    sidebar: SidebarNavItem[];
    adminSidebar: SidebarNavItem[];
    topNav: TopNavItem[];
}

export const navigation: NavigationConfig = {
  sidebar: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: DashboardOutlined,
    },
    {
      id: "problems",
      label: "Problems",
      path: "/problems",
      icon: CodeOutlined,
    },
    {
      id: "discussions",
      label: "Discussions",
      path: "/discussions",
      icon: ForumOutlined,
    },
    {
      id: "analytics",
      label: "Analytics",
      path: "/analytics",
      icon: BarChartOutlined,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: PersonOutlined,
    },
  ],
  adminSidebar: [
    {
      id: "admin",
      label: "Admin",
      path: "/admin",
      icon: AdminPanelSettingsOutlined,
    },
  ],
  topNav: [
    { label: "Product", path: "/#features" },
    { label: "Problems", path: "/#problems" },
    { label: "Pricing", path: "/#pricing" },
  ],
};