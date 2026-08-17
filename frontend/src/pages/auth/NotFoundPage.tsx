import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Card sx={{ maxWidth: 480, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>Page not found</Typography>
            <Typography color="text.secondary">The page you are looking for no longer exists or has moved.</Typography>
            <Button component={Link} to="/dashboard" variant="contained">Back home</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
