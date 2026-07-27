import { Box, IconButton, Toolbar } from '@mui/material';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(240,247,255,0.95) 0%, rgba(227,242,255,0.95) 45%, rgba(214,238,255,0.95) 100%)', minHeight: '100vh' }}>
        <Topbar>
          <IconButton onClick={() => setMobileOpen((prev) => !prev)} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
            <FiMenu />
          </IconButton>
        </Topbar>
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3 }, position: 'relative' }}>
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(37,99,235,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(34,197,94,0.12), transparent 32%)', pointerEvents: 'none' }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
