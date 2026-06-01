import apiClient from './apiClient';
import { API } from '@/constants';
import type { DashboardStats } from '@/types';

export const dashboardService = {
  getStats: async (userId: string): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>(
      API.DASHBOARD.STATS(userId)
    );
    return data;
  },
};