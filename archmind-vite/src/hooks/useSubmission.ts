import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  submitSolution, fetchSubmissionById,
  fetchSubmissionsByUser, clearCurrent,
} from '@/store/slices/submissionsSlice';
import { selectSubmissions, selectAuth } from '@/store';
import type { Submission } from '@/types';

export function useSubmission() {
  const dispatch      = useAppDispatch();
  const submissionsState = useAppSelector(selectSubmissions);
  const { user }      = useAppSelector(selectAuth);

  const submit = useCallback(async (
    payload: Omit<Submission, 'id' | 'createdAt' | 'status'>,
  ) => {
    return dispatch(submitSolution(payload));
  }, [dispatch]);

  const fetchById = useCallback((id: string) => {
    dispatch(fetchSubmissionById(id));
  }, [dispatch]);

  const fetchByUser = useCallback(() => {
    if (user?.id) dispatch(fetchSubmissionsByUser(user.id));
  }, [dispatch, user]);

  const clear = useCallback(() => {
    dispatch(clearCurrent());
  }, [dispatch]);

  return {
    submissions: submissionsState.list,
    current:     submissionsState.current,
    loading:     submissionsState.loading,
    error:       submissionsState.error,
    submit,
    fetchById,
    fetchByUser,
    clear,
  };
}
