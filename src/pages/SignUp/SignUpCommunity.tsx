/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import cx from "classnames";
import { Form } from "react-final-form";

import BasicLayout from "components/BasicLayout/BasicLayout";

import logo from "static/images/harness-logo.svg";
import css from "./SignUp.module.css";
import Field from "components/Field/Field";
import { handleError } from "utils/ErrorUtils";
import { validateEmail } from "utils/FormValidationUtils";
import { useQueryParams } from "hooks/useQueryParams";
import PasswordField from "components/Field/PasswordField";
import { SignupDTO, useCommunitySignup } from "../../services/ng";
import { handleSignUpSuccess } from "../../utils/SignUpUtils";
import { URLS } from "../../interfaces/OAuthProviders";
import { Link } from "react-router-dom";
import RouteDefinitions from "../../RouteDefinitions";
import Text from "../../components/Text/Text";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUpCommunity: React.FC = () => {
  const { mutate: signup, loading } = useCommunitySignup({});
  const { module } = useQueryParams<{
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
    try {
      const signupRequestData: SignupDTO = {
        email: data.email,
        password: data.password,
        intent: module,
        edition: "COMMUNITY",
        signupAction: "REGULAR"
      };

      const handleCommunitySignup = await signup(signupRequestData);
      if (handleCommunitySignup.resource) {
        handleCommunitySignup.resource.intent = "COMMUNITY";
      }
      handleSignUpSuccess(handleCommunitySignup?.resource);
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
    <PasswordField
      name="password"
      label="Password"
      placeholder="Password"
      disabled={loading}
    />
  );

  return (
    <BasicLayout>
      <div className={cx(css.signup)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
          <div style={{ flex: 1 }} />
          <Link to={RouteDefinitions.toSignIn()}>
            <Text icon="leftArrow">Sign in</Text>
          </Link>
        </div>
        <div className={css.title}>Welcome to Harness CD Community Edition</div>
        <div className={css.communitySubtitle}>Set up an admin user</div>
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
                value="Create user"
                className="button primary"
                disabled={loading}
              />
            </form>
          )}
        />
        <div className={cx(css.disclaimer)}>
          By registering, you agree to our&nbsp;
          <a
            className={css.externalLink}
            href={URLS.PRIVACY_AGREEMENT}
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy&nbsp;
          </a>
          and our&nbsp;
          <a
            className={css.externalLink}
            href={URLS.SUBSCRIPTION_TERMS}
            rel="noreferrer"
            target="_blank"
          >
            Terms of Use.&nbsp;
          </a>
          See our&nbsp;
          <a
            className={css.externalLink}
            href={URLS.COMMUNITY_DOCUMENTATION}
            rel="noreferrer"
            target="_blank"
          >
            documentation&nbsp;
          </a>
          to learn more about how we process your data.
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignUpCommunity;
