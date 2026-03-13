import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://lms-backend-4h0o.onrender.com/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.msg ||
      error?.response?.data?.message ||
      error?.response?.data?.errors?.[0]?.msg ||
      "Something went wrong";

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else if (status === 403) {
      toast.error("Access denied. You don't have permission.");
    } else if (status === 404) {
      // Let callers handle
    } else if (status === 500) {
      toast.error("Server error. Please try again later.");
    } else if (!error.response) {
      toast.error("Network error. Check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default api;
