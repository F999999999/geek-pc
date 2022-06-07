import axios from "axios";
import { clearTokenByLocalStorage, getTokenByLocalStorage } from "@/utils/auth";
import { message } from "antd";

const http = axios.create({
  baseURL: process.env.REACT_APP_URL,
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
  (e) => {
    if (e.response.status === 401) {
      // 弹出提示
      message.error("登录失效");
      // 清空 token
      clearTokenByLocalStorage();
      // 防止跳转login的时候接口才处理401
      if (window.location.pathname !== "/login") {
        // 跳转到登录页
        window.location.pathname = "/login";
      }
    }
    Promise.reject(e);
  }
);

export { http };
