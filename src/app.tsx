import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import { RestfulProvider } from "restful-react";
import { Toaster } from "react-hot-toast";

import routes from "./RouteDefinitions";
import SignIn from "./pages/SignIn/SignIn";
import SSOSignIn from "./pages/SSOSignIn/SSOSignIn";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function SignUp() {
  return <div>sign up</div>;
}

export function App() {
  return (
    <RestfulProvider base="/">
      <HashRouter>
        <Route path={routes.toSignIn()} component={SignIn} />
        <Route path={routes.toSignUp()} component={SignUp} />
        <Route path={routes.toForgotPassword()} component={ForgotPassword} />
        <Route path={routes.toResetPassword()} component={ResetPassword} />
        <Route path={routes.toSSOSignIn()} component={SSOSignIn} />
        <Route path="/" exact>
          <Redirect to={routes.toSignIn()} />
        </Route>
      </HashRouter>
      <Toaster />
    </RestfulProvider>
  );
}
