import apiClient from './apiClient';
import { API, STORAGE } from '@/constants';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types';

// ─── Mock mode (flip to false when Spring backend is running) ─────────────────
const USE_MOCK = false;

const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'USER',
  joinedAt: '2023-06-15',
  streak: 7,
  rank: 1842,
  totalScore: 2840,
};

export const authService = {
  /** POST /api/auth/login */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(700);
      const res: AuthResponse = { token: 'mock_token', refreshToken: 'mock_refresh', user: mockUser };
      persist(res);
      return res;
    }
    const { data } = await apiClient.post<AuthResponse>(API.AUTH.LOGIN, credentials);
    persist(data);
    return data;
  },

  /** POST /api/auth/register  (maps to blog.api.dto.RegisterRequest) */
  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(700);
      const res: AuthResponse = {
        token: 'mock_token',
        refreshToken: 'mock_refresh',
        user: { ...mockUser, name: payload.name, email: payload.email },
      };
      persist(res);
      return res;
    }
    const { data } = await apiClient.post<AuthResponse>(API.AUTH.REGISTER, payload);
    persist(data);
    return data;
  },

  /** POST /api/auth/logout */
 logout: async (): Promise<void> => {
  try { await apiClient.post(API.AUTH.LOGOUT); } 
  catch {} 
  finally { clearStorage(); }  
},

  /** GET /api/auth/me */
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(API.AUTH.ME);
    return data;
  },

  isAuthenticated: (): boolean => !!localStorage.getItem(STORAGE.TOKEN),
  getStoredUser: (): User | null => {
    try { return JSON.parse(localStorage.getItem(STORAGE.USER) ?? 'null'); } catch { return null; }
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function persist(res: AuthResponse) {
  localStorage.setItem(STORAGE.TOKEN, res.token);
  localStorage.setItem(STORAGE.REFRESH_TOKEN, res.refreshToken);
  localStorage.setItem(STORAGE.USER, JSON.stringify(res.user));
}

function clearStorage() {
  localStorage.removeItem(STORAGE.TOKEN);
  localStorage.removeItem(STORAGE.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE.USER);
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));