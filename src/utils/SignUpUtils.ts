import type { UserInfo, GatewayAccountRequestDTO } from "services/ng";
import telemetry from "telemetry/Telemetry";
import SecureStorage from "./SecureStorage";

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
