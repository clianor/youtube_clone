import axios from "axios";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_INFO, AUTH_LOGOUT } from "./types";

const instance = axios.create();
instance.defaults.timeout = 3000;

export function loginUser(dataToSubmit) {
  const req = instance
    .post("/api/auth/login", dataToSubmit)
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return {
    type: AUTH_LOGIN,
    payload: req,
  };
}

export function registerUser(dataToSubmit) {
  const req = instance
    .post("/api/auth/register", dataToSubmit)
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return {
    type: AUTH_REGISTER,
    payload: req,
  };
}

export function logoutUser() {
  const req = instance
    .get(`/api/auth/logout`)
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return {
    type: AUTH_LOGOUT,
    payload: req,
  };
}

export function getAuth() {
  const req = instance
    .get("/api/auth/info")
    .then((res) => res.data)
    .catch((err) => console.error(err));

  return {
    type: AUTH_INFO,
    payload: req,
  };
}
