import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Spin } from "antd";
import { getAuth } from "../../_actions/auth/user";

const { Content } = Layout;

export function checkAuth(SpecificComponent, isAuth = null, isAdmin = false) {
  /**
   *
   * @param {null || boolean} isAuth  null: 모두 허용, true: 로그인 유저만 허용, false: 로그인 유저는 접속 불가
   * @param {boolean} isAdmin true: 어드민 유저만 허용, false: 모든 유저 허용
   */
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const storeIsAuth = user.isAuth;
    const storeIsAdmin = user.isAdmin;
    const checkAuth = user.checkAuth;

    useEffect(() => {
      dispatch(getAuth()).catch((error) => {
        console.error(error);
      });
    }, [dispatch]);

    if (checkAuth === undefined) {
      // 권한 체크 이전
      return (
        <Content>
          <Spin size="large" tip="Loading..." />
        </Content>
      );
    } else if (isAuth === null) {
      // 모든 사람 허용
      return <SpecificComponent />;
    } else if (isAuth === false && storeIsAuth === false) {
      // 로그인 안한 사람만 허용
      return <SpecificComponent />;
    } else if (isAuth === true && storeIsAuth === true) {
      // 로그인 한 사람만 허용

      if (isAdmin === true && storeIsAdmin === false) {
        // 관리자 전용인데 관리자가 아닐때 리다이렉트
        return <Redirect to="/" />;
      }
      return <SpecificComponent />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return AuthenticationCheck;
}
