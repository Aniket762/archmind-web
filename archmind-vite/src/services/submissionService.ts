import apiClient from './apiClient';
import { API } from '@/constants';
import type { Submission, SubmissionFeedback } from '@/types';
import { mockSubmissions, mockFeedback } from '@/mocks/data';

const USE_MOCK = false;
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const submissionService = {

  /** POST /api/submission/createSubmission */
  create: async (payload: {
    problemId: string;
    userId: string;
    content: string;
  }): Promise<Submission> => {
    if (USE_MOCK) {
      await delay(2000);
      return {
        id: `s_${Date.now()}`,
        submissionId: `s_${Date.now()}`,
        userId: payload.userId,
        problemId: payload.problemId,
        solution: payload.content,
        language: 'JAVA',
        submittedAt: new Date().toISOString(),
        score: 0,
      };
    }

    const { data } = await apiClient.post<Submission>(
      API.SUBMISSIONS.BASE,
      {
        userId:    payload.userId,
        problemId: payload.problemId,
        solution:  payload.content,   
        language:  'JAVA',            
      }
    );
    return data;
  },

 
  getById: async (id: string): Promise<SubmissionFeedback> => {
    if (USE_MOCK) {
      await delay(500);
      return { ...mockFeedback, submissionId: id };
    }
    const { data } = await apiClient.get<SubmissionFeedback>(
      API.SUBMISSIONS.BY_ID(id)
    );
    return data;
  },

  /** GET /api/submission/user/{userId} */
  getByUser: async (userId: string): Promise<Submission[]> => {
    if (USE_MOCK) {
      await delay(300);
      return mockSubmissions;
    }
    const { data } = await apiClient.get<Submission[]>(
      API.SUBMISSIONS.BY_USER(userId)
    );
    return data;
  },

  /** GET /api/submission/problem/{problemId} */
  getByProblem: async (problemId: string): Promise<Submission[]> => {
    if (USE_MOCK) return mockSubmissions;
    const { data } = await apiClient.get<Submission[]>(
      API.SUBMISSIONS.BY_PROBLEM(problemId)
    );
    return data;
  },

  /** DELETE /api/submission/{id} */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API.SUBMISSIONS.BY_ID(id));
  },
};