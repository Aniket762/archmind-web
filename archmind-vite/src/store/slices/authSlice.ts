import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import { STORAGE } from '@/constants';
import type { AuthState, LoginRequest, RegisterRequest, User } from '@/types';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Login failed';
      return rejectWithValue(msg);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message ?? 'Registration failed';
      return rejectWithValue(msg);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// ─── Initial state ────────────────────────────────────────────────────────────

const storedUser = authService.getStoredUser();
const storedToken = localStorage.getItem(STORAGE.TOKEN);

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
  isAuthenticated: !!storedToken,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser:    (state, action: { payload: User }) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    const pending   = (state: AuthState) => { state.loading = true; state.error = null; };
    const rejected  = (state: AuthState, action: { payload?: unknown }) => {
      state.loading = false;
      state.error   = (action.payload as string | undefined) ?? 'An error occurred';
    };

    builder
      .addCase(loginUser.pending,    pending)
      .addCase(loginUser.rejected,   rejected)
      .addCase(loginUser.fulfilled,  (state, { payload }) => {
        state.loading        = false;
        state.user           = payload.user;
        state.token          = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.pending,   pending)
      .addCase(registerUser.rejected,  rejected)
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading        = false;
        state.user           = payload.user;
        state.token          = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user            = null;
        state.token           = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;