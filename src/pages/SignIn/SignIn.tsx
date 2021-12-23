import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Form } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";

import RouteDefinitions from "RouteDefinitions";
import Field from "components/Field/Field";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useLogin } from "services/portal";

import logo from "static/images/harness-logo.svg";
import css from "./SignIn.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import { handleError } from "utils/ErrorUtils";
import { getAccountIdFromUrl, handleLoginSuccess } from "utils/LoginUtils";
import {
  validateEmail,
  validatePasswordRequiredOnly
} from "utils/FormValidationUtils";
import { useQueryParams } from "hooks/useQueryParams";
import { isCommunityPlan } from "utils/DeploymentTypeUtil";
import { useGetAuthenticationInfo } from "services/gateway";
import Spinner from "static/icons/spinner/Spinner";

const createAuthToken = (email: string, password: string): string => {
  const encodedToken = btoa(email + ":" + password);
  return `Basic ${encodedToken}`;
};

interface LoginFormData {
  email: string;
  password: string;
}

interface SignInQueryParams {
  returnUrl?: string;
  errorCode?: string;
}

const SignIn: React.FC = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaReponse, setCaptchaResponse] = useState<string | undefined>();
  const { mutate: login, loading } = useLogin({});
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { returnUrl, errorCode } = useQueryParams<SignInQueryParams>();
  const history = useHistory();
  const {
    data,
    loading: loadingAuthInfo,
    refetch: getAuthenticationInfo
  } = useGetAuthenticationInfo({ lazy: true }); // this gets called only for vanity URLs

  const authenticationInfo = data?.resource;
  const accountId =
    getAccountIdFromUrl(returnUrl) || // get from returnUrl if present
    authenticationInfo?.accountId || // get from authInfo for vanity url if present
    undefined; // default to no accountId

  // if expectedHostname is defined, and not equal to current hostname, we are on vanity URL
  const isVanity = !!(
    window.expectedHostname &&
    window.expectedHostname !== "" &&
    window.location.hostname !== window.expectedHostname
  );

  // easy-to-access derived flags for different auth mechanisms, used only for Vanity URL customers
  const hideUsernamePasswordForm = !!(
    isVanity &&
    authenticationInfo &&
    authenticationInfo.authenticationMechanism !== "USER_PASSWORD" &&
    authenticationInfo.authenticationMechanism !== "LDAP"
  );

  const hideOauth = !!(
    isVanity &&
    authenticationInfo &&
    !authenticationInfo.oauthEnabled
  );

  const hideSSO = !!(
    isVanity &&
    authenticationInfo &&
    authenticationInfo.authenticationMechanism !== "SAML"
  );

  // redirect to SAML IDP if vanity URL and authMechanism is SAML
  useEffect(() => {
    if (!isVanity) return;

    if (
      authenticationInfo &&
      authenticationInfo.authenticationMechanism === "SAML" &&
      authenticationInfo.samlRedirectUrl
    ) {
      window.location.href = authenticationInfo.samlRedirectUrl;
    }
  }, [authenticationInfo]);

  // this runs once on first mount
  useEffect(() => {
    if (returnUrl) {
      // save returnUrl for SAML flow
      sessionStorage.setItem("returnUrl", returnUrl);
    } else {
      // clearing sessionStorage in case previous login was cancelled
      sessionStorage.removeItem("returnUrl");
    }

    if (isVanity) {
      // call gateway to find with auth mechanisms are enabled for this vanity url
      getAuthenticationInfo();
    }

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
      case "email_verify_fail":
        toast.error(
          "Email verification failed. Please sign in to resend the email."
        );
        return;
      case "INVITE_EXPIRED":
        toast.error(
          "This invitation URL has expired. Please request for a new invitation from your admin."
        );
        return;
      case "INVITE_INVALID":
        toast.error(
          "We couldn’t find an invitation matching the email address you entered. Please search your email for an invitation from Harness or contact your admin."
        );
        return;
    }
  }, []);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await login(
        {
          authorization: createAuthToken(formData.email, formData.password)
        },
        {
          queryParams: {
            captcha: captchaReponse,
            accountId: accountId
          }
        }
      );
      handleLoginSuccess({
        resource: response?.resource,
        history,
        selectedAccount: accountId
      });
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
          <img src={logo} width={120} className={css.logo} alt={"Harness"} />
        </div>
        <div className={css.title}>Sign in</div>
        <div className={css.subtitle}>and get ship done.</div>
        {loadingAuthInfo ? (
          <div className={css.center}>
            <Spinner />
          </div>
        ) : (
          <>
            {!hideUsernamePasswordForm ? (
              <Form
                onSubmit={handleLogin}
                render={({ handleSubmit }) => {
                  return (
                    <form
                      className="layout-vertical spacing-medium"
                      onSubmit={handleSubmit}
                    >
                      <Field
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="email@work.com"
                        disabled={loading}
                        validate={validateEmail}
                      />
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
                          Forgot password?
                        </Link>
                        <Field
                          name="password"
                          type="password"
                          disabled={loading}
                          validate={validatePasswordRequiredOnly}
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
                        value={loading ? "Signing in..." : "Sign in"}
                        className="button primary"
                        disabled={loading || (showCaptcha && !captchaReponse)}
                      />
                    </form>
                  );
                }}
              />
            ) : null}
            <AuthFooter
              page={AuthPage.SignIn}
              accountId={accountId}
              hideSeparator={hideUsernamePasswordForm}
              hideOAuth={isCommunityPlan() || hideOauth}
              hideSSO={isCommunityPlan() || hideSSO}
              isVanity={isVanity}
              enabledOauthProviders={
                isVanity ? authenticationInfo?.oauthProviders : undefined
              }
            />
            {window.signupExposed === "true" || __DEV__ ? (
              <div className={css.footer}>
                No account?{" "}
                <Link to={RouteDefinitions.toSignUp()}>Sign up</Link>
              </div>
            ) : null}
          </>
        )}
      </div>
    </BasicLayout>
  );
};

export default SignIn;
