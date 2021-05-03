import React from "react";
import cx from "classnames";
import { Link, useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import RouteDefinitions from "RouteDefinitions";
import BasicLayout from "components/BasicLayout/BasicLayout";
import { useUpdatePassword } from "services/portal";

import logo from "static/images/harness-logo.svg";
import css from "../SignIn/SignIn.module.css";
import Text from "components/Text/Text";
import { handleError } from "utils/ErrorUtils";

interface UpdatePasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordParams {
  token: string;
}

export default function ResetPassword() {
  const history = useHistory();
  const { token } = useParams<ResetPasswordParams>();
  const { mutate: updatePassword, loading } = useUpdatePassword({ token });

  const handleReset = async (data: UpdatePasswordFormData) => {
    try {
      const response = await updatePassword({ password: data.password });
      if (response.resource) {
        toast("Your password has been changed");
        setTimeout(() => {
          history.push(RouteDefinitions.toSignIn());
        }, 2000);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <BasicLayout>
      <div className={cx(css.signin)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
          <div style={{ flex: 1 }}></div>
          <Link to={RouteDefinitions.toSignIn()}>
            <Text icon="leftArrow">Sign In</Text>
          </Link>
        </div>
        <div className={css.title}>Reset Password</div>
        <div className={css.subtitle}></div>
        <form
          className="layout-vertical spacing-medium"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const loginFormData = (Object.fromEntries(
              data.entries()
            ) as unknown) as UpdatePasswordFormData;
            if (
              loginFormData.password.length > 0 &&
              loginFormData.confirmPassword.length > 0
            ) {
              if (loginFormData.password === loginFormData.confirmPassword) {
                handleReset(loginFormData);
              } else {
                toast("Passwords do not match");
              }
            }
          }}
        >
          <div className="layout-vertical spacing-small">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              disabled={loading}
            />
          </div>
          <div className="layout-vertical spacing-small">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              disabled={loading}
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="button primary"
            disabled={loading}
          />
        </form>
      </div>
    </BasicLayout>
  );
}
