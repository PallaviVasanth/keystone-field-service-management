import { AppBar, Avatar, Badge, Box, Divider, IconButton, InputBase, Menu, MenuItem, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FiBell, FiChevronDown, FiMoon, FiSearch, FiSun } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';
import { customers, sites, workOrders } from '../../services/mockData';

export const Topbar = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [query, setQuery] = useState('');
  const open = Boolean(anchorEl);

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    const matches = [
      ...customers.filter((customer) => `${customer.name} ${customer.company}`.toLowerCase().includes(term)).map((item) => ({ label: item.name, subtitle: item.company, kind: 'Customer' })),
      ...sites.filter((site) => `${site.name} ${site.address}`.toLowerCase().includes(term)).map((item) => ({ label: item.name, subtitle: item.address, kind: 'Site' })),
      ...workOrders.filter((order) => `${order.title} ${order.description}`.toLowerCase().includes(term)).map((item) => ({ label: item.title, subtitle: item.description, kind: 'Work Order' })),
    ].slice(0, 6);

    return matches;
  }, [query]);

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, py: 1.2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          {children}
          <Box
            sx={{
              position: 'relative',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1.1,
              minWidth: 340,
              borderRadius: 999,
              bgcolor: mode === 'light' ? 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(96,165,250,0.16))' : 'rgba(15,23,42,0.75)',
              border: mode === 'light' ? '1px solid rgba(37,99,235,0.16)' : '1px solid rgba(71,85,105,0.5)',
              boxShadow: mode === 'light' ? '0 10px 25px rgba(37,99,235,0.10)' : '0 10px 25px rgba(2,6,23,0.25)',
            }}
          >
            <FiSearch color={mode === 'light' ? '#2563EB' : '#93C5FD'} />
            <InputBase
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customers, sites or work orders"
              fullWidth
              sx={{ color: 'text.primary' }}
            />
            {searchResults.length > 0 ? (
              <Paper sx={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '100%', zIndex: 5, borderRadius: 3, overflow: 'hidden', boxShadow: '0 16px 32px rgba(15,23,42,0.12)', bgcolor: mode === 'light' ? 'background.paper' : 'rgba(15,23,42,0.96)' }}>
                {searchResults.map((result, index) => (
                  <Box key={`${result.label}-${index}`} sx={{ px: 2, py: 1.25, cursor: 'pointer', '&:hover': { bgcolor: mode === 'light' ? 'grey.50' : 'rgba(255,255,255,0.08)' } }}>
                    <Typography variant="body2" fontWeight={700}>{result.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{result.kind} • {result.subtitle}</Typography>
                  </Box>
                ))}
              </Paper>
            ) : null}
          </Box>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={toggleTheme} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
            {mode === 'light' ? <FiMoon /> : <FiSun />}
          </IconButton>
          <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 1 }}><Badge badgeContent={3} color="error"><FiBell /></Badge></IconButton>
          <Box>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ borderRadius: 999, bgcolor: 'background.paper', boxShadow: 1, px: 1.2 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>{user?.avatar}</Avatar>
              <Typography variant="body2" sx={{ ml: 1, mr: 0.5, color: 'text.primary' }}>{user?.name}</Typography>
              <FiChevronDown />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <Divider />
              <MenuItem>Sign out</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
