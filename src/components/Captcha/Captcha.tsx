import React from "react";
import Recaptcha from "react-recaptcha";

interface CaptchaProps {
  className?: string;
  onCaptchaReset?: () => void;
  onCaptchaSubmit: (response: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({
  className,
  onCaptchaSubmit,
  onCaptchaReset
}) => {
  return (
    <Recaptcha
      className={className}
      sitekey="6Lc2grEUAAAAAIpHGjcthvQ_1BnwveIAYRL-B2jM"
      render="explicit"
      expiredCallback={onCaptchaReset}
      verifyCallback={onCaptchaSubmit}
      onloadCallback={() => void 0}
    />
  );
};

export default Captcha;
