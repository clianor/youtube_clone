import axios from "axios";
import { AUTH_LOGIN, AUTH_REGISTER } from "./types";

export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/auth/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: AUTH_LOGIN,
    payload: req,
  };
}

export function registerUser(dataToSubmit) {
  const req = axios
    .post("/api/auth/register", dataToSubmit)
    .then((res) => res.data);
  console.log(req);

  return {
    type: AUTH_REGISTER,
    payload: req,
  };
}
