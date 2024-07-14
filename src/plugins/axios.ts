/* eslint-disable regex/invalid */
import router from "@/router";
import axios from "axios";
import { toast } from "vue3-toastify";

export const baseURL = "http://localhost:5051/api";
const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: `${baseURL}`,

  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("accessToken");

  // If token is found
  // if (token) {
  // Get request headers and if headers is undefined assign blank object
  config.headers = config.headers || {};
  config.headers["Accept-Language"] = "ar";

  // Set authorization header
  // ℹ️ JSON.parse will convert token to string
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  if (!config.params) config.params = {};

  config.params.deleted = false;

  // }
  // Return modified config
  return config;
});

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    // Handle error
    if (error.response.status === 401) {
      // ℹ️ Logout user and redirect to login page
      // Remove "userData" from localStorage
      localStorage.removeItem("userData");

      // Remove "accessToken" from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userAbilities");

      // If 401 response returned from api
      router.push("/login");
    } else {
      if (error.response.data) {
        if (error.response.status > 499)
          toast.error("حدث خطأ ما يرجى المحاولة مرة أخرى");
        else toast.error(error.response.data.message);
      }

      return Promise.reject(error);
    }
  }
);

export default axiosIns;
