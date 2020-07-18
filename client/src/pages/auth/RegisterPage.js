import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/auth/user";
import { withRouter } from "react-router-dom";
import { Layout, Form, Typography, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  UserDeleteOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;
const FormItem = Form.Item;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        lastName: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        name: Yup.string().required("Name is required"),
        password: Yup.string()
          .min(5, "Password must be at least 5 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            name: values.name,
            password: values.password,
          };

          dispatch(registerUser(dataToSubmit))
            .then((res) => {
              if (res.payload.success) {
                props.history.push("/login");
              } else {
                setFormErrorMessage("Failed to sign up");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Failed to sign up");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });

          console.log(dataToSubmit);
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
        <Content>
          <Helmet>
            <meta charSet="utf-8" />
            <title>회원가입</title>
          </Helmet>
          <Title level={2}>회원가입</Title>
          <form onSubmit={handleSubmit} style={{ width: "350px" }}>
            <FormItem required>
              <Input
                id="email"
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
                id="name"
                prefix={
                  <UserDeleteOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your name"
                type="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.name && touched.name
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
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

            <FormItem required>
              <Input
                id="confirmPassword"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Enter your confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback">{errors.confirmPassword}</div>
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
              <Button
                type="primary"
                htmlType="submit"
                className="REGISTER_FROM_BUTTON"
                style={{ minWidth: "100%" }}
                disabled={isSubmitting}
              >
                회원가입
              </Button>
            </FormItem>
          </form>
        </Content>
      )}
    </Formik>
  );
}

export default withRouter(RegisterPage);
