import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  // {
  //   path: "/news",
  //   element: <News />,
  //   children: [
  //     { path: "inner", element: <InnerNews /> },
  //     { path: "outer", element: <OuterNews /> },
  //   ],
  // },
];

function AppRoute() {
  return useRoutes(routes);
}

export default AppRoute;
