import axios from 'axios';

// Base URL of the PHP API
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost/kp-api/public';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan jaringan';
    return Promise.reject(new Error(message));
  }
);

export default api;
