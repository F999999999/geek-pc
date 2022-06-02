import styles from "./index.module.scss";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Popconfirm } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, getUserInfo } from "@/store/userSlice";

const GeekLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  // 对发布文章路径进行处理 使其能匹配到菜单的key的值
  const menuSelectedKey = location.pathname.startsWith("/home/publish")
    ? "/home/publish"
    : location.pathname;

  // 退出登录
  const onLogout = () => {
    // 清空 token
    dispatch(clearToken());
    // 跳转到登录页面
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <Layout className={styles.root}>
      {/* 头部 - 横向通栏 */}
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[menuSelectedKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/home/dashboard">
              <Link to="/home/dashboard">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/home/article">
              <Link to="/home/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/home/publish">
              <Link to="/home/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 渲染匹配的子路由的插槽 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
