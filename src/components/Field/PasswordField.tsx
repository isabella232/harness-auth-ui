import React, { FocusEvent, useState } from "react";
import cx from "classnames";

import { Field } from "react-final-form";
import Icon from "components/Icon/Icon";
import { validatePassword } from "utils/FormValidationUtils";

import css from "./Field.module.css";

interface PasswordFieldProps {
  name: string;
  label?: string;
  validate?: typeof validatePassword;
  placeholder?: string;
  disabled?: boolean;
  initialValue?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  infoMessage?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const {
    name,
    label,
    disabled,
    validate = validatePassword,
    placeholder,
    onBlur,
    initialValue,
    infoMessage
  } = props;

  const [showPwd, setShowPwd] = useState<boolean>(false);
  const type = showPwd ? "text" : "password";

  const pwdIconName = showPwd ? "hidePwd" : "showPwd";
  return (
    <Field name={name} validate={validate} initialValue={initialValue}>
      {({ input, meta }) => {
        const showError = meta.error && meta.touched;

        return (
          <div className={cx("layout-vertical spacing-small", css.field)}>
            {label && <label>{label}</label>}
            <div className={css.pwd}>
              <input
                {...input}
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={cx(
                  showError && css["validation-outline"],
                  css.pwdInput
                )}
                onBlur={onBlur}
              />
              <Icon
                size={25}
                name={pwdIconName}
                onClick={() => {
                  setShowPwd(!showPwd);
                }}
                className={css.pwdIcon}
              />
            </div>
            {showError && (
              <span className={cx(css["validation-message"])}>
                {meta.error}
              </span>
            )}
            {infoMessage && !showError && (
              <span className={cx(css["info-message"])}>{infoMessage}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default PasswordField;
