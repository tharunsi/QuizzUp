import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth", // adjust if deployed
});

// Signup a new user
export const signup = (userData) => API.post("/signup", userData);

// Login an existing user
export const login = (credentials) => API.post("/login", credentials);

// Optional: get current user details (requires JWT in headers)
export const getCurrentUser = (token) =>
  API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
