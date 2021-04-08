import React, { useState } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useLogin } from "services/portal";
// import { useQueryParams } from "hooks/useQueryParams";

import logo from "static/images/harness-logo.svg";
import css from "./SignIn.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import Captcha from "components/Captcha/Captcha";
import { handleError } from "utils/ErrorUtils";
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

const SignIn: React.FC = () => {
  const { mutate: login, loading } = useLogin({});
  const [showCaptcha] = useState(false);
  // const { returnUrl } = useQueryParams<{ returnUrl?: string }>();

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await login({
        authorization: createAuthToken(formData.email, formData.password)
      });
      handleLoginSuccess(response?.resource);
    } catch (error) {
      // if (error.showCaptcha) setShowCaptcha(true)
      handleError(error);
    }
  };

  return (
    <BasicLayout>
      <div className={cx(css.signin)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
        </div>
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
              type="email"
              id="email"
              placeholder="email@work.com"
              disabled={loading}
            />
          </div>
          <div
            className="layout-vertical spacing-small"
            style={{ position: "relative" }}
          >
            <label htmlFor="password">Password</label>
            <Link
              to={RouteDefinitions.toForgotPassword()}
              className={css.forgotLink}
            >
              Forgot Password?
            </Link>
            <input
              name="password"
              id="password"
              type="password"
              disabled={loading}
            />
          </div>
          {showCaptcha ? <Captcha onCaptchaSubmit={() => void 0} /> : null}
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
};

export default SignIn;
