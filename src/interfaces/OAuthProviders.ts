import type { IconName } from "components/Icon/Icon";

export interface OAuthProviderType {
  type: string;
  name: string;
  url: string;
  iconName: IconName;
}

export const OAuthProviders: OAuthProviderType[] = [
  {
    type: "GITHUB",
    name: "Github",
    url: "oauth2Redirect?provider=github",
    iconName: "github"
  },
  {
    type: "BITBUCKET",
    name: "Bitbucket",
    url: "oauth2Redirect?provider=bitbucket",
    iconName: "bitbucket"
  },
  {
    type: "GITLAB",
    name: "GitLab",
    url: "oauth2Redirect?provider=gitlab",
    iconName: "gitlab"
  },
  {
    type: "LINKEDIN",
    name: "LinkedIn",
    url: "oauth2Redirect?provider=linkedin",
    iconName: "linkedin"
  },
  {
    type: "GOOGLE",
    name: "Google",
    url: "oauth2Redirect?provider=google",
    iconName: "google"
  },
  {
    type: "AZURE",
    name: "Azure",
    url: "oauth2Redirect?provider=azure",
    iconName: "azure"
  }
];

export const URLS = {
  OAUTH: `${location.protocol}//${location.host}/gateway/`,
  FREE_TRIAL: "https://harness.io/thanks-freetrial-p/",
  PRIVACY_AGREEMENT: "https://harness.io/privacy/",
  SUBSCRIPTION_TERMS: "https://harness.io/subscriptionterms/"
};
