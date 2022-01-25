import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./Pages/Users";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn"
import SingnUp from "./Pages/SignUp";

import { Context } from './Context/AuthContext'

function CustomRoute({ isPrivate, ...rest}) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>
  }


  if (isPrivate && !authenticated) {
    return <Redirect to="/" />
  }

  return <Route { ...rest} />;
}

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SingnUp} />
        <CustomRoute exact isPrivate path="/users" component={Users} />
        <Route exact  path="*" component={ErrorPage} />
    </Switch>
  );
};


