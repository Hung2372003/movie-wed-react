import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // URL của .NET API
});

// Gắn token nếu có
AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosClient;
