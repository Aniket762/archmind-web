import React, {
  createContext, useContext, useState, useMemo, type ReactNode,
} from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '@/theme';
import { STORAGE } from '@/constants';

type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggleTheme: () => {},
});

export const useThemeMode = (): ThemeContextValue => useContext(ThemeContext);

interface Props { children: ReactNode }

export function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<ThemeMode>(
    () => (localStorage.getItem(STORAGE.THEME) as ThemeMode | null) ?? 'dark',
  );

  const toggleTheme = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE.THEME, next);
      return next;
    });
  };

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const value = useMemo<ThemeContextValue>(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
