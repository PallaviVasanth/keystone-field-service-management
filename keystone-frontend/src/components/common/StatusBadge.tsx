import { Chip } from '@mui/material';

interface StatusBadgeProps {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const StatusBadge = ({ label, color = 'default' }: StatusBadgeProps) => {
  return <Chip label={label} color={color} size="small" sx={{ borderRadius: 999 }} />;
};
