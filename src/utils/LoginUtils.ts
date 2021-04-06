import type { User } from "services/portal";
import AppStorage from "utils/AppStorage";

export function handleLoginSuccess(resource?: User): void {
  if (resource) {
    AppStorage.set("token", resource.token);
    AppStorage.set("acctId", resource.defaultAccountId);
    AppStorage.set("lastTokenSetTime", +new Date());

    const experience = resource.accounts?.find(
      (account) => account.uuid === resource.defaultAccountId
    )?.defaultExperience;
    switch (experience) {
      case "NG":
        window.location.href = `/ng/#/account/${resource.defaultAccountId}/projects`;
        return;
      case "CG":
      default:
        window.location.href = `/#/account/${resource.defaultAccountId}/dashboard`;
        return;
    }
  }
}
