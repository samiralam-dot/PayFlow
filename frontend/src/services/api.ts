import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach correlation ID automatically to every request
apiClient.interceptors.request.use((config) => {
  if (!config.headers['X-Correlation-Id']) {
    config.headers['X-Correlation-Id'] = `req_${Math.random().toString(36).substring(2, 11)}`;
  }
  return config;
});

export const checkHealth = async () => {
  const { data } = await apiClient.get('/health');
  return data;
};

export const getApiStatus = async () => {
  const { data } = await apiClient.get('/api/v1/status');
  return data;
};
