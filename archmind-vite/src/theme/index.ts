import { createTheme, alpha, type Theme } from '@mui/material/styles';
import { themeConfig } from '@/config/theme';

const { primaryColor, borderRadius } = themeConfig;

type PaletteMode = 'dark' | 'light';

const components = (mode: PaletteMode) => ({
  MuiCssBaseline: {
    styleOverrides: {
      '*': { boxSizing: 'border-box' },
      html: { scrollBehavior: 'smooth' },
      '::-webkit-scrollbar': { width: 5, height: 5 },
      '::-webkit-scrollbar-track': { background: mode === 'dark' ? '#0f0f14' : '#f4f4f8' },
      '::-webkit-scrollbar-thumb': {
        background: mode === 'dark' ? '#2a2a3a' : '#d0d0e0',
        borderRadius: 4,
        '&:hover': { background: mode === 'dark' ? '#3a3a4e' : '#b8b8cc' },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        borderRadius: 8,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': { boxShadow: `0 4px 20px ${alpha(primaryColor, 0.4)}` },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius, backgroundImage: 'none', boxShadow: 'none' },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } },
  },
  MuiTextField: {
    styleOverrides: {
      root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
    },
  },
  MuiDialog: {
    styleOverrides: { paper: { borderRadius: 14 } },
  },
  MuiTooltip: {
    styleOverrides: { tooltip: { borderRadius: 6, fontSize: '0.73rem' } },
  },
  MuiLinearProgress: {
    styleOverrides: { root: { borderRadius: 4 } },
  },
});

const typography = {
  fontFamily: themeConfig.fontFamily.body,
  h1: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 800, letterSpacing: '-0.04em' },
  h2: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 700, letterSpacing: '-0.03em' },
  h3: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 700, letterSpacing: '-0.025em' },
  h4: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 700, letterSpacing: '-0.02em' },
  h5: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 600, letterSpacing: '-0.015em' },
  h6: { fontFamily: themeConfig.fontFamily.heading, fontWeight: 600, letterSpacing: '-0.01em' },
  body1: { lineHeight: 1.7 },
  body2: { fontSize: '0.875rem', lineHeight: 1.65 },
  caption: { fontSize: '0.75rem', letterSpacing: '0.01em' },
};

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#6C63FF', light: '#8B85FF', dark: '#4A42CC' },
    secondary:  { main: '#00D4AA' },
    error:      { main: '#FF6B6B' },
    warning:    { main: '#FFB347' },
    success:    { main: '#51CF66' },
    background: { default: '#09090F', paper: '#0f0f18' },
    text:       { primary: '#F0F0F6', secondary: '#7878a0', disabled: '#3a3a55' },
    divider:    'rgba(255,255,255,0.07)',
    action:     { hover: 'rgba(108,99,255,0.07)', selected: 'rgba(108,99,255,0.13)' },
  },
  typography,
  shape: { borderRadius },
  components: components('dark') as object,
});

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#6C63FF', light: '#8B85FF', dark: '#4A42CC' },
    secondary:  { main: '#00C49A' },
    error:      { main: '#E53E3E' },
    warning:    { main: '#D69E2E' },
    success:    { main: '#38A169' },
    background: { default: '#F5F5FA', paper: '#FFFFFF' },
    text:       { primary: '#0D0D1A', secondary: '#5A5A78', disabled: '#B0B0CC' },
    divider:    'rgba(0,0,0,0.07)',
    action:     { hover: 'rgba(108,99,255,0.05)', selected: 'rgba(108,99,255,0.11)' },
  },
  typography,
  shape: { borderRadius },
  components: components('light') as object,
});
