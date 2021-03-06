import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Users from "./Pages/Users";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn"
import Dashboard from "./Pages/Dashboard";


import { isAuthenticated } from "./contexts/auth";

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/users" component={Users} />
        <Route exact path="*" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
    
  );
};


