import React from "react";

import azure from "static/icons/azure.svg";
import bitbucket from "static/icons/bitbucket.svg";
import github from "static/icons/github.svg";
import gitlab from "static/icons/gitlab.svg";
import google from "static/icons/google.svg";
import linkedin from "static/icons/linkedin.svg";
import sso from "static/icons/sso.svg";

export type IconName =
  | "azure"
  | "bitbucket"
  | "github"
  | "gitlab"
  | "google"
  | "linkedin"
  | "sso";

interface IconProps {
  name: IconName;
  height?: number;
  width?: number;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  height,
  width,
  size = 16,
  className
}) => {
  const finalHeight = height || size;
  const finalWidth = width || size;

  switch (name) {
    case "azure":
      return (
        <img
          src={azure}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "bitbucket":
      return (
        <img
          src={bitbucket}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "github":
      return (
        <img
          src={github}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "gitlab":
      return (
        <img
          src={gitlab}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "google":
      return (
        <img
          src={google}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "linkedin":
      return (
        <img
          src={linkedin}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
    case "sso":
      return (
        <img
          src={sso}
          height={finalHeight}
          width={finalWidth}
          className={className}
        />
      );
  }
};

export default Icon;
