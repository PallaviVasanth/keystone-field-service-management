import axios from 'axios';

// Falls back to the local backend if VITE_API_BASE_URL isn't set (e.g. no
// .env file present). Never points at a placeholder/fake domain.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
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
      // Token missing/expired/invalid. Clear stored credentials so a
      // stale token isn't retried on the next request. Note: this does
      // not force an immediate UI redirect — AuthContext's own state is
      // what routing decisions are based on, and it isn't listening for
      // this event. In practice this matters once real protected
      // endpoints beyond /auth exist; today only /auth/** is public and
      // this branch fires on a plain bad-login attempt.
      localStorage.removeItem('keystone-token');
      localStorage.removeItem('keystone-user');
    }
    return Promise.reject(error);
  },
);

export default api;