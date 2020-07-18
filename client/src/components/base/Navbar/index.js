import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

const { Sider, Header } = Layout;

function NavBar({ collapsed }) {
  return (
    <Sider
      collapsed={collapsed}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        boxShadow: "10px 0 30px f3f1f1",
      }}
    >
      <Header
        style={{
          background: "#fff",
          textAlign: "center",
          padding: collapsed ? 0 : "inherit",
        }}
      >
        <Link to="/">
          <YoutubeFilled
            className="logo"
            style={{
              fontSize: collapsed ? "2rem" : "3rem",
              color: "#ff0800",
              verticalAlign: "middle",
              transition: "all 0.5s",
              msTransition: "all, 0.5s",
              MozTransition: "all 0.5s",
              WebkitTransition: "all 0.5s",
            }}
          />
        </Link>
      </Header>
      <Menu mode="inline" style={{ marginTop: "1.2rem" }}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default NavBar;
