// ─── Backend-aligned enums ───────────────────────────────────────────────────

export type Level = 'EASY' | 'MEDIUM' | 'HARD';
export type Topic =
  | 'STORAGE_AND_RETRIEVAL'
  | 'SOCIAL_MEDIA'
  | 'INFRASTRUCTURE'
  | 'REAL_TIME_SYSTEMS'
  | 'MESSAGING'
  | 'DISTRIBUTED_SYSTEMS'
  | 'API_DESIGN'
  | 'MICROSERVICES';

export type UserRole = 'USER' | 'ADMIN';
export type SubmissionStatus = 'DRAFT' | 'SUBMITTED' | 'EVALUATING' | 'EVALUATED' | 'FAILED';

// ─── Backend models ────────────────────────────────────────────────────────────

/** Matches archmind.model.problem.Problem */
export interface Problem {
  id: string;
  title: string;
  description: string;
  level: Level;
  topic: Topic;
  companies: string[];
  tags: string[];
  hints: string[];
  rubric: Record<string, number>;
  solvedBy?: number;
  successRate?: number;
  premium?: boolean;
}

/** Matches archmind.model.user.User */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt?: string;
  avatarUrl?: string;
  streak?: number;
  rank?: number;
  totalScore?: number;
}

/** Matches archmind.model.solution.Submission */
export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  content: string;
  status: SubmissionStatus;
  score?: number;
  feedback?: SubmissionFeedback;
  createdAt: string;
  updatedAt?: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** Matches blog.api.dto.RegisterRequest */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// ─── Feedback (AI evaluation, not in backend yet) ────────────────────────────

export interface RubricScore {
  score: number;
  max: number;
  comment: string;
}

export interface SubmissionFeedback {
  submissionId: string;
  problemTitle: string;
  overallScore: number;
  scores: Record<string, RubricScore>;
  strengths: string[];
  weaknesses: string[];
  missingConcepts: string[];
  suggestions: string[];
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface PagedResponse<T> {
  content: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  solved: number;
  total: number;
  streak: number;
  rank: number;
  score: number;
  easyCount: { solved: number; total: number };
  mediumCount: { solved: number; total: number };
  hardCount: { solved: number; total: number };
}

export interface SubmissionTrendPoint {
  month: string;
  submissions: number;
  avgScore: number;
}

export interface SkillRadarPoint {
  skill: string;
  score: number;
  fullMark: number;
}

// ─── Discussions ─────────────────────────────────────────────────────────────

export interface DiscussionAuthor {
  name: string;
  avatar: string;
  reputation: number;
}

export interface Discussion {
  id: string;
  problemId: string;
  title: string;
  content: string;
  author: DiscussionAuthor;
  votes: number;
  replies: number;
  createdAt: string;
  pinned: boolean;
  tags: string[];
}

// ─── Store slices ─────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface ProblemsState {
  list: Problem[];
  total: number;
  current: Problem | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  filters: ProblemsFilter;
}

export interface ProblemsFilter {
  level?: Level | '';
  topic?: Topic | '';
  search?: string;
  status?: 'SOLVED' | 'UNSOLVED' | '';
}

export interface UsersState {
  list: User[];
  current: User | null;
  loading: boolean;
  error: string | null;
}

export interface SubmissionsState {
  list: Submission[];
  current: SubmissionFeedback | null;
  loading: boolean;
  error: string | null;
}
