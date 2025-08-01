import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (config.headers && typeof config.headers.set === 'function') {

      config.headers.set('Authorization', `Bearer ${token}`);
    } else if (config.headers) {

      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
