import axios from 'axios';

export const API_URL = 'http://localhost:5454';
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);
