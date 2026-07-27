import type { ReactNode } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string;
}

export const PageHeader = ({ title, subtitle, action, badge }: PageHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
      <Stack spacing={0.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h4" fontWeight={700}>{title}</Typography>
          {badge ? <Chip label={badge} color="primary" size="small" /> : null}
        </Stack>
        {subtitle ? <Typography variant="body2" color="text.secondary">{subtitle}</Typography> : null}
      </Stack>
      {action ? <Box>{action}</Box> : null}
    </Box>
  );
};
