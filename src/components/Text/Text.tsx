/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
