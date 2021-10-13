import React, { useState, FocusEvent } from "react";
import cx from "classnames";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-final-form";

import BasicLayout from "components/BasicLayout/BasicLayout";
import {
  useSignup,
  UserInviteRequestBody,
  UserInviteSource
} from "services/portal";

import logo from "static/images/harness-logo.svg";
import css from "./SignUp.module.css";
import RouteDefinitions from "RouteDefinitions";
import Field from "components/Field/Field";
import { handleError } from "utils/ErrorUtils";
import { validateEmail, validatePassword } from "utils/FormValidationUtils";
import { useQueryParams } from "hooks/useQueryParams";
import { VERIFY_EMAIL_STATUS } from "pages/VerifyEmail/VerifyEmailStatus";
import { handleLoginSuccess } from "../../utils/LoginUtils";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUpCommunity: React.FC = () => {
  const history = useHistory();
  const { mutate: signup, loading } = useSignup({ source: "" });
  const {
    module,
    utm_source,
    utm_content,
    utm_medium,
    utm_term,
    utm_campaign
  } = useQueryParams<{
    module?: string;
    signupAction?: string;
    edition?: string;
    billingFrequency?: string;
    utm_source?: string;
    utm_content?: string;
    utm_medium?: string;
    utm_term?: string;
    utm_campaign?: string;
  }>();

  const handleSignup = async (data: SignUpFormData): Promise<void> => {
    const encodedEmail = encodeURIComponent(data.email);

    try {
      const signupRequestData: UserInviteRequestBody = {
        appId: "",
        lastUpdatedAt: 0,
        uuid: "",
        email: data.email,
        password: [data.password],
        intent: module,
        utmInfo: {
          utmSource: utm_source,
          utmContent: utm_content,
          utmMedium: utm_medium,
          utmTerm: utm_term,
          utmCampaign: utm_campaign
        },
        source: { type: "ONPREM" }
      };

      const handleCommunitySignup = await signup(signupRequestData);

      // handleCommunitySignup.
      // const res
      //handleLoginSuccess({ha  history: history});
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (data: SignUpFormData) => {
    data.email = data.email.toLowerCase();
    handleSignup(data);
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
        <div className={css.title}>Sign up</div>
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
              <input
                type="submit"
                value="Sign up"
                className="button primary"
                disabled={loading}
              />
            </form>
          )}
        />
        <div className={css.footer}>
          Already have an account?{" "}
          <Link to={RouteDefinitions.toSignIn()}>Sign in</Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignUpCommunity;
