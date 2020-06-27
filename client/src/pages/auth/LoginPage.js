import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/auth/user";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

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
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
