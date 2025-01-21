import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header dynamically from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    // If the response is successful, return the data
    return response;
  },
  (error) => {
    // If the response is an error, handle it
    if (error.response) {
      // Check if the error is due to an expired token
      if (error.response.status === 401) {
        // Handle token expiration or unauthorized access
        // e.g., navigate to login page or refresh token
        console.error("Unauthorized access - Token might be expired");
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Handle no response received
      console.error("No response received from the server");
    } else {
      // General error handler
      console.error("Error in making request: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
