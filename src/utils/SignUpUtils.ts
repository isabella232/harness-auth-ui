import type { UserInfo } from "services/ng";
import AppStorage from "utils/AppStorage";

export function handleSignUpSuccess(resource?: UserInfo): void {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);
  const module = urlParams?.get("module");
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
