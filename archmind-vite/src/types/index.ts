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
  slug: string;
  title: string;
  description: string;
  level: Level;
  topics: string[];          // array, not single enum
  hint: string[];            // singular to match your DB
  companies?: string[];      // optional — not in your DB yet
  tags?: string[];           // optional
  rubric?: Record<string, number>; // optional
  testCase?: string[];
  createdBy?: string;
  isPublished?: boolean;
  solvedBy?: number;
  successRate?: number;
  premium?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Matches archmind.model.user.User */
export interface User {
  id: string;           // maps from userId via @JsonProperty
  name: string;         // maps from userName via @JsonProperty
  email: string;
  role: UserRole;       // maps from userRole via @JsonProperty
  userStatus?: string;
  isEmailValid?: boolean;
  joinedAt?: string;    // not in your DB, keep optional
  avatarUrl?: string;   // not in your DB, keep optional
  streak?: number;      // not in your DB, keep optional
  rank?: number;        // not in your DB, keep optional
  totalScore?: number;  // not in your DB, keep optional
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

/** Matches archmind.model.solution.Submission */
export interface Submission {
  id?: string;              // maps from submissionId via @JsonProperty
  submissionId?: string;    // raw backend field
  userId: string;
  problemId: string;
  solution?: string;        // backend field name
  content?: string;         // frontend field name (mapped before sending)
  language?: string;
  submittedAt?: string;
  createdAt?: string;
  score?: number;
  status?: SubmissionStatus;
  feedback?: SubmissionFeedback;
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
