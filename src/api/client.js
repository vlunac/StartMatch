// src/api/client.js
// Axios base instance — swap baseURL from .env when backend is ready.
// For hackathon demo all api/ modules return mock data directly.

import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach JWT if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("startmatch-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("startmatch-token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default client;
