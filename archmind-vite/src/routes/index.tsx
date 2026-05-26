import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AppLayout }     from '@/layouts/AppLayout';
import { useAppSelector } from '@/hooks/redux';
import { selectAuth }    from '@/store';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────

const LandingPage          = lazy(() => import('@/pages/LandingPage'));
const LoginPage            = lazy(() => import('@/pages/LoginPage'));
const SignupPage            = lazy(() => import('@/pages/SignupPage'));
const DashboardPage        = lazy(() => import('@/pages/DashboardPage'));
const ProblemsPage         = lazy(() => import('@/pages/ProblemsPage'));
const ProblemDetailPage    = lazy(() => import('@/pages/ProblemDetailPage'));
const SubmissionResultPage = lazy(() => import('@/pages/SubmissionResultPage'));
const DiscussionsPage      = lazy(() => import('@/pages/DiscussionsPage'));
const ProfilePage          = lazy(() => import('@/pages/ProfilePage'));
const AnalyticsPage        = lazy(() => import('@/pages/AnalyticsPage'));
const AdminPage            = lazy(() => import('@/pages/AdminPage'));
const NotFoundPage         = lazy(() => import('@/pages/NotFoundPage'));

// ─── Fallback spinner ─────────────────────────────────────────────────────────

function PageLoader() {
  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'background.default',
    }}>
      <CircularProgress size={36} thickness={3} />
    </Box>
  );
}

// ─── Auth guard ───────────────────────────────────────────────────────────────

function RequireAuth() {
  const { isAuthenticated } = useAppSelector(selectAuth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RequireAdmin() {
  const { user } = useAppSelector(selectAuth);
  if (!user || user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function RedirectIfAuth() {
  const { isAuthenticated } = useAppSelector(selectAuth);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth pages — redirect to dashboard if already logged in */}
          <Route element={<RedirectIfAuth />}>
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Protected app routes */}
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard"            element={<DashboardPage />} />
              <Route path="/problems"             element={<ProblemsPage />} />
              <Route path="/problems/:id"         element={<ProblemDetailPage />} />
              <Route path="/submissions/:id"      element={<SubmissionResultPage />} />
              <Route path="/discussions"          element={<DiscussionsPage />} />
              <Route path="/profile"              element={<ProfilePage />} />
              <Route path="/analytics"            element={<AnalyticsPage />} />

              {/* Admin only */}
              <Route element={<RequireAdmin />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
