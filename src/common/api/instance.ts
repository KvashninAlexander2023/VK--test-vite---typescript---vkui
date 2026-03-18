import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY ?? "",
  },
});
