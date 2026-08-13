import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => responsiveFontSizes(
  createTheme({
    palette: {
      mode,
      primary: { main: '#2563EB' },
      secondary: { main: '#1D4ED8' },
      success: { main: '#22C55E' },
      warning: { main: '#F59E0B' },
      error: { main: '#EF4444' },
      background: {
        default: mode === 'light' ? '#F4F8FF' : '#07111F',
        paper: mode === 'light' ? '#FFFFFF' : '#0E1A2C',
      },
      text: {
        primary: mode === 'light' ? '#0F172A' : '#F8FAFC',
        secondary: mode === 'light' ? '#475569' : '#94A3B8',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      body1: { fontSize: '0.95rem', lineHeight: 1.6 },
      body2: { fontSize: '0.9rem', lineHeight: 1.55 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' ? '0 16px 40px rgba(37,99,235,0.12)' : '0 16px 40px rgba(2,6,23,0.45)',
            border: mode === 'light' ? '1px solid rgba(191,219,254,0.9)' : '1px solid rgba(30,41,59,0.95)',
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' ? '0 22px 48px rgba(37,99,235,0.16)' : '0 22px 48px rgba(2,6,23,0.6)',
            },
          },
        },
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 999, px: 18, py: 10, boxShadow: 'none' } } },
      MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
      MuiAppBar: { styleOverrides: { root: { boxShadow: 'none', borderBottom: mode === 'light' ? '1px solid rgba(191,219,254,0.8)' : '1px solid rgba(30,41,59,0.95)' } } },
    },
  }),
);

export default createAppTheme('light');
