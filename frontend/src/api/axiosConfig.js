// frontend/src/api/axiosConfig.js
import axios from "axios";
import { getToken, removeToken } from "../auth/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔐 Attach token to every request */
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 🚨 Handle expired / invalid token */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = "/login"; // force redirect
    }
    return Promise.reject(error);
  }
);

export default instance;
