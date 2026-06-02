import type { Level, Topic, SubmissionStatus } from '@/types';


export const LEVELS: Level[] = ['EASY', 'MEDIUM', 'HARD'];

export const LEVEL_LABEL: Record<Level, string> = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

export const LEVEL_COLOR: Record<Level, string> = {
  EASY: '#51CF66',
  MEDIUM: '#FFB347',
  HARD: '#FF6B6B',
};

export const LEVEL_BG: Record<Level, string> = {
  EASY: 'rgba(81,207,102,0.1)',
  MEDIUM: 'rgba(255,179,71,0.1)',
  HARD: 'rgba(255,107,107,0.1)',
};

export const TOPICS: Topic[] = [
   'DATABASE',
    'MICROSERVICE',
    'CACHE',
    'QUEUE',
    'GATEWAY',
    'STORAGE',
    'CDN',
    'PROXY',
  'STORAGE_AND_RETRIEVAL',
  'SOCIAL_MEDIA',
  'INFRASTRUCTURE',
  'REAL_TIME_SYSTEMS',
  'MESSAGING',
  'DISTRIBUTED_SYSTEMS',
  'API_DESIGN',
  'MICROSERVICES',
];

export const TOPIC_LABEL: Record<Topic, string> = {
  DATABASE: 'Database',
  MICROSERVICE: 'Microservice',
  CACHE: 'Cache',
  QUEUE: 'Queue',
  GATEWAY: 'Gateway',
  STORAGE: 'Storage',
  CDN: 'CDN',
  PROXY: 'Proxy',
  STORAGE_AND_RETRIEVAL: 'Storage & Retrieval',
  SOCIAL_MEDIA: 'Social Media',
  INFRASTRUCTURE: 'Infrastructure',
  REAL_TIME_SYSTEMS: 'Real-time Systems',
  MESSAGING: 'Messaging',
  DISTRIBUTED_SYSTEMS: 'Distributed Systems',
  API_DESIGN: 'API Design',
  MICROSERVICES: 'Microservices',
};

export const SUBMISSION_STATUS_LABEL: Record<SubmissionStatus, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  EVALUATING: 'Evaluating...',
  EVALUATED: 'Evaluated',
  FAILED: 'Failed',
};


export const API = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
 PROBLEMS: {
    BASE: '/api/problems/getAllProblems',  
    BY_ID: (id: string) => `/api/problems/getProblemsById/${id}`,
    BY_LEVEL: (level: Level) => `/api/problems/getProblemsByLevel/${level}`,
    BY_TOPIC: (topic: Topic) => `/api/problems/getProblemsByTopic/${topic}`,
    SEARCH: '/api/problems/search',
    ALL_TOPICS:  '/api/problems/getAllTopics',
  },
  SUBMISSIONS: {
  BASE: '/api/submission/createSubmission',           
  BY_ID: (id: string) => `/api/submission/getSubmissionById/${id}`,
  BY_USER: (userId: string) => `/api/submission/getSubmissionByUserId/${userId}`,
  BY_PROBLEM: (problemId: string) => `/api/submission/getSubmissionByProblemId/${problemId}`,
},
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  DASHBOARD: {
  STATS: (userId: string) => `/api/dashboard/getDashboardStats/${userId}`,
},
} as const;

export const STORAGE = {
  TOKEN: 'archdesign_token',
  REFRESH_TOKEN: 'archdesign_refresh',
  USER: 'archdesign_user',
  THEME: 'archdesign_theme',
  DRAFT_PREFIX: 'draft_',
} as const;

export const SCORE = {
  EXCELLENT: 90,
  GOOD: 75,
  AVERAGE: 60,
} as const;

export function getScoreColor(score: number): string {
  if (score >= SCORE.EXCELLENT) return '#51CF66';
  if (score >= SCORE.GOOD) return '#6C63FF';
  if (score >= SCORE.AVERAGE) return '#FFB347';
  return '#FF6B6B';
}

export function getScoreLabel(score: number): string {
  if (score >= SCORE.EXCELLENT) return 'Excellent';
  if (score >= SCORE.GOOD) return 'Good';
  if (score >= SCORE.AVERAGE) return 'Needs Improvement';
  return 'Poor';
}


