import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://muhammadbilal10101-todo-ai.hf.space',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    console.log('Full request config:', {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config?.url,
      method: response.config?.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    
    // Show error toast
    toast.error(message);
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: message,
      fullError: error
    });
    
    return Promise.reject(error);
  }
);

export default httpClient; 