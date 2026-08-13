import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { CustomersPage } from './pages/customers/CustomersPage';
import { SitesPage } from './pages/sites/SitesPage';
import { TechniciansPage } from './pages/technicians/TechniciansPage';
import { WorkOrdersPage } from './pages/work-orders/WorkOrdersPage';
import { AssetsPage } from './pages/assets/AssetsPage';
import { DispatcherPage } from './pages/dispatcher/DispatcherPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { UnauthorizedPage } from './pages/auth/UnauthorizedPage';
import { NotFoundPage } from './pages/auth/NotFoundPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { UserRole } from './types';

const FullScreenLoader=()=> <Box sx={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><CircularProgress/></Box>;
const ProtectedRoute=({children}:{children:ReactNode})=>{const{user,isLoading}=useAuth();if(isLoading)return <FullScreenLoader/>;return user?<>{children}</>:<Navigate to="/login" replace/>};
const RoleRoute=({roles,children}:{roles:UserRole[];children:ReactNode})=>{const{role}=useAuth();return role&&roles.includes(role)?<>{children}</>:<Navigate to="/unauthorized" replace/>};
const Landing=()=>{const{role}=useAuth();return <Navigate to={role==='CUSTOMER'?'/profile':'/dashboard'} replace/>};
const AppRoutes=()=> <Routes><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/unauthorized" element={<UnauthorizedPage/>}/><Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}><Route path="/" element={<Landing/>}/><Route path="/dashboard" element={<RoleRoute roles={['ADMIN','DISPATCHER','TECHNICIAN']}><DashboardPage/></RoleRoute>}/><Route path="/customers" element={<RoleRoute roles={['ADMIN','DISPATCHER']}><CustomersPage/></RoleRoute>}/><Route path="/sites" element={<RoleRoute roles={['ADMIN','DISPATCHER']}><SitesPage/></RoleRoute>}/><Route path="/technicians" element={<RoleRoute roles={['ADMIN','DISPATCHER']}><TechniciansPage/></RoleRoute>}/><Route path="/work-orders" element={<RoleRoute roles={['ADMIN','DISPATCHER','TECHNICIAN']}><WorkOrdersPage/></RoleRoute>}/><Route path="/assets" element={<RoleRoute roles={['ADMIN','DISPATCHER','TECHNICIAN']}><AssetsPage/></RoleRoute>}/><Route path="/dispatcher" element={<RoleRoute roles={['ADMIN','DISPATCHER']}><DispatcherPage/></RoleRoute>}/><Route path="/analytics" element={<RoleRoute roles={['ADMIN']}><AnalyticsPage/></RoleRoute>}/><Route path="/profile" element={<ProfilePage/>}/></Route><Route path="*" element={<NotFoundPage/>}/></Routes>;
export default function App(){return <AuthProvider><AppRoutes/></AuthProvider>}
