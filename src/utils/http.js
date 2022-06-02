import axios from "axios";
import { getTokenByLocalStorage } from "@/utils/auth";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use((config) => {
  // 获取 token
  const token = getTokenByLocalStorage();
  if (token) {
    config.headers.Authorization = "Basic " + token;
  }
  return config;
});

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res?.data?.data || res;
  },
  (e) => Promise.reject(e)
);

export { http };
