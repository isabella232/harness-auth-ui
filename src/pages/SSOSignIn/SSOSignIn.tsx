import React from "react";
import cx from "classnames";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";

import logo from "static/images/harness-logo.svg";
import css from "../SignIn/SignIn.module.css";
import { Link } from "react-router-dom";
import Icon from "components/Icon/Icon";
import Text from "components/Text/Text";

interface SSOFormData {
  email: string;
}

export default function SSOSignIn() {
  return (
    <BasicLayout>
      <div className={cx(css.signin)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
          <div style={{ flex: 1 }}></div>
          <Link to={RouteDefinitions.toSignIn()}>
            <Text icon="leftArrow">Main Sign In</Text>
          </Link>
        </div>
        <div className={css.title}>
          Sign In with an <br />
          SSO Identity Provider
        </div>
        <div className={css.subtitle}>and get ship done.</div>
        <form
          className="layout-vertical spacing-medium"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const loginFormData = (Object.fromEntries(
              data.entries()
            ) as unknown) as SSOFormData;
            if (loginFormData.email.length > 0) {
              // todo
            }
          }}
        >
          <div className="layout-vertical spacing-small">
            <label htmlFor="email">Work Email</label>
            <input name="email" id="email" placeholder="email@work.com" />
          </div>
          <input type="submit" value="Sign In" className="button primary" />
        </form>
      </div>
    </BasicLayout>
  );
}
