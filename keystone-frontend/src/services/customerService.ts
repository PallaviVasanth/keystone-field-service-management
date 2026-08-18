import api from './api';

import type {
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest,
} from '../types';

export const customerService = {
  list: () =>
    api.get<Customer[]>('/customers'),

  getById: (id: string) =>
    api.get<Customer>(`/customers/${id}`),

  getMe: () =>
    api.get<Customer>('/customers/me'),

  create: (data: CreateCustomerRequest) =>
    api.post<Customer>('/customers', data),

  update: (
    id: string,
    data: UpdateCustomerRequest,
  ) =>
    api.put<Customer>(`/customers/${id}`, data),

  remove: (id: string) =>
    api.delete<void>(`/customers/${id}`),
};