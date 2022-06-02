import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Dashboard from "@/pages/Layout/Dashboard";
import Article from "@/pages/Layout/Article";
import Publish from "@/pages/Layout/Publish";
import NotFound from "@/pages/Layout/NotFound";
import RouterBeforeEach from "@/components/RouterBeforeEach";

const routes = [
  {
    path: "/",
    element: <RouterBeforeEach />,
    children: [
      { path: "/login", element: <Login />, title: "登录" },
      {
        path: "/",
        title: "首页",
        auth: true,
        children: [{ index: true, element: <Navigate to="/home" /> }],
      },
      {
        path: "/home",
        element: <Layout />,
        auth: true,
        children: [
          { index: true, element: <Navigate to="/home/dashboard" /> },
          { path: "dashboard", element: <Dashboard />, auth: true },
          { path: "article", element: <Article />, auth: true },
          { path: "Publish", element: <Publish />, auth: true },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound />, title: "页面不存在 - 404" },
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
