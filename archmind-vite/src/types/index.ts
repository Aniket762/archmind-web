
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

export interface Problem {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  topics: string[];         
  hint: string[];          
  companies?: string[];      
  tags?: string[];          
  rubric?: Record<string, number>;
  testCase?: string[];
  createdBy?: string;
  isPublished?: boolean;
  solvedBy?: number;
  successRate?: number;
  premium?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;          
  name: string;         
  email: string;
  role: UserRole;       
  userStatus?: string;
  isEmailValid?: boolean;
  joinedAt?: string;   
  avatarUrl?: string;   
  streak?: number;      
  rank?: number;        
  totalScore?: number; 
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface Submission {
  id?: string;              
  submissionId?: string;    
  userId: string;
  problemId: string;
  solution?: string;       
  content?: string;         
  language?: string;
  submittedAt?: string;
  createdAt?: string;
  score?: number;
  status?: SubmissionStatus;
  feedback?: SubmissionFeedback;
}

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

// REPLACE the existing DashboardStats interface
export interface DashboardStats {
  // top stat cards
  totalSolved: number;        // was: solved
  totalProblems: number;      // was: total
  currentStreak: number;      // was: streak
  globalRank: number;         // was: rank
  totalScore: number;         // was: score

  // difficulty breakdown
  easySolved: number;         // was: easyCount.solved
  easyTotal: number;          // was: easyCount.total
  mediumSolved: number;       // was: mediumCount.solved
  mediumTotal: number;        // was: mediumCount.total
  hardSolved: number;         // was: hardCount.solved
  hardTotal: number;          // was: hardCount.total

  // charts + widgets
  submissionTrend: SubmissionTrendPoint[];
  skillBreakdown: SkillRadarPoint[];
  activityData: DayActivity[];
  recentSubmissions: RecentSubmission[];
}

// REPLACE the existing SubmissionTrendPoint — no change needed, already matches
export interface SubmissionTrendPoint {
  month: string;
  submissions: number;
  avgScore: number;
}

// REPLACE the existing SkillRadarPoint — rename to match backend field name
export interface SkillRadarPoint {
  skill: string;
  score: number;
  fullMark: number;
}

// ADD these two new ones below
export interface DayActivity {
  date: string;    // "2024-01-15"
  count: number;
}

export interface RecentSubmission {
  submissionId: string;
  problemId: string;
  problemTitle: string;
  level: Level;
  score: number | null;
  status: string;
  submittedAt: string;
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
