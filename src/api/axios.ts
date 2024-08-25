import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://localhost:3030",
  withCredentials: true
});