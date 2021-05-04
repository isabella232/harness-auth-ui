import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import { RestfulProvider } from "restful-react";
import { Toaster } from "react-hot-toast";

import routes from "./RouteDefinitions";
import SignUp from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";
import LocalLogin from "./pages/LocalLogin/LocalLogin";
import SSOSignIn from "./pages/SSOSignIn/SSOSignIn";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth/TwoFactorAuth";

export function App() {
  return (
    <RestfulProvider
      base={window.location.pathname.replace("auth/", "") + "gateway/api/"}
    >
      <HashRouter>
        <Route path={routes.toSignIn()} component={SignIn} />
        <Route path={routes.toLocalLogin()} component={LocalLogin} />
        <Route path={routes.toSignUp()} component={SignUp} />
        <Route path={routes.toForgotPassword()} component={ForgotPassword} />
        <Route path={routes.toResetPassword()} component={ResetPassword} />
        <Route path={routes.toSSOSignIn()} component={SSOSignIn} />
        <Route path={routes.toTwoFactorAuth()} component={TwoFactorAuth} />
        <Route path="/" exact>
          <Redirect to={routes.toSignIn()} />
        </Route>
      </HashRouter>
      <Toaster />
    </RestfulProvider>
  );
}
