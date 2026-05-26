import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props  { children: ReactNode; fallback?: ReactNode }
interface State  { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace with real error reporting (Sentry, etc.)
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box sx={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#09090F', textAlign: 'center', p: 4,
        }}>
          <Typography sx={{ fontSize: 56, mb: 2 }}>💥</Typography>
          <Typography variant="h5" fontWeight={700} color="white" mb={1}>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="grey.500" mb={4} maxWidth={400}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </Typography>
          <Button
            variant="contained" onClick={this.handleReset}
            sx={{ background: 'linear-gradient(135deg, #6C63FF, #4ECDC4)', fontWeight: 600 }}
          >
            Return to Dashboard
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
