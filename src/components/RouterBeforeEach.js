import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { routes } from "@/route";
import { useEffect, useState } from "react";
import { getTokenByLocalStorage } from "@/utils";

// 前置路由守卫
const RouterBeforeEach = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // 检索当前路由信息
    const currentMatchRoute = matchRoutes(routes, location);
    const currentRoute = currentMatchRoute[currentMatchRoute.length - 1].route;
    // 动态修改页面 title
    if (currentRoute.title) {
      document.title = currentRoute.title + " - 极客园 - PC";
    } else {
      document.title = "极客园 - PC";
    }
    // 获取 token
    const token = getTokenByLocalStorage();
    // 判断当前路径是否需要认证 如果需要认证再判断token是否存在
    if (currentMatchRoute.find((item) => item.route.auth) && !token) {
      // 未登录
      setAuth(false);
      // 跳转到登录页
      navigate("/login", { state: { redirectURL: location.pathname } });
    } else {
      // 已登录
      setAuth(true);
    }
  }, [location]);
  // 如果认证通过则正常渲染
  return auth && <Outlet />;
};
export default RouterBeforeEach;
