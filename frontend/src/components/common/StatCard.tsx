import type { ReactNode } from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}

export const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => {
  return (
    <Card sx={{ height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(239,246,255,0.95))' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" fontWeight={700}>{value}</Typography>
            {subtitle ? <Typography variant="caption" color="text.secondary">{subtitle}</Typography> : null}
          </Stack>
          {icon ? <Box sx={{ color: 'primary.main' }}>{icon}</Box> : null}
        </Stack>
      </CardContent>
    </Card>
  );
};
