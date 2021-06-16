import React, { FocusEvent } from "react";
import cx from "classnames";

import { Field as FinalField } from "react-final-form";

import { validateEmail, validatePassword } from "utils/FormValidationUtils";

import css from "./Field.module.css";

type validate = typeof validateEmail | typeof validatePassword;

interface FieldProps {
  name: string;
  label?: string;
  validate: validate;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  initialValue?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    name,
    label,
    validate,
    disabled,
    placeholder,
    type,
    onBlur,
    initialValue
  } = props;

  return (
    <FinalField name={name} validate={validate} initialValue={initialValue}>
      {({ input, meta }) => {
        const showError = meta.error && meta.touched;

        return (
          <div className={cx("layout-vertical spacing-small", css.field)}>
            {label ? <label>{label}</label> : null}
            <input
              {...input}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cx(showError && css["validation-outline"])}
              onBlur={onBlur}
            />
            {showError && (
              <span className={cx(css["validation-message"])}>
                {meta.error}
              </span>
            )}
          </div>
        );
      }}
    </FinalField>
  );
};

export default Field;
