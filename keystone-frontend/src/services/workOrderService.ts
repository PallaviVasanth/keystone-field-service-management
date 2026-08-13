import api from './api';
import type { CreateWorkOrderRequest, UpdateWorkOrderRequest, WorkOrder } from '../types';

export const workOrderService = {
  list: () => api.get<WorkOrder[]>('/workorders'),
  create: (data: CreateWorkOrderRequest) => api.post<WorkOrder>('/workorders', data),
  update: (id: string, data: UpdateWorkOrderRequest) => api.put<WorkOrder>(`/workorders/${id}`, data),
  remove: (id: string) => api.delete<void>(`/workorders/${id}`),
};
