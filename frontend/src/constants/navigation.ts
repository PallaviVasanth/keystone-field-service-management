import { FiGrid, FiUsers, FiMapPin, FiClipboard, FiBarChart2, FiSettings, FiUser, FiShield } from 'react-icons/fi';
import type { UserRole } from '../types';

export interface NavItem {
  label: string;
  path: string;
  icon: typeof FiGrid;
  roles: UserRole[];
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid, roles: ['admin', 'dispatcher', 'manager', 'technician'] },
  { label: 'Customers', path: '/customers', icon: FiUsers, roles: ['admin', 'manager', 'dispatcher'] },
  { label: 'Sites', path: '/sites', icon: FiMapPin, roles: ['admin', 'manager', 'dispatcher'] },
  { label: 'Work Orders', path: '/work-orders', icon: FiClipboard, roles: ['admin', 'dispatcher', 'manager', 'technician'] },
  { label: 'Dispatcher', path: '/dispatcher', icon: FiShield, roles: ['admin', 'dispatcher', 'manager'] },
  { label: 'Analytics', path: '/analytics', icon: FiBarChart2, roles: ['admin', 'manager'] },
  { label: 'Profile', path: '/profile', icon: FiUser, roles: ['admin', 'dispatcher', 'manager', 'technician'] },
  { label: 'Settings', path: '/settings', icon: FiSettings, roles: ['admin', 'dispatcher', 'manager', 'technician'] },
];
