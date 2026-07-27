import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { FiAward, FiCheckCircle, FiMail, FiMapPin, FiPhone, FiShield } from 'react-icons/fi';
import { PageHeader } from '../../components/common/PageHeader';

export const ProfilePage = () => {
  return (
    <Box>
      <PageHeader title="Profile" subtitle="A polished operational overview for your leadership team" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(34,197,94,0.82))', color: 'white', border: 'none' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 72, height: 72, bgcolor: 'rgba(255,255,255,0.2)', fontSize: 28 }}>AC</Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>Alicia Chen</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.92 }}>Operations Manager • Keystone Field Service</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip label="SLA Excellence" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }} />
                      <Chip label="Dispatch Lead" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }} />
                    </Stack>
                  </Box>
                </Stack>
                <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>Edit profile</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>Quick facts</Typography>
              <Stack spacing={1.8} sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Coverage</Typography>
                  <Typography fontWeight={700}>3 regions</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Response rate</Typography>
                  <Typography fontWeight={700}>98.2%</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Avg. completion</Typography>
                  <Typography fontWeight={700}>2.4 hrs</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>Contact & location</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center" gap={1.5}><FiMail color="#2563EB" /><Typography>alicia@keystone.com</Typography></Box>
                <Box display="flex" alignItems="center" gap={1.5}><FiPhone color="#22C55E" /><Typography>+1 (415) 555-0149</Typography></Box>
                <Box display="flex" alignItems="center" gap={1.5}><FiMapPin color="#F59E0B" /><Typography>San Francisco, CA</Typography></Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>Highlights</Typography>
              <Stack spacing={1.6} sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center" gap={1.2}><FiCheckCircle color="#22C55E" /><Typography>Led 24 critical dispatch escalations this quarter</Typography></Box>
                <Box display="flex" alignItems="center" gap={1.2}><FiAward color="#2563EB" /><Typography>Recipient of the operational excellence award</Typography></Box>
                <Box display="flex" alignItems="center" gap={1.2}><FiShield color="#F59E0B" /><Typography>Maintains 100% compliance readiness</Typography></Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
