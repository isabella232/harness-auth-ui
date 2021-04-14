import type { User } from "services/portal";
import AppStorage from "utils/AppStorage";

interface AuthHeader {
  authorization: string;
}

export function formatJWTHeader(authCode: string): AuthHeader {
  const token = window.btoa(
    `${AppStorage.get("twoFactorJwtToken")}:${authCode}`
  );
  const header = {
    authorization: `JWT ${token}`
  };
  return header;
}

export function handleLoginSuccess(resource?: User): void {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);
  const returnUrl = urlParams?.get("returnUrl");

  if (resource) {
    AppStorage.set("token", resource.token);
    AppStorage.set("uuid", resource.uuid);
    AppStorage.set("acctId", resource.defaultAccountId);
    AppStorage.set("lastTokenSetTime", +new Date());

    if (returnUrl) {
      try {
        const returnUrlObject = new URL(returnUrl);
        // only redirect to same hostname
        if (returnUrlObject.hostname === window.location.hostname) {
          window.location.href = returnUrl;
          return;
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            `"${returnUrl}" is a not a valid redirect due to hostname mismatch`
          );
        }
      } catch (err) {
        // returnUrl is not a valid url. do nothing.
        // eslint-disable-next-line no-console
        console.warn(`"${returnUrl}" is not a valid URL`);
      }
    }

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
  } else {
    // TODO: handle empty login response
  }
}
