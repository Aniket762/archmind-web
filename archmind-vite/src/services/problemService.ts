import apiClient from './apiClient';
import { API } from '@/constants';
import type { Problem, Level, Topic } from '@/types';
import { mockProblems } from '@/mocks/data';

const USE_MOCK = true;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface ProblemFilters {
  search?: string;
  level?: Level | '';
  topic?: Topic | '';
}

export const problemService = {
  /** GET /api/problems */
  getAll: async (filters: ProblemFilters = {}): Promise<Problem[]> => {
    if (USE_MOCK) {
      await delay(400);
      let results = [...mockProblems];
      if (filters.level)  results = results.filter((p) => p.level === filters.level);
      if (filters.topic)  results = results.filter((p) => p.topic === filters.topic);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        results = results.filter((p) => p.title.toLowerCase().includes(q));
      }
      return results;
    }
    const { data } = await apiClient.get<Problem[]>(API.PROBLEMS.BASE, { params: filters });
    return data;
  },

  /** GET /api/problems/:id */
  getById: async (id: string): Promise<Problem> => {
    if (USE_MOCK) {
      await delay(300);
      const p = mockProblems.find((x) => x.id === id);
      if (!p) throw new Error('Problem not found');
      return p;
    }
    const { data } = await apiClient.get<Problem>(API.PROBLEMS.BY_ID(id));
    return data;
  },

  /** GET /api/problems/level/:level */
  getByLevel: async (level: Level): Promise<Problem[]> => {
    if (USE_MOCK) return mockProblems.filter((p) => p.level === level);
    const { data } = await apiClient.get<Problem[]>(API.PROBLEMS.BY_LEVEL(level));
    return data;
  },

  /** GET /api/problems/topic/:topic */
  getByTopic: async (topic: Topic): Promise<Problem[]> => {
    if (USE_MOCK) return mockProblems.filter((p) => p.topic === topic);
    const { data } = await apiClient.get<Problem[]>(API.PROBLEMS.BY_TOPIC(topic));
    return data;
  },

  /** GET /api/problems/search?keyword= */
  search: async (keyword: string): Promise<Problem[]> => {
    if (USE_MOCK) {
      const q = keyword.toLowerCase();
      return mockProblems.filter((p) => p.title.toLowerCase().includes(q));
    }
    const { data } = await apiClient.get<Problem[]>(API.PROBLEMS.SEARCH, { params: { keyword } });
    return data;
  },

  /** POST /api/problems  (admin) */
  create: async (problem: Omit<Problem, 'id'>): Promise<Problem> => {
    const { data } = await apiClient.post<Problem>(API.PROBLEMS.BASE, problem);
    return data;
  },

  /** PUT /api/problems/:id  (admin) */
  update: async (id: string, problem: Partial<Problem>): Promise<Problem> => {
    const { data } = await apiClient.put<Problem>(API.PROBLEMS.BY_ID(id), problem);
    return data;
  },

  /** DELETE /api/problems/:id  (admin) */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API.PROBLEMS.BY_ID(id));
  },
};