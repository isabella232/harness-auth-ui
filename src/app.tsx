import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { RestfulProvider } from "restful-react";

import routes from "./RouteDefinitions";
import SignIn from "./pages/SignIn/SignIn";

function SignUp() {
  return <div>sign up</div>;
}

export function App() {
  return (
    <RestfulProvider base="/">
      <BrowserRouter>
        <Route path={routes.toSignIn()} component={SignIn} />
        <Route path={routes.toSignUp()} component={SignUp} />
      </BrowserRouter>
    </RestfulProvider>
  );
}
