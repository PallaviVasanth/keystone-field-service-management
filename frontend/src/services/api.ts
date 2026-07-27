import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.keystone.example.com',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('keystone-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('keystone-token');
    }
    return Promise.reject(error);
  },
);

export default api;
