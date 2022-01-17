/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { IconName } from "components/Icon/Icon";
import type { AuthenticationInfo } from "services/gateway";

export type OAuthProvider = Required<AuthenticationInfo>["oauthProviders"][0];

export interface OAuthProviderType {
  type: OAuthProvider;
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
  SUBSCRIPTION_TERMS: "https://harness.io/subscriptionterms/",
  COMMUNITY_DOCUMENTATION:
    "https://ngdocs.harness.io/article/yhyyq0v0y4-harness-community-edition-overview"
};
