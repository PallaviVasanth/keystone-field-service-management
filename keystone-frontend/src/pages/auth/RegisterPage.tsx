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
  MenuItem,
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

import type { RegisterRequest, UserRole } from '../../types';

// Customers are provisioned differently in the real workflow (they raise
// requests against a site they already belong to, per the project brief's
// customer portal — not by self-registering with a role picker), so
// CUSTOMER is intentionally left out of this selector. This form is for
// staff accounts: dispatcher, technician, or admin.
const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'DISPATCHER', label: 'Dispatcher' },
  { value: 'TECHNICIAN', label: 'Technician' },
  { value: 'ADMIN', label: 'Admin / Manager' },
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const [form, setForm] = useState<RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'TECHNICIAN',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Controls password visibility.
  const [showPassword, setShowPassword] = useState(false);

  const updateField = <K extends keyof RegisterRequest>(
    field: K,
    value: RegisterRequest[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      // Registration does not log the user in (the backend issues no
      // token on register), so send them to /login afterwards instead of
      // navigating straight into the app.
      await register(form);
      setSuccess(true);
    } catch {
      // error state is already set by AuthContext; nothing further to do
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
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
            <Stack spacing={2} alignItems="flex-start">
              <Typography variant="h4" fontWeight={800}>
                Account created
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Your account has been created. Sign in with your new
                credentials to continue.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
              >
                Go to sign in
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

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
      <Card sx={{ width: '100%', maxWidth: 520 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" fontWeight={800}>
                Create your account
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Set up access to Keystone.
              </Typography>
            </Box>

            {error ? (
              <Alert severity="error" onClose={clearError}>
                {error}
              </Alert>
            ) : null}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <TextField
                    label="First name"
                    value={form.firstName}
                    onChange={(event) =>
                      updateField('firstName', event.target.value)
                    }
                    fullWidth
                    required
                    slotProps={{
                      htmlInput: {
                        maxLength: 100,
                      },
                    }}
                  />

                  <TextField
                    label="Last name"
                    value={form.lastName}
                    onChange={(event) =>
                      updateField('lastName', event.target.value)
                    }
                    fullWidth
                    required
                    slotProps={{
                      htmlInput: {
                        maxLength: 100,
                      },
                    }}
                  />
                </Stack>

                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                  fullWidth
                  required
                  slotProps={{
                    htmlInput: {
                      maxLength: 255,
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) =>
                    updateField('password', event.target.value)
                  }
                  fullWidth
                  required
                  helperText="At least 8 characters"
                  slotProps={{
                    htmlInput: {
                      minLength: 8,
                      maxLength: 100,
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

                <TextField
                  label="Phone number"
                  value={form.phoneNumber}
                  onChange={(event) =>
                    updateField('phoneNumber', event.target.value)
                  }
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      maxLength: 20,
                    },
                  }}
                />

                <TextField
                  select
                  label="Role"
                  value={form.role}
                  onChange={(event) =>
                    updateField(
                      'role',
                      event.target.value as UserRole,
                    )
                  }
                  fullWidth
                  required
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Creating account…'
                    : 'Create account'}
                </Button>
              </Stack>
            </form>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};