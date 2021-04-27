import type { UserInfo } from "services/ng";
import AppStorage from "utils/AppStorage";

export function handleSignUpSuccess(resource?: UserInfo): void {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);
  const module = urlParams?.get("module");

  if (resource) {
    AppStorage.set("token", resource.token);
    AppStorage.set("uuid", resource.uuid);
    AppStorage.set("acctId", resource.defaultAccountId);
    AppStorage.set("lastTokenSetTime", +new Date());

    if (module) {
      window.location.href = `/ng/#/account/${resource.defaultAccountId}/${module}/home/trial`;
    } else {
      window.location.href = `/ng/#/account/${resource.defaultAccountId}/purpose`;
    }
  }
}
