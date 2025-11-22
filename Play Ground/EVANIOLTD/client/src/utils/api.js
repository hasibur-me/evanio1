import axios from 'axios';

// Use proxy in development, or full URL if VITE_API_URL is explicitly set
// In production on Vercel, use VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : '/api');

console.log('API URL configured:', API_URL);
console.log('Environment:', import.meta.env.MODE);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for file uploads
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData (let browser set it with boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      fullURL: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      code: error.code,
      responseData: error.response?.data
    });

    // Handle network errors specifically
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error('Network Error - Server may not be running or CORS issue');
      return Promise.reject(new Error('Cannot connect to server. Please make sure the server is running on http://localhost:5000'));
    }

    // Only redirect to login if we're not already on the login/register page
    // and if the request is not a login/register request itself
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/auth/login') || 
                          error.config?.url?.includes('/auth/register');
      const isLoginPage = window.location.pathname === '/login' || 
                         window.location.pathname === '/register';
      
      if (!isAuthRoute && !isLoginPage) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;


