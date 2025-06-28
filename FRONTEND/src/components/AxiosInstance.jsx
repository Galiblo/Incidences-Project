import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";
const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // 5 seconds
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      config.headers.Authorization = ``;
    }
    return config;
  }
  /*(error) => {
    return Promise.reject(error);
  }
    */
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("Token");
    }
  }
);

export default AxiosInstance;