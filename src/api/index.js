import axios from "axios";
import * as API from "@/constants/api";
import useStore from "@/context/store";
import { toast } from "react-toastify";

const apiInstance = axios.create({
  baseURL: API.DOMAIN,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(API.REFRESH_TOKEN, { refreshToken });

        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;

        return apiInstance(originalRequest);
      } catch (err) {
        useStore.getState().logout(); 
        toast.error("Session expired. Please log in again.", { theme: "colored" });
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
