import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MenuItem = Menu.Item;

export default function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`/api/auth/logout`)
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          props.history.push("/login");
        } else {
          alert("로그아웃에 실패하였습니다.");
        }
      })
      .catch((err) => console.err(err));
  };

  if (user && !user.isAuth) {
    return (
      <Menu
        mode={props.mode}
        onClick={({ item, key, keyPath, domEvent }) => {}}
      >
        <MenuItem key="signin">
          <Link to="/login">Signin</Link>
        </MenuItem>
        <MenuItem key="signup">
          <Link to="/register">Signup</Link>
        </MenuItem>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <MenuItem key="logout">
          <Link onClick={logoutHandler}>Logout</Link>
        </MenuItem>
      </Menu>
    );
  }
}
