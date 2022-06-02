import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Dashboard from "@/pages/Layout/Dashboard";
import Article from "@/pages/Layout/Article";
import Publish from "@/pages/Layout/Publish";
import NotFound from "@/pages/Layout/NotFound";
import RouterBeforeEach from "@/components/RouterBeforeEach";

export const routes = [
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
          {
            index: true,
            element: <Navigate to="/home/dashboard" />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            auth: true,
            title: "数据概览",
          },
          {
            path: "article",
            element: <Article />,
            auth: true,
            title: "内容管理",
          },
          {
            path: "Publish",
            element: <Publish />,
            auth: true,
            children: [{ path: ":id", element: <div>id</div> }],
            title: "发布文章",
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound />, title: "页面不存在 - 404" },
];

function AppRoute() {
  return useRoutes(routes);
}

export default AppRoute;
