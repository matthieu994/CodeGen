import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Menu } from "antd";

class Links extends Component<LinksProps> {
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
        {this.props.links.map((link: string) => (
          <Menu.Item key={link} style={{ margin: 0 }} id={`link-${link}`}>
            <Link to={`/${link}`}>{this.format(link)}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

interface LinksProps extends RouteComponentProps<any, any, any>, React.Props<any> {
  links: Array<string>;
}

export default withRouter(Links);
