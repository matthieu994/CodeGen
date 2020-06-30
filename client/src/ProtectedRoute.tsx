import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import axios from "axios";
import { Spin } from "antd";

const baseURI = process.env.REACT_APP_DEV_PROXY || window.location.origin;
const client = new ApolloClient({
  uri: baseURI + "/graphql",
  request: (operation): void => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        Authorization: token ? `JWT ${token}` : "",
      },
    });
  },
});

export async function verifAuth(roles: (string | never[])[]): Promise<boolean> {
  if (!localStorage.getItem("token")) return false;

  return axios
    .post("/api/auth", { roles })
    .then((res) => {
      if (res) return true;
      return false;
    })
    .catch(() => false);
}

interface ProtectedRouteProps extends RouteProps {
  path: string;
  roles?: (string | never[])[];
  exact?: boolean;
  redirect: string;
}

class ProtectedRoute extends Route<ProtectedRouteProps> {
  state = {
    isAuth: false,
    isMounted: false,
  };

  componentDidMount(): void {
    verifAuth(this.props.roles || []).then((isAuth) => {
      this.setState({
        isMounted: true,
        isAuth,
      });
    });
  }

  render(): JSX.Element {
    const { ...rest } = this.props;

    if (this.state.isMounted && !this.state.isAuth)
      return (
        <Route
          {...this.props}
          component={(): JSX.Element => <Redirect to={{ pathname: this.props.redirect }} />}
          render={undefined}
        />
      );

    if (this.state.isMounted && this.state.isAuth)
      return (
        <ApolloProvider client={client}>
          <Route {...rest} />
        </ApolloProvider>
      );

    return (
      <div className="loading-container">
        <Spin />
      </div>
    );
  }
}

export default ProtectedRoute;
