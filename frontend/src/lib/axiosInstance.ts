import axios from "axios";
import env from "@/config/env.config";
import { toast } from "sonner";

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong, Please try again!";
    toast.error(errorMsg);
    return error;
  },
);

export default api;
