import { AUTH_LOGIN, AUTH_REGISTER } from "../../_actions/auth/types";

const initState = {
  loginSuccess: false,
  registerSuccess: false,
  userId: "",
  errMsg: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload.success,
        errMsg: action.payload.errMsg,
        userId: action.payload.userId,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        registerSuccess: action.payload.success,
      };
    default:
      return state;
  }
}
