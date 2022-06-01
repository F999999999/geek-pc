import { useNavigate, useLocation } from "react-router-dom";
import { checkRouterAuth } from "@/route";
import { useEffect, useState } from "react";
import { getTokenByLocalStorage } from "@/utils";

// 前置路由守卫
const RouterBeforeEach = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    // 检索当前路由信息
    let currentRoute = checkRouterAuth(location.pathname);
    console.log(currentRoute, location);
    // 动态修改页面 title
    if (currentRoute?.title) {
      document.title = currentRoute.title;
    }
    // 获取 token
    const token = getTokenByLocalStorage();
    // 判断当前路径是否需要认证 如果需要认证再判断token是否存在
    if (currentRoute?.auth && !token) {
      // 未登录
      setAuth(false);
      // 跳转到登录页
      navigate("/login");
    } else {
      // 已登录
      setAuth(true);
    }
  }, [location, navigate]);
  // 如果认证通过则渲染 children
  return auth && children;
};
export default RouterBeforeEach;
