import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/auth/user";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onNameHandler = (event) => {
    setName(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    const body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
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
        <label htmlFor="REGISTER_EMAIL">Email</label>
        <input
          id="REGISTER_EMAIL"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <label htmlFor="REGISTER_NAME">Name</label>
        <input
          id="REGISTER_NAME"
          type="text"
          value={Name}
          onChange={onNameHandler}
        />
        <label htmlFor="REGISTER_PASSWORD">Password</label>
        <input
          id="REGISTER_PASSWORD"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <label htmlFor="REGISTER_CONFIRM_PASSWORD">Confirm Password</label>
        <input
          id="REGISTER_CONFIRM_PASSWORD"
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
