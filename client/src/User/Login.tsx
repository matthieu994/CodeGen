import React from "react";
import axios, { AxiosError } from "axios";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { Store } from "antd/lib/form/interface";
import { formItemLayout, submitLayout } from "./Signup";
import * as CONFIG from "../config/user";
import "./signup.css";

const Login = (props: LoginProps): JSX.Element => {
  if (localStorage.getItem("token")) return <Redirect to="/" />;

  const onFinish = (values: Store): void => {
    axios
      .post("/api/login", { ...values })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          props.history.push("/");
          notification["success"]({
            key: "sameAlert",
            message: "Login success!",
            placement: "topRight",
            duration: 2.5,
          });
        }
      })
      .catch((err: AxiosError) => {
        notification["error"]({
          key: "sameAlert",
          message: err.response?.data.info.message,
          placement: "topRight",
          duration: 2.5,
        });
      });
  };

  return (
    <Form {...formItemLayout} name="login" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
            min: CONFIG.MIN_PASSWORD,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...submitLayout} className="buttons">
        <Button type="primary" htmlType="submit">
          Login
        </Button>

        <Button type="dashed" onClick={(): void => props.history.push("/signup")}>
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};

interface LoginProps extends RouteComponentProps<any, any, any>, React.Props<any> {}

export default withRouter(Login);
