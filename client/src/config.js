import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "https://backend22.onrender.com/api"
})