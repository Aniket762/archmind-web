import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { problemService, type ProblemFilters } from '@/services/problemService';
import type { ProblemsState, Problem } from '@/types';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchProblems = createAsyncThunk(
  'problems/fetchAll',
  async (filters: ProblemFilters, { rejectWithValue }) => {
    try {
      return await problemService.getAll({ ...filters, offset: 0, limit: 12 });
    }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const fetchMoreProblems = createAsyncThunk(
  'problems/fetchMore',
  async (filters: ProblemFilters & { offset: number }, { rejectWithValue }) => {
    try {
      return await problemService.getAll({ ...filters, offset: filters.offset, limit: 12 });
    }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const fetchProblemById = createAsyncThunk(
  'problems/fetchById',
  async (id: string, { rejectWithValue }) => {
    try { return await problemService.getById(id); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const createProblem = createAsyncThunk(
  'problems/create',
  async (problem: Omit<Problem, 'id'>, { rejectWithValue }) => {
    try { return await problemService.create(problem); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const updateProblem = createAsyncThunk(
  'problems/update',
  async ({ id, data }: { id: string; data: Partial<Problem> }, { rejectWithValue }) => {
    try { return await problemService.update(id, data); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const deleteProblem = createAsyncThunk(
  'problems/delete',
  async (id: string, { rejectWithValue }) => {
    try { await problemService.delete(id); return id; }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: ProblemsState = {
  list:       [],
  total:      0,
  current:    null,
  loading:    false,
  loadingMore: false,
  submitting: false,
  error:      null,
  filters:    { level: '', topic: '', search: '', status: '' },
  offset:     0,
  hasMore:    true,
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    setFilter: (state, action: { payload: Partial<ProblemsState['filters']> }) => {
      state.filters = { ...state.filters, ...action.payload };
      state.offset = 0;
      state.hasMore = true;
    },
    clearFilters: (state) => {
      state.filters = { level: '', topic: '', search: '', status: '' };
      state.offset = 0;
      state.hasMore = true;
    },
    clearCurrent: (state) => { state.current = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending,  (s) => { s.loading = true; s.error = null; s.offset = 0; })
      .addCase(fetchProblems.fulfilled,(s, { payload }) => {
        s.loading = false; 
        s.list = payload; 
        s.total = payload.length;
        s.offset = payload.length;
        s.hasMore = payload.length >= 12;
      })
      .addCase(fetchProblems.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload as string;
      })

      .addCase(fetchMoreProblems.pending,  (s) => { s.loadingMore = true; })
      .addCase(fetchMoreProblems.fulfilled,(s, { payload }) => {
        s.loadingMore = false;
        s.list = [...s.list, ...payload];
        s.offset += payload.length;
        s.hasMore = payload.length >= 12;
      })
      .addCase(fetchMoreProblems.rejected, (s, { payload }) => {
        s.loadingMore = false; s.error = payload as string;
      })

      .addCase(fetchProblemById.pending,  (s) => { s.loading = true; s.current = null; })
      .addCase(fetchProblemById.fulfilled,(s, { payload }) => { s.loading = false; s.current = payload; })
      .addCase(fetchProblemById.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload as string;
      })

      .addCase(deleteProblem.fulfilled, (s, { payload }) => {
        s.list = s.list.filter((p) => p.id !== payload);
      });
  },
});

export const { setFilter, clearFilters, clearCurrent } = problemsSlice.actions;
export default problemsSlice.reducer;