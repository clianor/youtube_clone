import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAuth } from "../../../_actions/auth/user";

class EmptyComponent extends React.Component {
  render() {
    return <div></div>;
  }
}

/**
 *
 * @param {null || boolean} isAuth  null: 모두 허용, true: 로그인 유저만 허용, false: 로그인 유저는 접속 불가
 * @param {boolean} isAdmin true: 어드민 유저만 허용, false: 모든 유저 허용
 */
class CustomRoute extends Route {
  constructor(props) {
    super(props);

    this.initAuth();
  }

  async initAuth() {
    await this.props.getAuth().then((res) => {
      this.setState({
        isAuth: res.payload.isAuth,
        isAdmin: res.payload.isAdmin,
      });
    });
  }

  render() {
    if (this.state) {
      const { isAuth, isAdmin } = this.state;

      if (this.props.isAuth === null) {
        // 모든 사람 허용
        return <this.props.component />;
      } else if (
        this.props.isAuth &&
        isAuth &&
        !(this.props.isAdmin && !isAdmin)
      ) {
        // 로그인한 사람만 허용 && 관리자 권한 체크
        return <this.props.component />;
      } else if (!this.props.isAuth && !isAuth) {
        // 로그인 안한 사람만 허용
        return <this.props.component />;
      }

      return <Redirect to="/" />;
    } else {
      return <EmptyComponent />;
    }
  }
}

CustomRoute.defaultProps = {
  isAuth: null,
  isAdmin: false,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getAuth: () => dispatch(getAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomRoute);
