import axios from "axios";
import { Platform } from "react-native";

export const axiosInstance = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: (Platform.OS === 'android')
    ? 'http://10.0.2.2:3030'
    : 'http://localhost:3030',
  withCredentials: true
});