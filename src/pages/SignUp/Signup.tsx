import React from "react";
import cx from "classnames";

import BasicLayout from "components/BasicLayout/BasicLayout";
import { useSignup } from "services/ng";

import logo from "static/images/harness-logo.svg";
import css from "./SignUp.module.css";
import AuthFooter, { AuthPage } from "components/AuthFooter/AuthFooter";
import { handleError } from "utils/ErrorUtils";
import { handleSignUpSuccess } from "utils/SignUpUtils";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // TODO: Implement captcha in the back end
  // const [showCaptcha, setShowCaptcha] = useState(false);
  // const [captchaReponse, setCaptchaResponse] = useState<string | undefined>();

  const { mutate: signup, loading } = useSignup({});
  // const captchaRef = useRef<Recaptcha>(null);

  const handleSignup = async (data: SignUpFormData): Promise<void> => {
    const { email, password } = data;

    const signupData: SignUpFormData = {
      email,
      password
    };

    try {
      const userInfo = await signup(signupData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleSignUpSuccess(userInfo.resource);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicLayout>
      <div className={cx(css.signup)}>
        <div className={css.header}>
          <img src={logo} width={120} className={css.logo} />
        </div>
        <div className={css.title}>Sign Up</div>
        <div className={css.subtitle}>and get ship done.</div>
        <form
          className="layout-vertical spacing-medium"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const signupFormData = (Object.fromEntries(
              data.entries()
            ) as unknown) as SignUpFormData;
            if (
              signupFormData.email.length > 0 &&
              signupFormData.password.length > 0
            ) {
              handleSignup(signupFormData);
            }
          }}
        >
          <div className="layout-vertical spacing-small">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="email@work.com"
              disabled={loading}
            />
          </div>
          <div
            className="layout-vertical spacing-small"
            style={{ position: "relative" }}
          >
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              disabled={loading}
            />
          </div>
          {/* {showCaptcha ? (
            <Recaptcha
              sitekey="6Lc2grEUAAAAAIpHGjcthvQ_1BnwveIAYRL-B2jM"
              render="explicit"
              ref={captchaRef}
              verifyCallback={(_captchaResponse: string) => {
                setCaptchaResponse(_captchaResponse);
              }}
              onloadCallback={() => void 0}
            />
          ) : null} */}
          <input
            type="submit"
            value="Sign Up"
            className="button primary"
            disabled={loading}
            // disabled={loading || (showCaptcha && !captchaReponse)}
          />
        </form>
        <AuthFooter page={AuthPage.SignUp} />
      </div>
    </BasicLayout>
  );
};

export default SignUp;
