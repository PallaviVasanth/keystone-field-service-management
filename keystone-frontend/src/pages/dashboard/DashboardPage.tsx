import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  FiArrowRight,
  FiClipboard,
  FiMapPin,
  FiPackage,
  FiTool,
  FiUsers,
} from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';

import { dashboardService } from '../../services/dashboardService';
import { workOrderService } from '../../services/workOrderService';

import type {
  DashboardSummary,
  UserRole,
  WorkOrder,
} from '../../types';

import { useAuth } from '../../context/AuthContext';

const roleConfig: Record<
  UserRole,
  {
    title: string;
    subtitle: string;
    actionLabel: string;
    actionPath: string;
  }
> = {
  ADMIN: {
    title: 'Operations Overview',
    subtitle:
      'Monitor customers, sites, technicians, assets, and work orders across KEYSTONE.',
    actionLabel: 'Manage work orders',
    actionPath: '/work-orders',
  },

  DISPATCHER: {
    title: 'Dispatch Control Center',
    subtitle:
      'Monitor the field-service workload and keep work orders moving.',
    actionLabel: 'Open dispatch board',
    actionPath: '/dispatcher',
  },

  TECHNICIAN: {
    title: 'My Technician Workspace',
    subtitle:
      'Focus on the work orders assigned specifically to you.',
    actionLabel: 'View my work orders',
    actionPath: '/work-orders',
  },

  CUSTOMER: {
    title: 'Customer Service',
    subtitle:
      'Stay connected with your KEYSTONE service activity.',
    actionLabel: 'View profile',
    actionPath: '/profile',
  },
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentRole: UserRole = role ?? 'TECHNICIAN';
  const config = roleConfig[currentRole];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const [summaryResponse, workOrderResponse] =
          await Promise.all([
            dashboardService.summary(),
            workOrderService.list(),
          ]);

        setSummary(summaryResponse.data);
        setWorkOrders(workOrderResponse.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard data.',
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  /*
   * Technician:
   * Only show work orders assigned to the logged-in technician.
   *
   * WorkOrder.technicianId is the technician entity ID.
   * AuthContext.user.id is the logged-in user's ID.
   *
   * This assumes the application's authentication user ID and
   * technician ID refer to the same identifier for technician users.
   * If your backend uses separate User and Technician records,
   * we should later add an explicit mapping instead of relying on this.
   */
  const visibleWorkOrders = useMemo(() => {
    if (currentRole !== 'TECHNICIAN' || !user?.id) {
      return workOrders;
    }

    return workOrders.filter(
      (workOrder) => workOrder.technicianId === user.id,
    );
  }, [currentRole, user?.id, workOrders]);

  const technicianTotal = visibleWorkOrders.length;

  const technicianCompleted = visibleWorkOrders.filter(
    (workOrder) => workOrder.status === 'COMPLETED',
  ).length;

  const technicianOpen =
    technicianTotal - technicianCompleted;

  const recentWorkOrders = visibleWorkOrders.slice(0, 5);

  const renderStatus = (status: WorkOrder['status']) => (
    <StatusBadge
      label={status}
      color={
        status === 'COMPLETED'
          ? 'success'
          : status === 'NEW'
            ? 'warning'
            : 'primary'
      }
    />
  );

  return (
    <Box>
      {/* ============================================================= */}
      {/* Personalized Welcome Banner */}
      {/* ============================================================= */}
      <Card
        sx={{
          mb: 3,
          background:
            'linear-gradient(135deg, #2563EB 0%, #3B82F6 45%, #60A5FA 100%)',
          color: 'white',
          border: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Welcome back, {user?.firstName ?? 'User'} 👋
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  opacity: 0.92,
                  textTransform: 'capitalize',
                }}
              >
                {currentRole.toLowerCase()} · KEYSTONE Field Service
                Management
              </Typography>

              <Typography sx={{ mt: 1, opacity: 0.92 }}>
                {config.subtitle}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => navigate(config.actionPath)}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              endIcon={<FiArrowRight />}
            >
              {config.actionLabel}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <PageHeader
        title={config.title}
        subtitle={config.subtitle}
        badge="Live"
      />

      {/* ============================================================= */}
      {/* ADMIN DASHBOARD */}
      {/* ============================================================= */}
      {currentRole === 'ADMIN' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Customers"
              value={summary?.totalCustomers ?? 0}
              icon={<FiUsers size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Sites"
              value={summary?.totalSites ?? 0}
              icon={<FiMapPin size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Technicians"
              value={summary?.totalTechnicians ?? 0}
              icon={<FiTool size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Assets"
              value={summary?.totalAssets ?? 0}
              icon={<FiPackage size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Work Orders"
              value={summary?.totalWorkOrders ?? 0}
              icon={<FiClipboard size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Open Work Orders"
              value={summary?.openWorkOrders ?? 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Completed Work Orders"
              value={summary?.completedWorkOrders ?? 0}
            />
          </Grid>
        </Grid>
      )}

      {/* ============================================================= */}
      {/* DISPATCHER DASHBOARD */}
      {/* ============================================================= */}
      {currentRole === 'DISPATCHER' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Open Work Orders"
              value={summary?.openWorkOrders ?? 0}
              icon={<FiClipboard size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Technicians"
              value={summary?.totalTechnicians ?? 0}
              icon={<FiTool size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Completed Work Orders"
              value={summary?.completedWorkOrders ?? 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Customers"
              value={summary?.totalCustomers ?? 0}
              icon={<FiUsers size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Sites"
              value={summary?.totalSites ?? 0}
              icon={<FiMapPin size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Work Orders"
              value={summary?.totalWorkOrders ?? 0}
              icon={<FiClipboard size={20} />}
            />
          </Grid>
        </Grid>
      )}

      {/* ============================================================= */}
      {/* TECHNICIAN DASHBOARD */}
      {/* ============================================================= */}
      {currentRole === 'TECHNICIAN' && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="My Total Jobs"
                value={technicianTotal}
                icon={<FiClipboard size={20} />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="My Open Jobs"
                value={technicianOpen}
                icon={<FiTool size={20} />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="My Completed Jobs"
                value={technicianCompleted}
              />
            </Grid>
          </Grid>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                My assigned work
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Work orders currently assigned to {user?.firstName ?? 'you'}.
              </Typography>

              <DataTable
                rows={recentWorkOrders}
                loading={loading}
                emptyMessage="No work orders are currently assigned to you."
                columns={[
                  {
                    key: 'workOrderNumber',
                    label: 'Number',
                  },
                  {
                    key: 'title',
                    label: 'Title',
                  },
                  {
                    key: 'priority',
                    label: 'Priority',
                  },
                  {
                    key: 'scheduledDate',
                    label: 'Scheduled',
                    render: (row) =>
                      row.scheduledDate
                        ? new Date(
                            row.scheduledDate,
                          ).toLocaleDateString()
                        : 'Not scheduled',
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (row) =>
                      renderStatus(row.status),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </>
      )}

      {/* ============================================================= */}
      {/* CUSTOMER DASHBOARD */}
      {/* ============================================================= */}
      {currentRole === 'CUSTOMER' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Open Work Orders"
              value={summary?.openWorkOrders ?? 0}
              icon={<FiClipboard size={20} />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Completed Work Orders"
              value={summary?.completedWorkOrders ?? 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Available Sites"
              value={summary?.totalSites ?? 0}
              icon={<FiMapPin size={20} />}
            />
          </Grid>
        </Grid>
      )}

      {/* ============================================================= */}
      {/* ADMIN / DISPATCHER RECENT WORK ORDERS */}
      {/* ============================================================= */}
      {currentRole !== 'TECHNICIAN' && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {currentRole === 'ADMIN'
                    ? 'Recent work orders'
                    : currentRole === 'DISPATCHER'
                      ? 'Dispatch workload'
                      : 'Recent service activity'}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Live work-order data from the KEYSTONE backend
                </Typography>
              </Box>

              <Button
                size="small"
                endIcon={<FiArrowRight />}
                onClick={() => navigate('/work-orders')}
              >
                View all
              </Button>
            </Stack>

            <DataTable
              rows={recentWorkOrders}
              loading={loading}
              emptyMessage="No work orders found"
              columns={[
                {
                  key: 'workOrderNumber',
                  label: 'Number',
                },
                {
                  key: 'title',
                  label: 'Title',
                },
                {
                  key: 'priority',
                  label: 'Priority',
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (row) =>
                    renderStatus(row.status),
                },
              ]}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};