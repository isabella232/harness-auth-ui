import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useForceLoginUsingHarnessPassword } from "services/portal";
// import { useQueryParams } from "hooks/useQueryParams";

import logo from "static/images/harness-logo.svg";
import css from "../SignIn/SignIn.module.css";
import { handleError } from "utils/ErrorUtils";
import Text from "components/Text/Text";
import { handleLoginSuccess } from "utils/LoginUtils";
// import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";

const createAuthToken = (email: string, password: string): string => {
  const encodedToken = btoa(email + ":" + password);
  return `Basic ${encodedToken}`;
};

interface LoginFormData {
  email: string;
  password: string;
}

const LocalLogin: React.FC = () => {
  const { mutate: login, loading } = useForceLoginUsingHarnessPassword({});
  // const { returnUrl } = useQueryParams<{ returnUrl?: string }>();

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await login({
        authorization: createAuthToken(formData.email, formData.password)
      });
      handleLoginSuccess(response?.resource);
    } catch (error) {
      handleError(error);
    }
  };

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
        <div className={css.title}>Local Login</div>
        <div className={css.subtitle}></div>
        <form
          className="layout-vertical spacing-medium"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const loginFormData = (Object.fromEntries(
              data.entries()
            ) as unknown) as LoginFormData;
            if (
              loginFormData.email.length > 0 &&
              loginFormData.password.length > 0
            ) {
              handleLogin(loginFormData);
            }
          }}
        >
          <div className="layout-vertical spacing-small">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="email@work.com"
              disabled={loading}
            />
          </div>
          <div className="layout-vertical spacing-small">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              disabled={loading}
            />
          </div>
          <input
            type="submit"
            value="Sign In"
            className="button primary"
            disabled={loading}
          />
        </form>
      </div>
    </BasicLayout>
  );
};

export default LocalLogin;
