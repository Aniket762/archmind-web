import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux';
import { loginUser, registerUser, logoutUser, clearError } from '@/store/slices/authSlice';
import { selectAuth } from '@/store';
import type { LoginRequest, RegisterRequest } from '@/types';

export function useAuth() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const authState = useAppSelector(selectAuth);

  const login = useCallback(async (credentials: LoginRequest) => {
    dispatch(clearError());
    const result = await dispatch(loginUser(credentials));
    if (!result.type.endsWith('rejected')) {
      navigate('/dashboard');
      return true;
    }
    return false;
  }, [dispatch, navigate]);

  const register = useCallback(async (payload: RegisterRequest) => {
    dispatch(clearError());
    const result = await dispatch(registerUser(payload));
    if (!result.type.endsWith('rejected')) {
      navigate('/dashboard');
      return true;
    }
    return false;
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate('/');
  }, [dispatch, navigate]);

  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...authState,
    login,
    register,
    logout,
    dismissError,
    isAdmin: authState.user?.role === 'ADMIN',
  };
}
