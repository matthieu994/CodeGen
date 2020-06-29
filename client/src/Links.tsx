import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Menu } from "antd";

class Links extends Component<LinksProps> {
  private unlisten: Function;

  state = {
    links: [],
  };

  constructor(props: LinksProps) {
    super(props);
    this.unlisten = () => null;
  }

  componentDidMount(): void {
    this.getLinks();
    this.unlisten = this.props.history.listen(() => {
      this.getLinks();
    });
  }

  getLinks(): void {
    axios
      .post("/api/auth/links")
      .then((res) => {
        if (res)
          return this.setState({ links: (res.data.links as Array<string>).concat("logout") });
      })
      .catch(() => this.setState({ links: ["login", "signup"] }));
  }

  componentWillUnmount(): void {
    this.unlisten();
  }

  format(path: string): string {
    return (path.charAt(0).toUpperCase() + path.slice(1))
      .replace("_", " ")
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

  render(): JSX.Element {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[this.props.location.pathname.slice(1)]}
      >
        {this.state.links.map((link: string) => (
          <Menu.Item key={link} style={{ margin: 0 }} id={`link-${link}`}>
            <Link to={`/${link}`}>{this.format(link)}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

interface LinksProps extends RouteComponentProps<any, any, any>, React.Props<any> {}

export default withRouter(Links);
