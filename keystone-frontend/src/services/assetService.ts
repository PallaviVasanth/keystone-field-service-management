import api from './api';
import type { Asset, CreateAssetRequest, UpdateAssetRequest } from '../types';

export const assetService = {
  list: () => api.get<Asset[]>('/assets'),
  create: (data: CreateAssetRequest) => api.post<Asset>('/assets', data),
  update: (id: string, data: UpdateAssetRequest) => api.put<Asset>(`/assets/${id}`, data),
  remove: (id: string) => api.delete<void>(`/assets/${id}`),
};
