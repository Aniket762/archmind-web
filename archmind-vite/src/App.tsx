import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppRouter } from '@/routes';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouter />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a28',
              color: '#F0F0F6',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              fontSize: '0.875rem',
              fontFamily: "'Inter', sans-serif",
            },
            success: {
              iconTheme: { primary: '#51CF66', secondary: '#1a1a28' },
            },
            error: {
              iconTheme: { primary: '#FF6B6B', secondary: '#1a1a28' },
            },
            duration: 3500,
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}
