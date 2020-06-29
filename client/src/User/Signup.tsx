import React from "react";
import axios from "axios";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { Store } from "antd/lib/form/interface";
import * as CONFIG from "../config/user";
import "./signup.css";

export const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 6 },
    sm: { span: 8 },
  },
};
export const submitLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};

const Signup = (props: SignupProps): JSX.Element => {
  if (localStorage.getItem("token")) return <Redirect to="/" />;

  const onFinish = (values: Store): void => {
    axios
      .post("/api/signup", { ...values, ...{ type: "SUPER_ADMIN" } })
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/login", { email: res.data.email });
          notification["success"]({
            key: "sameAlert",
            message: "Signup success!",
            placement: "topLeft",
            duration: 2.5,
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          key: "sameAlert",
          message: "Signup error!",
          placement: "topLeft",
          duration: 2.5,
        });
      });
  };

  return (
    <Form {...formItemLayout} name="signup" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        label="Firstname"
        name="firstname"
        rules={[
          { required: true, message: "Please input your firstname!", min: CONFIG.MIN_FIRSTNAME },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lastname"
        name="lastname"
        rules={[
          { required: true, message: "Please input your lastname!", min: CONFIG.MIN_LASTNAME },
        ]}
      >
        <Input />
      </Form.Item>

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
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input style={{ width: "100%" }} />
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

      <Form.Item
        name="passwordCheck"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) return Promise.resolve();
              return Promise.reject("The two passwords that you entered do not match!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...submitLayout} className="buttons">
        <Button type="primary" htmlType="submit">
          Signup
        </Button>

        <Button type="dashed" onClick={() => props.history.push("/login")}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

interface SignupProps extends RouteComponentProps<any>, React.Props<any> {}

export default withRouter(Signup);
