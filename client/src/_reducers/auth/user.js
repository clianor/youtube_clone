import { AUTH_LOGIN } from "../../_actions/auth/types";

const initState = {
  loginSuccess: false,
  userId: "",
  errMsg: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess,
        errMsg: action.payload.errMsg,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
}
