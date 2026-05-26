import apiClient from './apiClient';
import { API } from '@/constants';
import type { Submission, SubmissionFeedback } from '@/types';
import { mockSubmissions, mockFeedback } from '@/mocks/data';

const USE_MOCK = true;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const submissionService = {
  /** POST /api/submission */
  create: async (submission: Omit<Submission, 'id' | 'createdAt' | 'status'>): Promise<Submission> => {
    if (USE_MOCK) {
      await delay(2000);
      return {
        ...submission,
        id: `s_${Date.now()}`,
        status: 'EVALUATING',
        createdAt: new Date().toISOString(),
      };
    }
    const { data } = await apiClient.post<Submission>(API.SUBMISSIONS.BASE, submission);
    return data;
  },

  /** GET /api/submission/:id */
  getById: async (id: string): Promise<SubmissionFeedback> => {
    if (USE_MOCK) {
      await delay(500);
      return { ...mockFeedback, submissionId: id };
    }
    const { data } = await apiClient.get<SubmissionFeedback>(API.SUBMISSIONS.BY_ID(id));
    return data;
  },

  /** GET /api/submission/user/:userId */
  getByUser: async (userId: string): Promise<Submission[]> => {
    if (USE_MOCK) { await delay(300); return mockSubmissions; }
    const { data } = await apiClient.get<Submission[]>(API.SUBMISSIONS.BY_USER(userId));
    return data;
  },

  /** GET /api/submission/problem/:problemId */
  getByProblem: async (problemId: string): Promise<Submission[]> => {
    if (USE_MOCK) return mockSubmissions.filter((s) => s.problemId === problemId);
    const { data } = await apiClient.get<Submission[]>(API.SUBMISSIONS.BY_PROBLEM(problemId));
    return data;
  },

  /** DELETE /api/submission/:id */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API.SUBMISSIONS.BY_ID(id));
  },
};