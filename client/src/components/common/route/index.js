import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getAuth } from "../../../_actions/auth/user";

/**
 *
 * @param {null || boolean} isAuth  null: 모두 허용, true: 로그인 유저만 허용, false: 로그인 유저는 접속 불가
 * @param {boolean} isAdmin true: 어드민 유저만 허용, false: 모든 유저 허용
 */
class CustomRoute extends Route {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: undefined,
      isAdmin: undefined,
    };
  }

  componentDidMount() {
    this.props
      .getAuth()
      .then((response) => {
        response.payload.errMsg
          ? this.setState({
              isAuth: false,
              isAdmin: false,
            })
          : this.setState({
              isAuth: response.payload.isAuth,
              isAdmin: response.payload.isAdmin,
            });
      })
      .catch((error) => {
        this.setState({
          isAuth: false,
          isAdmin: false,
        });
        console.error(error);
      });
  }

  render() {
    const { isAuth, isAdmin } = this.props;
    if (isAuth === null) {
      // 모든 사람 허용
      return <this.props.component />;
    } else {
      if (this.state.isAuth === undefined) {
        return <div>Loading...</div>;
      } else if (isAuth === false && this.state.isAuth === false) {
        // 로그인 안한 사람만 허용
        return <this.props.component />;
      } else if (isAuth === true && this.state.isAuth === true) {
        // 로그인 한 사람만 허용

        if (isAdmin === true) {
          // 관리자 메뉴일때
          return this.state.isAdmin === true ? (
            <this.props.component />
          ) : (
            <Redirect to="/" />
          );
        } else {
          return <this.props.component />;
        }
      }
      return <Redirect to="/" />;
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
