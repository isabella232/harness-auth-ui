/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import type { UserInfo, GatewayAccountRequestDTO } from "services/ng";
import telemetry from "telemetry/Telemetry";
import SecureStorage from "./SecureStorage";
import { getUTMInfoParams } from "./TrackingUtils";

function createDefaultExperienceMap(
  accounts: GatewayAccountRequestDTO[]
): void {
  // create map of { accountId: defaultExperience } from accounts list and store in LS for root redirect
  const defaultExperienceMap = accounts.reduce((previousValue, account) => {
    if (account.uuid) {
      return {
        ...previousValue,
        [account.uuid]: account.defaultExperience
      };
    }
    return { ...previousValue };
  }, {});
  SecureStorage.setItem("defaultExperienceMap", defaultExperienceMap);
}

export async function handleSignUpSuccess(resource?: UserInfo): Promise<void> {
  const baseUrl = window.location.pathname.replace("auth/", "");

  if (resource) {
    const intent = resource.intent;
    SecureStorage.setItem("token", resource.token);
    SecureStorage.setItem("uuid", resource.uuid);
    SecureStorage.setItem("acctId", resource.defaultAccountId);
    SecureStorage.setItem("email", resource.email);
    SecureStorage.setItem("lastTokenSetTime", new Date().getTime());

    // send identify user event to telemetry to update the identity
    telemetry.identify(resource.email || "");

    if (resource.accounts) createDefaultExperienceMap(resource.accounts);

    if (intent) {
      switch (intent.toUpperCase()) {
        case "COMMUNITY":
          window.location.href = `${baseUrl}ng/#/account/${resource.defaultAccountId}/CD/home?experience=COMMUNITY`;
          break;
        default:
          window.location.href = `${baseUrl}ng/#/account/${resource.defaultAccountId}/${intent}/home?source=signup`;
          break;
      }
    } else {
      window.location.href = `${baseUrl}ng/#/account/${resource.defaultAccountId}/purpose?source=signup`;
    }
  }
}

export enum SignupAction {
  REGULAR = "REGULAR",
  TRIAL = "TRIAL",
  SUBSCRIBE = "SUBSCRIBE"
}

export enum Edition {
  FREE = "FREE",
  TEAM = "TEAM",
  ENTERPRISE = "ENTERPRISE"
}

export enum BillingFrequency {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
}

export function getLicenseParams(urlParams?: URLSearchParams): string {
  const signupAction = urlParams?.get("signupAction");
  const signupParam =
    signupAction && signupAction.toUpperCase() in SignupAction
      ? `&signupAction=${signupAction.toUpperCase()}`
      : "";

  const edition = urlParams?.get("edition");
  const editionParam =
    edition && edition.toUpperCase() in Edition
      ? `&edition=${edition.toUpperCase()}`
      : "";

  const billingFrequency = urlParams?.get("billingFrequency");
  const billingFrequencyParam =
    billingFrequency && billingFrequency.toUpperCase() in BillingFrequency
      ? `&billingFrequency=${billingFrequency.toUpperCase()}`
      : "";

  return `${signupParam}${editionParam}${billingFrequencyParam}`;
}

export function getSignupQueryParams(): string {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);

  const module = urlParams?.get("module");
  const moduleParam = module ? `&module=${module}` : "";

  const licenseParams = getLicenseParams(urlParams);

  const utmInfoParams = getUTMInfoParams(urlParams);

  return `&action=signup&isNG=true${moduleParam}${licenseParams}${utmInfoParams}`;
}
