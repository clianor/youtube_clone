import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_INFO,
} from "../../_actions/auth/types";

const initState = {
  isAuth: false,
  isAdmin: false,
  loginSuccess: false,
  registerSuccess: false,
  userId: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload.success,
        userId: action.payload.userId,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        registerSuccess: action.payload.success,
      };
    case AUTH_INFO:
      return {
        ...state,
        isAuth: action.payload.isAuth || false,
        isAdmin: action.payload.isAdmin || false,
        userId: action.payload._id || "",
      };
    default:
      return state;
  }
}
