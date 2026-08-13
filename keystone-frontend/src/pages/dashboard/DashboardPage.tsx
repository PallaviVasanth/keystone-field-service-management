import { Alert, Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FiArrowRight, FiClipboard, FiMapPin, FiPackage, FiTool, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { dashboardService } from '../../services/dashboardService';
import { workOrderService } from '../../services/workOrderService';
import type { DashboardSummary, WorkOrder } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const [summaryResponse, workOrderResponse] = await Promise.all([
          dashboardService.summary(),
          workOrderService.list(),
        ]);
        setSummary(summaryResponse.data);
        setWorkOrders(workOrderResponse.data.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
      } finally { setLoading(false); }
    };
    void load();
  }, []);

  return <Box>
    <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 45%, #60A5FA 100%)', color: 'white', border: 'none' }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box><Typography variant="h5" fontWeight={800}>Welcome, {user?.firstName}</Typography><Typography sx={{ mt: 1, opacity: 0.92 }}>KEYSTONE field service operations at a glance.</Typography></Box>
          <Button variant="contained" onClick={() => navigate('/work-orders')} sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }} endIcon={<FiArrowRight />}>View work orders</Button>
        </Stack>
      </CardContent>
    </Card>
    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
    <PageHeader title="Operations Overview" subtitle="Live values returned by the KEYSTONE backend" badge="Live" />
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}><StatCard title="Customers" value={summary?.totalCustomers ?? 0} icon={<FiUsers size={20} />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><StatCard title="Sites" value={summary?.totalSites ?? 0} icon={<FiMapPin size={20} />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><StatCard title="Technicians" value={summary?.totalTechnicians ?? 0} icon={<FiTool size={20} />} /></Grid>
      <Grid item xs={12} sm={6} md={3}><StatCard title="Assets" value={summary?.totalAssets ?? 0} icon={<FiPackage size={20} />} /></Grid>
      <Grid item xs={12} sm={6} md={4}><StatCard title="Total Work Orders" value={summary?.totalWorkOrders ?? 0} icon={<FiClipboard size={20} />} /></Grid>
      <Grid item xs={12} sm={6} md={4}><StatCard title="Open Work Orders" value={summary?.openWorkOrders ?? 0} /></Grid>
      <Grid item xs={12} sm={6} md={4}><StatCard title="Completed Work Orders" value={summary?.completedWorkOrders ?? 0} /></Grid>
    </Grid>
    <Card sx={{ mt: 3 }}><CardContent>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Recent work orders</Typography>
      <DataTable rows={workOrders} loading={loading} emptyMessage="No work orders found" columns={[
        { key: 'workOrderNumber', label: 'Number' }, { key: 'title', label: 'Title' }, { key: 'priority', label: 'Priority' },
        { key: 'status', label: 'Status', render: row => <StatusBadge label={row.status} color={row.status === 'COMPLETED' ? 'success' : row.status === 'NEW' ? 'warning' : 'primary'} /> },
      ]} />
    </CardContent></Card>
  </Box>;
};
