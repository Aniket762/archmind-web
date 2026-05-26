import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button,
  Card, CardContent, Stack, Divider, Link, Alert,
  Checkbox, FormControlLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { GitHub, Google } from '@mui/icons-material';
import { Logo } from '@/component/common/Logo';
import { fadeIn } from '@/animations/variants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { registerUser, clearError } from '@/store/slices/authSlice';
import { selectAuth } from '@/store';
import type { RegisterRequest } from '@/types';

interface SignupForm extends RegisterRequest {
  agree: boolean;
}

export default function SignupPage() {
  const navigate           = useNavigate();
  const dispatch           = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);

  const [form, setForm] = useState<SignupForm>({
    name: '', email: '', password: '', agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) return;
    dispatch(clearError());
    const { agree, ...payload } = form;
    const result = await dispatch(registerUser(payload));
    if (!result.type.endsWith('rejected')) navigate('/dashboard');
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', backgroundColor: 'background.default', p: 2,
    }}>
      <Container maxWidth="xs">
        <motion.div {...fadeIn}>
          <Box textAlign="center" mb={4}>
            <Logo size="medium" onClick={() => navigate('/')} />
          </Box>

          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em" mb={0.5}>
                Create your account
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Join 50,000+ engineers mastering system design
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
              )}

              <Stack spacing={1.5} mb={3}>
                <Button fullWidth variant="outlined" startIcon={<Google />}
                  sx={{ py: 1.25, fontWeight: 600 }}>
                  Sign up with Google
                </Button>
                <Button fullWidth variant="outlined" startIcon={<GitHub />}
                  sx={{ py: 1.25, fontWeight: 600 }}>
                  Sign up with GitHub
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" color="text.secondary" px={1}>or with email</Typography>
              </Divider>

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Full Name" name="name" required fullWidth
                    value={form.name} onChange={handleChange}
                    placeholder="Alex Johnson"
                  />
                  <TextField
                    label="Email" name="email" type="email" required fullWidth
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com" autoComplete="email"
                  />
                  <TextField
                    label="Password" name="password" type="password" required fullWidth
                    value={form.password} onChange={handleChange}
                    placeholder="Min. 8 characters"
                    helperText="Use at least 8 characters with letters and numbers"
                    inputProps={{ minLength: 8 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agree" checked={form.agree}
                        onChange={handleChange} size="small"
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        I agree to the{' '}
                        <Link href="#" color="primary.main">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="#" color="primary.main">Privacy Policy</Link>
                      </Typography>
                    }
                  />
                  <Button
                    type="submit" fullWidth variant="contained" size="large"
                    disabled={loading || !form.agree}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)',
                      fontWeight: 700, fontSize: '1rem',
                    }}
                  >
                    {loading ? 'Creating account…' : 'Create Account'}
                  </Button>
                </Stack>
              </form>

              <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" color="primary.main" fontWeight={600}>
                  Sign in
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}


