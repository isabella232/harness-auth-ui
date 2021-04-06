import React from "react";
import cx from "classnames";

import Icon, { IconName, IconProps } from "components/Icon/Icon";
import css from "./Text.module.css";

interface TextProps {
  className?: string;
  icon?: IconName;
  iconProps?: Omit<IconProps, "name">;
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  icon,
  iconProps
}) => {
  return (
    <span className={cx(css.text, className)}>
      {icon ? <Icon name={icon} className={css.icon} {...iconProps} /> : null}
      {children}
    </span>
  );
};

export default Text;
