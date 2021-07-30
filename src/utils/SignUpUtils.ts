import type { UserInfo } from "services/ng";
import SecureStorage from "./SecureStorage";

export async function handleSignUpSuccess(resource?: UserInfo): Promise<void> {
  const baseUrl = window.location.pathname.replace("auth/", "");

  if (resource) {
    const intent = resource.intent;
    SecureStorage.setItem("token", resource.token);
    SecureStorage.setItem("uuid", resource.uuid);
    SecureStorage.setItem("acctId", resource.defaultAccountId);
    SecureStorage.setItem("lastTokenSetTime", +new Date());

    if (intent) {
      switch (intent.toUpperCase()) {
        case "CE":
          window.location.href = `${baseUrl}#/account/${resource.defaultAccountId}/continuous-efficiency/settings?source=signup`;
          break;
        case "CD":
          window.location.href = `${baseUrl}#/account/${resource.defaultAccountId}/onboarding`;
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

interface SignupUrlParams {
  module: string | null;
}

export function getSignupUrlParams(): SignupUrlParams {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);
  return {
    module: urlParams?.get("module")
  };
}

export function getSignupHeaders(): HeadersInit {
  const retHeaders: RequestInit["headers"] = {
    "content-type": "application/json"
  };

  const token = SecureStorage.getItem("token");
  if (token && token.length > 0) {
    retHeaders.Authorization = `Bearer ${token}`;
  }

  return retHeaders;
}
