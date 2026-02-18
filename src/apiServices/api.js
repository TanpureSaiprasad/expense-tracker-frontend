import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-az22.onrender.com"
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

//  Handle token expiry
let isLoggingOut = false;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    //  Only logout if user is logged in AND request is NOT login
    if (
      error.response?.status === 401 &&
      userInfo?.token &&
      !error.config.url.includes("/login") &&
      !isLoggingOut
    ) {
      isLoggingOut = true;

      toast.error("Session expired. Please login again.");

      localStorage.removeItem("userInfo");

      setTimeout(() => {
        window.location.replace("/login");
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default API;
