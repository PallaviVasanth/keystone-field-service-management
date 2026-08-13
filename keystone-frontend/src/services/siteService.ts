import api from './api';
import type { CreateSiteRequest, Site, UpdateSiteRequest } from '../types';

export const siteService = {
  list: () => api.get<Site[]>('/sites'),
  create: (data: CreateSiteRequest) => api.post<Site>('/sites', data),
  update: (id: string, data: UpdateSiteRequest) => api.put<Site>(`/sites/${id}`, data),
  remove: (id: string) => api.delete<void>(`/sites/${id}`),
};
