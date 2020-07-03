import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Login from "./User/Login";
import Signup from "./User/Signup";
import ProtectedRoute from "./ProtectedRoute";

export default function Routes({ routes }: { routes: Array<string> }): JSX.Element {
  const format = (path: string): string => {
    return path;
  };

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {routes.map((name: string) => {
        let Component;
        if (name === "logout") Component = loadable(() => import(`./User/Logout`));
        else Component = loadable(() => import(`./components/${name}`));
        return (
          <ProtectedRoute
            redirect="/login"
            key={name}
            path={"/" + format(name)}
            component={Component}
          />
        );
      })}
      <Redirect to="/" />
    </Switch>
  );
}
