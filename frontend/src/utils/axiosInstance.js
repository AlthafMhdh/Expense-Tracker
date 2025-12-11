import axios from "axios";
import { BASE_URL } from "./apiPaths";

// const axiosInstance = axios.create({
//     baseURL : BASE_URL,
//     timeout : 10000,
//     headers : {
//         "Content-Type" : "application/json",
//         Accept : "application/json",
//     },
// });

const axiosInstance = axios.create({
  baseURL: "https://expense-trackify-server.vercel.app/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";
            } 
            else if (error.response.status === 500) {
                console.error("Server error. please try again.")
            }
        }
        else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. please try again.")
        } 
        return Promise.reject(error);
    }
);

export default axiosInstance;