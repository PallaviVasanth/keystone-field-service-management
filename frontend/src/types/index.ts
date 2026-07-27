export type UserRole = 'admin' | 'dispatcher' | 'manager' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface Site {
  id: string;
  name: string;
  address: string;
  customerId: string;
  status: 'Operational' | 'Maintenance' | 'Offline';
}

export interface WorkOrder {
  id: string;
  title: string;
  customerId: string;
  siteId: string;
  technicianId: string;
  status: 'NEW' | 'ASSIGNED' | 'IN PROGRESS' | 'ON HOLD' | 'COMPLETED' | 'CLOSED';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: string;
  scheduledAt: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface DashboardStats {
  totalWorkOrders: number;
  completedToday: number;
  activeTechnicians: number;
  revenue: number;
}
