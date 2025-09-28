import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const loginUser = (email, password) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const createUser = (user, token) =>
  axios.post(`${API_URL}/auth/create-user`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getEmployees = (token) =>
  axios.get(`${API_URL}/employees`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createEmployee = (employee, token) =>
  axios.post(`${API_URL}/employees`, employee, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateEmployee = (id, data, token) =>
  axios.put(`${API_URL}/employees/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteEmployee = (id, token) =>
  axios.delete(`${API_URL}/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
