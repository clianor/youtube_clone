import axios from "axios";
import { AUTH_LOGIN } from "./types";

export function loginUser(dataToSubmit) {
  const req = axios
    .post("/api/auth/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: AUTH_LOGIN,
    payload: req,
  };
}
