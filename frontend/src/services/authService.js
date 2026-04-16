//frontend/src/services/authService.js
import api from "../api/axiosConfig";

export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};