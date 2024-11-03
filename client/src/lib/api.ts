import axios from 'axios';
import { isAxiosError } from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      const err = error as Error;
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          throw new Error('User already exists');
        }
      }
      throw new Error('Registration failed');
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  },
  
  completeProfile: async (formData: FormData) => {
    try {
      const response = await api.post('/auth/complete-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('auth_token');
      throw error;
    }
  },
};