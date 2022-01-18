/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import cx from "classnames";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-final-form";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useForceLoginUsingHarnessPassword } from "services/portal";
import { handleError } from "utils/ErrorUtils";
import Text from "components/Text/Text";
import { getAccountIdFromUrl, handleLoginSuccess } from "utils/LoginUtils";
import Field from "components/Field/Field";
import {
  validateEmail,
  validatePasswordRequiredOnly
} from "utils/FormValidationUtils";
import { useQueryParams } from "hooks/useQueryParams";

import logo from "static/images/harness-logo.svg";
import PasswordField from "components/Field/PasswordField";
import css from "../SignIn/SignIn.module.css";

const createAuthToken = (email: string, password: string): string => {
  const encodedToken = btoa(email + ":" + password);
  return `Basic ${encodedToken}`;
};

interface LoginFormData {
  email: string;
  password: string;
}

interface LocalLoginQueryParams {
  returnUrl?: string;
}

const LocalLogin: React.FC = () => {
  const history = useHistory();
  const { returnUrl } = useQueryParams<LocalLoginQueryParams>();
  const accountId = returnUrl ? getAccountIdFromUrl(returnUrl) : undefined;

  const { mutate: login, loading } = useForceLoginUsingHarnessPassword({
    queryParams: accountId
      ? ({
          accountId
        } as any)
      : void 0
  });

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await login({
        authorization: createAuthToken(formData.email, formData.password)
      });
      handleLoginSuccess({
        resource: response?.resource,
        history,
        selectedAccount: accountId
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicLayout>
      <div className={cx(css.signin)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} alt={"Harness"} />
          <div style={{ flex: 1 }} />
          <Link to={RouteDefinitions.toSignIn()}>
            <Text icon="leftArrow">Main sign in</Text>
          </Link>
        </div>
        <div className={css.title}>Local login</div>
        <div className={css.subtitle} />
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
                <PasswordField
                  name="password"
                  label="Password"
                  disabled={loading}
                  validate={validatePasswordRequiredOnly}
                />
                <input
                  type="submit"
                  value="Sign in"
                  className="button primary"
                  disabled={loading}
                />
              </form>
            );
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default LocalLogin;
