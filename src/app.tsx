import Router, { Route } from "preact-router";
import { createHashHistory } from "history";

import SignIn from "./pages/SignIn/SignIn";

const Temp = () => {
  return <div>hello again</div>;
};

export function App() {
  return (
    <Router history={createHashHistory() as any}>
      <Route path="/" component={SignIn} />
      <Route path="/hello" component={Temp} />
    </Router>
  );
}
