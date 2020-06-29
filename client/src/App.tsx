import React, { Component, Props, ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Axios from "axios";
import { Layout } from "antd";
import Links from "./Links";
import Routes from "./Routes";
const { Content, Sider } = Layout;

class App extends Component {
  constructor(props: Props<ReactNode>) {
    super(props);
    if (process.env.REACT_APP_DEV_PROXY) Axios.defaults.baseURL = process.env.REACT_APP_DEV_PROXY;

    Axios.interceptors.request.use(
      (request) => {
        request.headers["Authorization"] = `JWT ${localStorage.getItem("token")}`;
        return request;
      },
      (error) => Promise.reject(error)
    );
  }

  render(): JSX.Element {
    return (
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <Links />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default App;
