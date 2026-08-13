import { FiBarChart2, FiClipboard, FiGrid, FiMapPin, FiPackage, FiShield, FiUser, FiUsers, FiTool } from 'react-icons/fi';
import type { UserRole } from '../types';

export interface NavItem {
  label: string;
  path: string;
  icon: typeof FiGrid;
  roles: UserRole[];
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid, roles: ['ADMIN', 'DISPATCHER', 'TECHNICIAN'] },
  { label: 'Customers', path: '/customers', icon: FiUsers, roles: ['ADMIN', 'DISPATCHER'] },
  { label: 'Sites', path: '/sites', icon: FiMapPin, roles: ['ADMIN', 'DISPATCHER'] },
  { label: 'Technicians', path: '/technicians', icon: FiTool, roles: ['ADMIN', 'DISPATCHER'] },
  { label: 'Work Orders', path: '/work-orders', icon: FiClipboard, roles: ['ADMIN', 'DISPATCHER', 'TECHNICIAN'] },
  { label: 'Assets', path: '/assets', icon: FiPackage, roles: ['ADMIN', 'DISPATCHER', 'TECHNICIAN'] },
  { label: 'Dispatch Board', path: '/dispatcher', icon: FiShield, roles: ['ADMIN', 'DISPATCHER'] },
  { label: 'Analytics', path: '/analytics', icon: FiBarChart2, roles: ['ADMIN'] },
  { label: 'Profile', path: '/profile', icon: FiUser, roles: ['ADMIN', 'DISPATCHER', 'TECHNICIAN', 'CUSTOMER'] },
];

export const canAccess = (role: UserRole | null, roles: UserRole[]) => Boolean(role && roles.includes(role));
