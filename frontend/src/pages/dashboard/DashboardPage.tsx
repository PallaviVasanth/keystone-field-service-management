import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FiArrowRight, FiClipboard, FiUsers, FiTruck, FiTrendingUp } from 'react-icons/fi';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { dashboardStats, notifications, workOrders } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DashboardPage = () => {
  return (
    <Box>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 45%, #60A5FA 100%)', color: 'white', border: 'none' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={800}>Command center</Typography>
              <Typography sx={{ mt: 1, opacity: 0.92 }}>Monitor field operations, dispatch flow, and service health from one vibrant workspace.</Typography>
            </Box>
            <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }} endIcon={<FiArrowRight />}>Create work order</Button>
          </Stack>
        </CardContent>
      </Card>
      <PageHeader title="Operations Overview" subtitle="A live pulse of service delivery and field productivity" badge="Live" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="Work Orders" value={dashboardStats.totalWorkOrders} subtitle="Across all active regions" icon={<FiClipboard size={20} />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Completed Today" value={dashboardStats.completedToday} subtitle="Ahead of SLA target" icon={<FiTruck size={20} />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Active Technicians" value={dashboardStats.activeTechnicians} subtitle="Coverage in 3 zones" icon={<FiUsers size={20} />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Revenue" value={`$${dashboardStats.revenue.toLocaleString()}`} subtitle="Projected monthly run-rate" icon={<FiTrendingUp size={20} />} />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent work orders</Typography>
              <DataTable rows={workOrders.slice(0, 4)} columns={[
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Title' },
                { key: 'priority', label: 'Priority' },
                { key: 'status', label: 'Status', render: (row) => <StatusBadge label={row.status} color={row.status === 'COMPLETED' ? 'success' : row.status === 'NEW' ? 'warning' : 'primary'} /> },
              ]} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Notifications</Typography>
              <Stack spacing={2}>
                {notifications.map((item) => (
                  <Box key={item.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                    <Typography fontWeight={700}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
