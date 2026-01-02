import axios from "axios";

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

export default API;
