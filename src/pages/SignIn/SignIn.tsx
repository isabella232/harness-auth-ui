import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useLogin } from "services/portal";

import logo from "static/images/harness-logo.svg";
import css from "./SignIn.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import { handleError } from "utils/ErrorUtils";
import { handleLoginSuccess } from "utils/LoginUtils";

const createAuthToken = (email: string, password: string): string => {
  const encodedToken = btoa(email + ":" + password);
  return `Basic ${encodedToken}`;
};

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaReponse, setCaptchaResponse] = useState<string | undefined>();
  const { mutate: login, loading } = useLogin({
    queryParams: { captcha: captchaReponse }
  });
  const captchaRef = useRef<ReCAPTCHA>(null);
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);

  useEffect(() => {
    const errorCode = urlParams.get("errorCode");
    switch (errorCode) {
      case "GATEWAY_SSO_REDIRECT_ERROR":
        toast.error(
          "Unable to sign-in using OAuth because the account is not configured with OAuth authentication."
        );
        return;
      case "unauth":
        toast.error("Current IP Address is not whitelisted.");
        return;
      case "invalidsso":
        toast.error("Invalid SSO Login.");
        return;
    }
  }, []);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await login({
        authorization: createAuthToken(formData.email, formData.password)
      });
      handleLoginSuccess(response?.resource);
    } catch (error) {
      captchaRef.current?.reset();
      setCaptchaResponse(undefined);
      const errorCode = error.data?.responseMessages?.[0]?.code;
      if (errorCode === "MAX_FAILED_ATTEMPT_COUNT_EXCEEDED") {
        setShowCaptcha(true);
      }
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
              tabIndex={-1}
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
          {showCaptcha ? (
            <ReCAPTCHA
              sitekey={window.captchaToken || ""}
              ref={captchaRef}
              onChange={(token: string | null) => {
                if (token) {
                  setCaptchaResponse(token);
                }
              }}
            />
          ) : null}
          <input
            type="submit"
            value={loading ? "Signing in..." : "Sign In"}
            className="button primary"
            disabled={loading || (showCaptcha && !captchaReponse)}
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
