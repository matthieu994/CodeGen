import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Logout from "./User/Logout";
import ProtectedRoute from "./ProtectedRoute";
import AdCampaign from "./components/AdCampaign";
import AlgoScoring from "./components/AlgoScoring";
import Brand from "./components/Brand";
import Company from "./components/Company";
import Product from "./components/Product";
import Report from "./components/Report";
import ReportEvent from "./components/ReportEvent";
import Screen from "./components/Screen";
import Shop from "./components/Shop";
import Ticket from "./components/Ticket";
import TicketScanner from "./components/TicketScanner";
import Viewer from "./components/Viewer";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      <ProtectedRoute redirect="/login" path="/ad_campaign" component={AdCampaign} />
      <ProtectedRoute redirect="/login" path="/algo_scoring" component={AlgoScoring} />
      <ProtectedRoute redirect="/login" path="/brand" component={Brand} />
      <ProtectedRoute redirect="/login" path="/company" component={Company} />
      <ProtectedRoute redirect="/login" path="/product" component={Product} />
      <ProtectedRoute redirect="/login" path="/report" component={Report} />
      <ProtectedRoute redirect="/login" path="/report_event" component={ReportEvent} />
      <ProtectedRoute redirect="/login" path="/screen" component={Screen} />
      <ProtectedRoute redirect="/login" path="/shop" component={Shop} />
      <ProtectedRoute redirect="/login" path="/ticket" component={Ticket} />
      <ProtectedRoute redirect="/login" path="/ticket_scanner" component={TicketScanner} />
      <ProtectedRoute redirect="/login" path="/viewer" component={Viewer} />
      <Redirect to="/" />
    </Switch>
  );
}
