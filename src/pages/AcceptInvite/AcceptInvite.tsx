import React from "react";
import cx from "classnames";
import { Form } from "react-final-form";
import { useQueryParams } from "hooks/useQueryParams";

import { useCompleteInviteAndSignIn1 } from "services/portal";
import { handleError } from "utils/ErrorUtils";
import BasicLayout from "components/BasicLayout/BasicLayout";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import Field from "components/Field/Field";
import {
  validateEmail,
  validateName,
  validatePassword
} from "utils/FormValidationUtils";

import logo from "static/images/harness-logo.svg";
import css from "./AcceptInvite.module.css";
import { handleLoginSuccess } from "utils/LoginUtils";

interface AcceptInviteFormData {
  name: string;
  email: string;
  password: string;
}

interface AcceptInviteQueryParams {
  token?: string;
  accountId?: string;
}

const SignUp: React.FC = () => {
  const {
    token = "",
    accountId = ""
  } = useQueryParams<AcceptInviteQueryParams>();

  const {
    mutate: completeInviteAndSignIn,
    loading
  } = useCompleteInviteAndSignIn1({ queryParams: { accountId } });

  const handleInvite = async (data: AcceptInviteFormData) => {
    try {
      const response = await completeInviteAndSignIn({
        accountId,
        token,
        email: data.email,
        password: data.password,
        name: data.name
      });

      handleLoginSuccess(response.resource);
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (data: AcceptInviteFormData) => {
    handleInvite(data);
  };

  return (
    <BasicLayout>
      <div className={cx(css.signup)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
        </div>
        <div className={css.title}>Accept Invite</div>
        <div className={css.subtitle}>and get ship done.</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              className="layout-vertical spacing-medium"
              onSubmit={handleSubmit}
            >
              <Field
                name="name"
                label="Name"
                placeholder="John Doe"
                disabled={loading}
                validate={validateName}
              />
              <Field
                name="email"
                label={"Email"}
                placeholder="email@work.com"
                disabled={loading}
                validate={validateEmail}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                disabled={loading}
                validate={validatePassword}
              />
              <input
                type="submit"
                value="Accept Invite"
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
