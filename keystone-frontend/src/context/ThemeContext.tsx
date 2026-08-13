import { CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { createAppTheme } from '../theme';

export type AppThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: AppThemeMode;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppThemeMode>('light');

  const toggleTheme = () => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};
