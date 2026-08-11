import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '') 
  : "http://localhost:5000";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // 1. Check if we have a token stored in localStorage
    const token = localStorage.getItem('token');

    // 2. If we do, attach it to the 'Authorization' header of the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
