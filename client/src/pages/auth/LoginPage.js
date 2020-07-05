import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/auth/user";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserDeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";

const { Title } = Typography;
const FormItem = Form.Item;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{ email: initialEmail, password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password must be at least 5 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((res) => {
              if (res.payload.success) {
                window.localStorage.setItem("userId", res.payload._id);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.email);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });

          setSubmitting(false);
        }, 1000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="CONTENTS">
          <Title level={2}>로그인</Title>
          <form onSubmit={handleSubmit} style={{ width: "350px" }}>
            <FormItem required>
              <Input
                id="email"
                prefix={
                  <UserDeleteOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
            </FormItem>

            <FormItem required>
              <Input
                id="password"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
            </FormItem>

            {formErrorMessage && (
              <label>
                <p
                  style={{
                    color: "#ff0000bf",
                    fontSize: "0.7rem",
                    border: "1px solid",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  {formErrorMessage}
                </p>
              </label>
            )}

            <FormItem>
              <Checkbox
                id="rememberMe"
                onChange={handleRememberMe}
                checked={rememberMe}
              >
                Remember me
              </Checkbox>
              <a
                className="LOGIN_FROM_FORGET"
                href="/reset_user"
                style={{ float: "right" }}
              >
                forgot password
              </a>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="LOGIN_FROM_BUTTON"
                  style={{ minWidth: "100%" }}
                  disabled={isSubmitting}
                >
                  로그인
                </Button>
              </div>
              Or <a href="/register">register now!</a>
            </FormItem>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default withRouter(LoginPage);
