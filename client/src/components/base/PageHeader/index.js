import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Button, Row, Col, Space, Tooltip } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";

import { logoutUser } from "../../../_actions/auth/user";

const { Header } = Layout;

function PageHeader({ history, collapsed, onCollapse }) {
  const dispatch = useDispatch();
  const { isAuth, checkAuth } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser())
      .then((response) => {
        console.log(response);
        if (response.payload.success === true) {
          history.push("/login");
        }
      })
      .catch((error) => {
        alert("로그아웃에 실패하였습니다.");
        console.log(error);
      });
  };

  return (
    <Header style={{ background: "#fff", padding: "0 1rem" }}>
      <Row>
        <Col span={8}>
          <Button
            size="large"
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ width: "100%", height: "100%" }} />
              ) : (
                <MenuFoldOutlined style={{ width: "100%", height: "100%" }} />
              )
            }
            onClick={() => onCollapse()}
          />
        </Col>
        <Col span={16} style={{ textAlign: "right" }}>
          <Space size="middle" style={{ fontSize: "1rem", color: "black" }}>
            {checkAuth !== undefined ? (
              isAuth ? (
                <>
                  <Tooltip placement="bottom" title="영상 업로드">
                    <Button
                      size="large"
                      type="text"
                      icon={
                        <VideoCameraAddOutlined
                          style={{ fontSize: "1.4rem" }}
                        />
                      }
                      onClick={() => history.push("/video/upload")}
                    />
                  </Tooltip>

                  <Link to="/" onClick={logoutHandler}>
                    로그아웃
                  </Link>
                </>
              ) : (
                <>
                  <Link to="login">로그인</Link>
                  <Link to="register">회원가입</Link>
                </>
              )
            ) : (
              <div></div>
            )}
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default withRouter(PageHeader);
