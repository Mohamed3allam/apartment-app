import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export default api;
