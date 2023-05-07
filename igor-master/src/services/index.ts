import axios from "axios";

const AuthApi = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

const MainApi = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

MainApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export { AuthApi, MainApi };
