import { useState, type FormEvent } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import type { UserRole } from '../../types';

const responseLandingPath = () => {
  const stored = localStorage.getItem('keystone-user');

  if (!stored) {
    return '/dashboard';
  }

  try {
    const role = (JSON.parse(stored) as { role?: UserRole }).role;

    return role === 'CUSTOMER' ? '/profile' : '/dashboard';
  } catch {
    return '/dashboard';
  }
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Controls password visibility.
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      await login(email, password);
      navigate(responseLandingPath());
    } catch {
      // Error state is already set by AuthContext; nothing further to do.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" fontWeight={800}>
                Sign in to Keystone
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Enterprise field service operations, simplified.
              </Typography>
            </Box>

            {error ? (
              <Alert severity="error" onClose={clearError}>
                {error}
              </Alert>
            ) : null}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  required
                  slotProps={{
                    htmlInput: {
                      minLength: 8,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          edge="end"
                          aria-label={
                            showPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                >
                  {submitting ? 'Signing in…' : 'Continue'}
                </Button>
              </Stack>
            </form>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register">
                Create one
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};