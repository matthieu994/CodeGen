import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Axios from "axios";
import { Layout } from "antd";
import Links from "./Links";
import Routes from "./Routes";
const { Content, Sider } = Layout;

class App extends Component<AppProps> {
  private unlisten: Function;

  state = {
    links: [],
  };

  constructor(props: AppProps) {
    super(props);
    if (process.env.REACT_APP_DEV_PROXY) Axios.defaults.baseURL = process.env.REACT_APP_DEV_PROXY;

    Axios.interceptors.request.use(
      (request) => {
        request.headers["Authorization"] = `JWT ${localStorage.getItem("token")}`;
        return request;
      },
      (error) => Promise.reject(error)
    );

    this.unlisten = (): null => null;
  }

  componentDidMount(): void {
    this.getLinks();
    this.unlisten = this.props.history.listen(() => {
      this.getLinks();
    });
  }

  getLinks(): void {
    Axios.post("/api/auth/links")
      .then((res) => {
        if (res)
          return this.setState({ links: (res.data.links as Array<string>).concat("logout") });
      })
      .catch(() => this.setState({ links: ["login", "signup"] }));
  }

  componentWillUnmount(): void {
    this.unlisten();
  }

  render(): JSX.Element {
    return (
      <Layout>
        <Sider>
          <Links links={this.state.links} />
        </Sider>
        <Layout className="site-layout">
          <Content>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

interface AppProps extends RouteComponentProps<any, any, any>, React.Props<any> {}
export default withRouter(App);
