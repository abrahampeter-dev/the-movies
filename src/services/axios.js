import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

//key
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("API KEY:", import.meta.env.VITE_API_KEY);
    config.params = {
      ...config.params,
      api_key: import.meta.env.VITE_API_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data?.status_message || error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
