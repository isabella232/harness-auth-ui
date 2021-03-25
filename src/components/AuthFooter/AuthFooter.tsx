import {
  OAuthProviders,
  OAuthProviderType,
  URLS
} from "interfaces/OAuthProviders";
import React from "react";

import css from "./AuthFooter.module.css";

export enum AuthPage {
  SignIn,
  SignUp
}

interface AuthFooterProps {
  page: AuthPage;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ page }) => {
  return (
    <>
      <h2 className={css.lineMessage}>
        <span className={css.message}>
          {page === AuthPage.SignUp ? "Sign Up" : "Sign In"}
        </span>
      </h2>

      <div>
        <div className="layout-horizontal spacing-auto">
          {OAuthProviders.map((oAuthProvider: OAuthProviderType) => {
            const { iconName, type, url } = oAuthProvider;

            const link = `${URLS.OAUTH}api/users/${url}`;

            return (
              <a
                className={css.iconContainer}
                key={type}
                href={link}
                rel="noreferrer"
                target="_blank"
              >
                icon
              </a>
            );
          })}
        </div>
        {page === AuthPage.SignUp ? (
          <div className={css.disclaimer}>
            disclaimer
            <a
              className={css.externalLink}
              href={URLS.PRIVACY_AGREEMENT}
              rel="noreferrer"
              target="_blank"
            >
              privacy
            </a>
            middle
            <a
              className={css.externalLink}
              href={URLS.SUBSCRIPTION_TERMS}
              rel="noreferrer"
              target="_blank"
            >
              terms
            </a>
          </div>
        ) : (
          <button className={css.ssoButton}>sso</button>
        )}
      </div>
    </>
  );
};

export default AuthFooter;
