export type UserRole = 'ADMIN' | 'DISPATCHER' | 'TECHNICIAN' | 'CUSTOMER';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  customerCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  customerCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
}

export interface UpdateCustomerRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  active?: boolean;
}

export interface Site {
  id: string;
  customerId: string;
  siteCode: string;
  siteName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  contactPerson?: string;
  phoneNumber?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSiteRequest {
  customerId: string;
  siteCode: string;
  siteName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  contactPerson?: string;
  phoneNumber?: string;
}

export interface UpdateSiteRequest {
  siteName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  contactPerson?: string;
  phoneNumber?: string;
  active?: boolean;
}

export interface Technician {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTechnicianRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
}

export interface UpdateTechnicianRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
  active?: boolean;
}

export interface Asset {
  id: string;
  siteId: string;
  assetCode: string;
  assetName: string;
  assetType: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  warrantyExpiry?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetRequest {
  siteId: string;
  assetCode: string;
  assetName: string;
  assetType: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  warrantyExpiry?: string;
}

export interface UpdateAssetRequest {
  assetName: string;
  assetType: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  warrantyExpiry?: string;
  active?: boolean;
}

export interface WorkOrder {
  id: string;
  workOrderNumber: string;
  customerId: string;
  siteId: string;
  technicianId?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  scheduledDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkOrderRequest {
  workOrderNumber: string;
  customerId: string;
  siteId: string;
  technicianId?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  scheduledDate?: string;
}

export interface UpdateWorkOrderRequest {
  technicianId?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  scheduledDate?: string;
  completedDate?: string;
}

export interface DashboardSummary {
  totalCustomers: number;
  totalSites: number;
  totalAssets: number;
  totalTechnicians: number;
  totalWorkOrders: number;
  openWorkOrders: number;
  completedWorkOrders: number;
}
