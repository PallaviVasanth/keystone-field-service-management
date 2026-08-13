import api from './api';
import type { CreateTechnicianRequest, Technician, UpdateTechnicianRequest } from '../types';

export const technicianService = {
  list: () => api.get<Technician[]>('/technicians'),
  create: (data: CreateTechnicianRequest) => api.post<Technician>('/technicians', data),
  update: (id: string, data: UpdateTechnicianRequest) => api.put<Technician>(`/technicians/${id}`, data),
  remove: (id: string) => api.delete<void>(`/technicians/${id}`),
};
