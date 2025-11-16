import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "https://swift-chat-backend-ipx3.vercel.app/api",
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});
