import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Card sx={{ maxWidth: 480, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>Access restricted</Typography>
            <Typography color="text.secondary">Your role does not currently have access to this module.</Typography>
            <Button component={Link} to="/dashboard" variant="contained">Return to dashboard</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
