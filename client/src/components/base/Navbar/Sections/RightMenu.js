import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../../_actions/auth/user";

const MenuItem = Menu.Item;

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.payload.success === true) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };

  if (user && !user.isAuth) {
    return (
      <Menu mode={props.mode} selectable={false}>
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
      <Menu mode={props.mode} selectable={false}>
        <MenuItem key="upload">
          <Link to="/video/upload">Upload</Link>
        </MenuItem>
        <MenuItem key="logout">
          <Link to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
