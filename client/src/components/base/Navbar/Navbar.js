import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Sections/Navbar.css";

export default function Navbar() {
  const [Visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="NAVBAR"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="NAVBAR_LOGO">
        <Link to="/">Logo</Link>
      </div>
      <div
        className="NAVBAR_CONTAINER"
        align="center"
        size="large"
        style={{ height: "100%" }}
      >
        <div className="NAVBAR_LEFT">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="NAVBAR_RIGHT">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="NAVBAR_MOBILE-BUTTON"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          className="NAVBAR_DRAWER"
          closable={false}
          onClose={onClose}
          visible={Visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}
