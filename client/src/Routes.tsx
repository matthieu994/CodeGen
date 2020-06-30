import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Logout from "./User/Logout";
import ProtectedRoute from "./ProtectedRoute";
import routes from "./generated/routes.json";

export default function Routes(): JSX.Element {
  const format = (path: string): string => {
    return path;
  };

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      {[...new Set(Object.values(routes).flat())].map((name: string) => {
        const Component = loadable(() => import(`./components/${name}`));
        const roles =
          Object.keys(routes)
            .map((type) => (Object(routes)[type].includes(name) ? type : []))
            .filter(String) || [];
        return (
          <ProtectedRoute
            redirect="/login"
            key={name}
            path={"/" + format(name)}
            component={Component}
            roles={roles}
          ></ProtectedRoute>
        );
      })}
      <Redirect to="/" />
    </Switch>
  );
}
