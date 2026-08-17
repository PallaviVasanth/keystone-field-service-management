import type { Customer, DashboardStats, NotificationItem, Site, WorkOrder } from '../types';

export const dashboardStats: DashboardStats = {
  totalWorkOrders: 184,
  completedToday: 27,
  activeTechnicians: 14,
  revenue: 128400,
};

export const customers: Customer[] = [
  { id: 'c1', name: 'Margaret Ross', company: 'Northwind Labs', email: 'mross@northwind.com', phone: '+1 415 555 0139', address: '150 Market St, San Francisco', status: 'Active' },
  { id: 'c2', name: 'Hector Flores', company: 'Apex Utilities', email: 'hflores@apex.com', phone: '+1 415 555 0142', address: '770 Harbor Ave, Oakland', status: 'Pending' },
  { id: 'c3', name: 'Oluwaseun Patel', company: 'BluePeak Health', email: 'opatel@bluepeak.com', phone: '+1 415 555 0148', address: '24 Cedar St, San Jose', status: 'Active' },
];

export const sites: Site[] = [
  { id: 's1', name: 'Northwind Data Center', address: '150 Market St, San Francisco', customerId: 'c1', status: 'Operational' },
  { id: 's2', name: 'Apex Substation', address: '770 Harbor Ave, Oakland', customerId: 'c2', status: 'Maintenance' },
  { id: 's3', name: 'BluePeak Clinic', address: '24 Cedar St, San Jose', customerId: 'c3', status: 'Operational' },
];

export const workOrders: WorkOrder[] = [
  { id: 'wo1', title: 'HVAC optimization', customerId: 'c1', siteId: 's1', technicianId: 't1', status: 'NEW', priority: 'High', createdAt: '2026-07-24', scheduledAt: '2026-07-25', description: 'Inspect and optimize cooling performance before peak load.' },
  { id: 'wo2', title: 'Generator service', customerId: 'c2', siteId: 's2', technicianId: 't2', status: 'ASSIGNED', priority: 'Critical', createdAt: '2026-07-23', scheduledAt: '2026-07-24', description: 'Perform preventive maintenance on backup generator.' },
  { id: 'wo3', title: 'Network cabinet audit', customerId: 'c3', siteId: 's3', technicianId: 't3', status: 'IN PROGRESS', priority: 'Medium', createdAt: '2026-07-22', scheduledAt: '2026-07-25', description: 'Audit network cabinets and replace failing sensors.' },
  { id: 'wo4', title: 'Access panel replacement', customerId: 'c1', siteId: 's1', technicianId: 't4', status: 'COMPLETED', priority: 'Low', createdAt: '2026-07-21', scheduledAt: '2026-07-22', description: 'Replace worn access panel and verify secure closure.' },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Work order updated', message: 'HVAC optimization moved to assigned', time: '10 mins ago', read: false },
  { id: 'n2', title: 'Technician check-in', message: 'Jonas checked in at Apex Substation', time: '32 mins ago', read: true },
  { id: 'n3', title: 'Customer follow-up', message: 'BluePeak requested a revised service window', time: '1 hr ago', read: false },
];
