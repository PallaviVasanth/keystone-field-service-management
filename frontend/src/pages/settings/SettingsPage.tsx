import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { PageHeader } from '../../components/common/PageHeader';

export const SettingsPage = () => {
  return (
    <Box>
      <PageHeader title="Settings" subtitle="Configure system preferences and service defaults" />
      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight={700}>Preferences</Typography>
            <Typography color="text.secondary">Notification rules, SLA thresholds, and workflow defaults can be configured here.</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
