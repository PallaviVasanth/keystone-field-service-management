import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 88;
const expandedWidth = 240;

export const Sidebar = ({ open, onClose }: { open?: boolean; onClose?: () => void }) => {
  const location = useLocation();
  const { role } = useAuth();
  const isExpanded = Boolean(open);

  return (
    <Drawer
      variant="persistent"
      open={isExpanded}
      onClose={onClose}
      sx={{
        width: isExpanded ? expandedWidth : drawerWidth,
        flexShrink: 0,
        transition: 'width 180ms ease',
        '& .MuiDrawer-paper': {
          width: isExpanded ? expandedWidth : drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#071325',
          backgroundImage: 'linear-gradient(180deg, #071325 0%, #0d2145 100%)',
          color: '#f8fafc',
          transition: 'width 180ms ease',
          overflowX: 'hidden',
          boxShadow: 'none',
        },
      }}
    >
      <Toolbar sx={{ minHeight: 72, px: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'linear-gradient(135deg, rgba(56,189,248,0.24), rgba(99,102,241,0.28))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#f8fafc', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' }}>K</Box>
          {isExpanded ? (
            <Box>
              <Typography variant="h6" fontWeight={800} color="white">KESTONE</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)' }}>Field Service</Typography>
            </Box>
          ) : null}
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <List sx={{ px: 1.2, py: 1.2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const visible = role !== null && item.roles.includes(role);
          if (!visible) return null;
          const selected = location.pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={selected}
              sx={{ borderRadius: 2, mb: 0.75, minHeight: 48, color: '#f8fafc', px: 1.1, backgroundColor: 'transparent', '&.Mui-selected': { bgcolor: 'rgba(56,189,248,0.16)', color: '#f8fafc', boxShadow: 'inset 0 0 0 1px rgba(56,189,248,0.18)' }, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
            >
              <ListItemIcon sx={{ minWidth: 42, color: 'white' }}><Icon /></ListItemIcon>
              {isExpanded ? <ListItemText primary={item.label} /> : null}
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: 'auto', p: 1.5 }}>
        <Stack spacing={1} sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, p: 1.5, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)' }}>Role</Typography>
          <Typography variant="body2" fontWeight={700} textTransform="capitalize">{role ? (isExpanded ? role : role[0].toUpperCase()) : ''}</Typography>
        </Stack>
      </Box>
    </Drawer>
  );
};
