import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export default function Logout(): JSX.Element {
  localStorage.removeItem("token");
  Axios.post("/api/logout");
  return <Redirect to="/" />;
}
