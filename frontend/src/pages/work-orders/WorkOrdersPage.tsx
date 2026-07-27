import { Box, Card, CardContent } from '@mui/material';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { workOrders } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const WorkOrdersPage = () => {
  return (
    <Box>
      <PageHeader title="Work Orders" subtitle="Coordinate service execution and accountability" />
      <Card>
        <CardContent>
          <DataTable rows={workOrders} columns={[
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'priority', label: 'Priority' },
            { key: 'scheduledAt', label: 'Scheduled' },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge label={row.status} color={row.status === 'COMPLETED' ? 'success' : row.status === 'NEW' ? 'warning' : 'primary'} /> },
          ]} />
        </CardContent>
      </Card>
    </Box>
  );
};
