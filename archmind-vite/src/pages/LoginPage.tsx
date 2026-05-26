import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button,
  Card, CardContent, Stack, Divider, Link, Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { GitHub, Google } from '@mui/icons-material';
import { Logo } from '@/component/common/Logo';
import { fadeIn } from '@/animations/variants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { selectAuth } from '@/store';
import type { LoginRequest } from '@/types';

export default function LoginPage() {
  const navigate        = useNavigate();
  const dispatch        = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginUser(form));
    if (!result.type.endsWith('rejected')) navigate('/dashboard');
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', backgroundColor: 'background.default', p: 2,
      background: (t) =>
        t.palette.mode === 'dark'
          ? 'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(108,99,255,0.12) 0%, transparent 50%)'
          : 'background.default',
    }}>
      <Container maxWidth="xs">
        <motion.div {...fadeIn}>
          <Box textAlign="center" mb={4}>
            <Logo size="medium" onClick={() => navigate('/')} />
          </Box>

          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em" mb={0.5}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Sign in to continue your interview prep
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
              )}

              <Stack spacing={1.5} mb={3}>
                <Button fullWidth variant="outlined" startIcon={<Google />}
                  sx={{ py: 1.25, fontWeight: 600 }}>
                  Continue with Google
                </Button>
                <Button fullWidth variant="outlined" startIcon={<GitHub />}
                  sx={{ py: 1.25, fontWeight: 600 }}>
                  Continue with GitHub
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" color="text.secondary" px={1}>or with email</Typography>
              </Divider>

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField label="Email" name="email" type="email" required fullWidth
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com" autoComplete="email" />
                  <TextField label="Password" name="password" type="password" required fullWidth
                    value={form.password} onChange={handleChange}
                    placeholder="••••••••" autoComplete="current-password" />
                  <Box textAlign="right">
                    <Link component={RouterLink} to="/forgot-password"
                      variant="body2" color="primary.main">
                      Forgot password?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth variant="contained" size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5, background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                      fontWeight: 700, fontSize: '1rem',
                    }}>
                    {loading ? 'Signing in…' : 'Sign In'}
                  </Button>
                </Stack>
              </form>

              <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
                No account?{' '}
                <Link component={RouterLink} to="/signup" color="primary.main" fontWeight={600}>
                  Sign up free
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
