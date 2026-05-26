import apiClient from './apiClient';
import { API } from '@/constants';
import type { User } from '@/types';

export const userService = {
  /** GET /api/users */
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>(API.USERS.BASE);
    return data;
  },

  /** GET /api/users/:id */
  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(API.USERS.BY_ID(id));
    return data;
  },

  /** PUT /api/users/:id */
  update: async (id: string, payload: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<User>(API.USERS.BY_ID(id), payload);
    return data;
  },

  /** DELETE /api/users/:id */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API.USERS.BY_ID(id));
  },
};