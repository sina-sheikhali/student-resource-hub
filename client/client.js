import axios from "axios";
import { baseUrl } from "./baseUrl";
import { toast } from "react-toastify";

function getTokenFromCookie() {
  if (typeof document === "undefined") return null;

  const name = "token=";
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
}

export const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(error.response.data?.message || "خطایی رخ داده است");
    } else {
      toast.error("ارتباط با سرور برقرار نشد");
    }
    return Promise.reject(error);
  },
);
