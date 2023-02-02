import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://newbackend.onrender.com/api',
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
  });