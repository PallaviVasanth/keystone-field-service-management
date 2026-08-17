import type { FormEvent } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login('alicia@keystone.com', 'password');
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Card sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" fontWeight={800}>Sign in to Keystone</Typography>
              <Typography variant="body2" color="text.secondary">Enterprise field service operations, simplified.</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Email" type="email" fullWidth required />
                <TextField label="Password" type="password" fullWidth required />
                <Button type="submit" variant="contained" size="large">Continue</Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
