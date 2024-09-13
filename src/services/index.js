import axios from "axios";
import * as API from "@/constants/api";

const request = axios.create({
  baseURL: API.DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("refreshToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default request;
