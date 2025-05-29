import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
});
