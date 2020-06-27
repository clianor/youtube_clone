import axios from "axios";
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_INFO } from "./types";

export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/auth/login", dataToSubmit)
    .then((res) => res.data)
    .catch((err) => console.err(err));

  return {
    type: AUTH_LOGIN,
    payload: req,
  };
}

export function registerUser(dataToSubmit) {
  const req = axios
    .post("/api/auth/register", dataToSubmit)
    .then((res) => res.data)
    .catch((err) => console.err(err));

  return {
    type: AUTH_REGISTER,
    payload: req,
  };
}

export function getAuth() {
  const req = axios
    .get("/api/auth/info")
    .then((res) => res.data)
    .catch((err) => console.err(err));

  return {
    type: AUTH_INFO,
    payload: req,
  };
}
