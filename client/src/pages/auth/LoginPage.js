import React, { useState } from "react";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../_actions/auth/user";

function LoginPage(props) {
  const dispatch = useDispatch();
  const { loginSuccess, errMsg } = useSelector((state) => state.user);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="LOGIN_EMAIL">Email</label>
        <input
          id="LOGIN_EMAIL"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <label htmlFor="LOGIN_PASSWORD">Password</label>
        <input
          id="LOGIN_PASSWORD"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        {!loginSuccess && !!errMsg ? (
          <>
            <br />
            <Alert message={errMsg} type="error" showIcon banner />
          </>
        ) : null}
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
