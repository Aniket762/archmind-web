import { configureStore } from '@reduxjs/toolkit';
import authReducer        from './slices/authSlice';
import problemsReducer    from './slices/problemsSlice';
import submissionsReducer from './slices/submissionsSlice';

export const store = configureStore({
  reducer: {
    auth:        authReducer,
    problems:    problemsReducer,
    submissions: submissionsReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ─── Typed selectors ─────────────────────────────────────────────────────────

export const selectAuth        = (s: RootState) => s.auth;
export const selectProblems    = (s: RootState) => s.problems;
export const selectSubmissions = (s: RootState) => s.submissions;
