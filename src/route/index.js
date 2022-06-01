import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const routes = [
  { path: "/", element: <Home />, title: "首页", auth: true },
  { path: "/login", element: <Login />, title: "登录" },
  { path: "*", element: <div>404</div>, title: "404" },
];

function AppRoute() {
  return useRoutes(routes);
}

//根据路径获取路由
const checkAuth = (routers, path) => {
  for (const data of routers) {
    if (data.path === path) return data;
    if (data.children) {
      const res = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};

export const checkRouterAuth = (path) => {
  return checkAuth(routes, path);
};

export default AppRoute;
