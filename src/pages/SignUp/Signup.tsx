import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { Form } from "react-final-form";
import Recaptcha from "react-recaptcha";

import BasicLayout from "components/BasicLayout/BasicLayout";
import { useSignup } from "services/ng";

import logo from "static/images/harness-logo.svg";
import css from "./SignUp.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import Field from "components/Field/Field";
import { handleError } from "utils/ErrorUtils";
import { handleSignUpSuccess } from "utils/SignUpUtils";
import { validateEmail, validatePassword } from "utils/FormValidationUtils";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const { mutate: signup, loading } = useSignup({});
  const captchaRef = useRef<Recaptcha>(null);

  useEffect(() => {
    const { email, password } = signupData;

    if (email && password && captchaToken) {
      handleSignup(signupData, captchaToken);
    }
  }, [captchaToken]);

  const handleSignup = async (
    data: SignUpFormData,
    captchaToken: string
  ): Promise<void> => {
    try {
      const userInfo = await signup(data, {
        queryParams: { captchaToken: captchaToken }
      });
      handleSignUpSuccess(userInfo.resource);
    } catch (error) {
      captchaRef.current?.reset();

      handleError(error);
    }
  };

  const onSubmit = (data: SignUpFormData) => {
    captchaRef.current?.execute();
    setSignupData(data);
  };

  const emailField = (
    <Field
      name="email"
      label={"Email"}
      placeholder="email@work.com"
      disabled={loading}
      validate={validateEmail}
    />
  );

  const passwordField = (
    <Field
      name="password"
      label="Password"
      type="password"
      placeholder="Password"
      disabled={loading}
      validate={validatePassword}
    />
  );

  return (
    <BasicLayout>
      <div className={cx(css.signup)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
        </div>
        <div className={css.title}>Sign Up</div>
        <div className={css.subtitle}>and get ship done.</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              className="layout-vertical spacing-medium"
              onSubmit={handleSubmit}
            >
              {emailField}
              {passwordField}
              <Recaptcha
                sitekey={window.captchaToken || ""}
                size="invisible"
                ref={captchaRef}
                verifyCallback={(captchaToken: string) => {
                  setCaptchaToken(captchaToken);
                }}
              />
              <input
                type="submit"
                value="Sign Up"
                className="button primary"
                disabled={loading}
              />
            </form>
          )}
        />
        <AuthFooter page={AuthPage.SignUp} />
      </div>
    </BasicLayout>
  );
};

export default SignUp;
