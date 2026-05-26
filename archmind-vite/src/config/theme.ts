export const themeConfig = {
  defaultMode: 'dark' as 'dark' | 'light',
  primaryColor: '#6C63FF',
  secondaryColor: '#00D4AA',
  borderRadius: 10,
  fontFamily: {
    heading: "'DM Sans', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  gradients: {
    primary: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)',
    hero: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 50%, #16213E 100%)',
  },
} as const;