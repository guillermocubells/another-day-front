import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return config;
});

export default apiClient;
