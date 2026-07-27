import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { PageHeader } from '../../components/common/PageHeader';
import { workOrders } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DispatcherPage = () => {
  return (
    <Box>
      <PageHeader title="Dispatcher Console" subtitle="Manage dispatch flow, assignment, and urgency" />
      <Grid container spacing={3}>
        {['NEW', 'ASSIGNED', 'IN PROGRESS'].map((status) => (
          <Grid item xs={12} md={4} key={status}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{status}</Typography>
                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  {workOrders.filter((order) => order.status === status).map((order) => (
                    <Box key={order.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                      <Typography fontWeight={700}>{order.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{order.description}</Typography>
                      <StatusBadge label={order.priority} color="warning" />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
