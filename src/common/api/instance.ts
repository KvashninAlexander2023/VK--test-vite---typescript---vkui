import axios from "axios";

// Базовый URL - работает и локально, и на Vercel через proxy server
//TODO - URL вынести в .env

export const instance = axios.create({
  baseURL: "https://proxy-one-lake.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY ?? "",
  },
});

export default instance;
