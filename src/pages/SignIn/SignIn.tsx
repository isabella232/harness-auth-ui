import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import AppStorage from "utils/AppStorage";
import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useLogin } from "services/portal";
// import { useQueryParams } from "hooks/useQueryParams";

import logo from "static/images/harness-logo.svg";
import css from "./SignIn.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
// import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";

const createAuthToken = (email: string, password: string): string => {
  const encodedToken = btoa(email + ":" + password);
  return `Basic ${encodedToken}`;
};

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { mutate: login, loading } = useLogin({});
  // const { returnUrl } = useQueryParams<{ returnUrl?: string }>();

  const handleLogin = async (formData: LoginFormData) => {
    const response = await login({
      authorization: createAuthToken(formData.email, formData.password)
    });
    if (response) {
      const { resource } = response;
      if (resource) {
        AppStorage.set("token", resource.token);
        AppStorage.set("acctId", resource.defaultAccountId);
        AppStorage.set("lastTokenSetTime", +new Date());

        const experience = resource.accounts?.find(
          (account) => account.uuid === resource.defaultAccountId
        )?.defaultExperience;
        switch (experience) {
          case "NG":
            window.location.href = `/ng/#/account/${resource.defaultAccountId}/projects`;
            return;
          case "CG":
          default:
            window.location.href = `/#/account/${resource.defaultAccountId}/dashboard`;
            return;
        }
      }
    }
  };

  return (
    <BasicLayout>
      <div className={cx(css.signin)}>
        <img src={logo} width={120} className={css.logo} />
        <div className={css.title}>Sign In</div>
        <div className={css.subtitle}>and get ship done.</div>
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
        <AuthFooter page={AuthPage.SignIn} />
        <div className={css.footer}>
          No account? <Link to={RouteDefinitions.toSignUp()}>Get Started</Link>
        </div>
      </div>
    </BasicLayout>
  );
}
