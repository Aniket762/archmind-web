import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { fetchProblems, fetchProblemById, setFilter, clearFilters } from '@/store/slices/problemsSlice';
import { selectProblems } from '@/store';
import type { ProblemsFilter } from '@/types';

export function useProblems() {
  const dispatch = useAppDispatch();
  const state    = useAppSelector(selectProblems);

  const load = useCallback((filters?: ProblemsFilter) => {
    dispatch(fetchProblems({
      level:  filters?.level  || undefined,
      topic:  filters?.topic  || undefined,
      search: filters?.search || undefined,
    }));
  }, [dispatch]);

  const loadById = useCallback((id: string) => {
    dispatch(fetchProblemById(id));
  }, [dispatch]);

  const updateFilter = useCallback((patch: Partial<ProblemsFilter>) => {
    dispatch(setFilter(patch));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    problems:  state.list,
    current:   state.current,
    loading:   state.loading,
    error:     state.error,
    filters:   state.filters,
    total:     state.total,
    load,
    loadById,
    updateFilter,
    resetFilters,
  };
}
