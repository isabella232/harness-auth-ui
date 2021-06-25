import type { UserInfo } from "services/ng";
import AppStorage from "utils/AppStorage";

export async function handleSignUpSuccess(resource?: UserInfo): Promise<void> {
  const { module } = getSignupUrlParams();
  const baseUrl = window.location.pathname.replace("auth/", "");

  if (resource) {
    AppStorage.set("token", resource.token);
    AppStorage.set("uuid", resource.uuid);
    AppStorage.set("acctId", resource.defaultAccountId);
    AppStorage.set("lastTokenSetTime", +new Date());

    if (module) {
      switch (module.toUpperCase()) {
        case "CE":
          window.location.href = `${baseUrl}#/account/${resource.defaultAccountId}/continuous-efficiency/settings?source=signup`;
          break;
        case "CD":
          window.location.href = `${baseUrl}#/account/${resource.defaultAccountId}/onboarding`;
          break;
        default:
          window.location.href = `${baseUrl}ng/#/account/${resource.defaultAccountId}/${module}/home?source=signup`;
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

  const token = AppStorage.get("token");
  if (token && token.length > 0) {
    retHeaders.Authorization = `Bearer ${token}`;
  }

  return retHeaders;
}
