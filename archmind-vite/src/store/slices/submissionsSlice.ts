import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submissionService } from '@/services/submissionService';
import type { SubmissionsState, Submission } from '@/types';

type CreateSubmissionPayload = {
  problemId: string;
  userId: string;
  content: string;
};

export const submitSolution = createAsyncThunk(
  'submissions/createSubmission',
  async (
    submission: CreateSubmissionPayload,
    { rejectWithValue },
  ) => {
    try { return await submissionService.create(submission); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const fetchSubmissionById = createAsyncThunk(
  'submissions/getSubmissionById',
  async (id: string, { rejectWithValue }) => {
    try { return await submissionService.getById(id); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

export const fetchSubmissionsByUser = createAsyncThunk(
  'submissions/getSubmissionByUserId',
  async (userId: string, { rejectWithValue }) => {
    try { return await submissionService.getByUser(userId); }
    catch (err: unknown) { return rejectWithValue((err as Error).message); }
  },
);

const initialState: SubmissionsState = {
  list:    [],
  current: null,
  loading: false,
  error:   null,
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    clearCurrent: (s) => { s.current = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSolution.pending,  (s) => { s.loading = true; s.error = null; })
      .addCase(submitSolution.fulfilled,(s) => { s.loading = false; })
      .addCase(submitSolution.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload as string;
      })
      .addCase(fetchSubmissionById.pending,  (s) => { s.loading = true; s.current = null; })
      .addCase(fetchSubmissionById.fulfilled,(s, { payload }) => { s.loading = false; s.current = payload; })
      .addCase(fetchSubmissionById.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload as string;
      })
      .addCase(fetchSubmissionsByUser.fulfilled, (s, { payload }) => {
        s.list = payload;
      });
  },
});

export const { clearCurrent } = submissionsSlice.actions;
export default submissionsSlice.reducer;