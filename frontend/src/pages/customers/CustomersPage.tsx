import { Box, Button, Card, CardContent } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { customers } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const CustomersPage = () => {
  return (
    <Box>
      <PageHeader title="Customers" subtitle="Manage customer relationships and service portfolios" action={<Button variant="contained" startIcon={<FiPlus />}>Add customer</Button>} />
      <Card>
        <CardContent>
          <DataTable rows={customers} columns={[
            { key: 'name', label: 'Customer' },
            { key: 'company', label: 'Company' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge label={row.status} color={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'default'} /> },
          ]} />
        </CardContent>
      </Card>
    </Box>
  );
};
