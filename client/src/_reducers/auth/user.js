import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_INFO,
} from "../../_actions/auth/types";

const initState = {
  checkAuth: undefined,
  isAuth: false,
  isAdmin: false,
  loginSuccess: false,
  registerSuccess: false,
  userId: "",
  email: "",
  name: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload.success,
        userId: action.payload._id || "",
        isAuth: action.payload.isAuth || false,
        isAdmin: action.payload.isAdmin || false,
        email: action.payload.email || "",
        name: action.payload.name || "",
      };
    case AUTH_REGISTER:
      return {
        ...state,
        registerSuccess: action.payload.success,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        checkAuth: undefined,
        loginSuccess: false,
        isAuth: false,
        isAdmin: false,
        userId: "",
        email: "",
        name: "",
      };
    case AUTH_INFO:
      return {
        ...state,
        checkAuth: true,
        userId: action.payload._id || "",
        isAuth: action.payload.isAuth || false,
        isAdmin: action.payload.isAdmin || false,
        email: action.payload.email || "",
        name: action.payload.name || "",
      };
    default:
      return state;
  }
}
