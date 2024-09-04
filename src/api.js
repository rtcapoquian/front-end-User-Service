// src/api.js
import axios from 'axios';

// const API_URL = 'https://d1z4jk391q4erq.cloudfront.net';
const API_URL = 'http://localhost:5000';
// Create an Axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to each request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, error => Promise.reject(error));

export default api;
