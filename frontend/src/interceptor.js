import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    if (config.headers) config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
