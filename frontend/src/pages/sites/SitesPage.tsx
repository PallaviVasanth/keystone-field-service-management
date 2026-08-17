import { Box, Card, CardContent } from '@mui/material';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { sites } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const SitesPage = () => {
  return (
    <Box>
      <PageHeader title="Sites" subtitle="Track customer locations and operating health" />
      <Card>
        <CardContent>
          <DataTable rows={sites} columns={[
            { key: 'name', label: 'Site' },
            { key: 'address', label: 'Address' },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge label={row.status} color={row.status === 'Operational' ? 'success' : row.status === 'Maintenance' ? 'warning' : 'default'} /> },
          ]} />
        </CardContent>
      </Card>
    </Box>
  );
};
