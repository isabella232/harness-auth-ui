import type { User } from "services/portal";
import AppStorage from "utils/AppStorage";
import RouteDefinitions from "RouteDefinitions";
import { History } from "history";

interface AuthHeader {
  authorization: string;
}

interface HandleLoginSuccess {
  resource?: User;
  history: History;
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

export function handleLoginSuccess({
  resource,
  history
}: HandleLoginSuccess): void {
  const queryString = window.location.hash?.split("?")?.[1];
  const urlParams = new URLSearchParams(queryString);
  const returnUrl = urlParams?.get("returnUrl");
  const baseUrl = window.location.pathname.replace("auth/", "");

  if (resource) {
    AppStorage.set("token", resource.token);
    AppStorage.set("uuid", resource.uuid);
    AppStorage.set("acctId", resource.defaultAccountId);
    AppStorage.set("lastTokenSetTime", +new Date());

    if (
      resource.twoFactorAuthenticationEnabled === true &&
      resource.twoFactorJwtToken
    ) {
      AppStorage.set("twoFactorJwtToken", resource.twoFactorJwtToken);
      // TODO: history.push instead of window.location
      window.location.href = returnUrl
        ? `${baseUrl}auth/#/two-factor-auth?returnUrl=${returnUrl}`
        : `${baseUrl}auth/#/two-factor-auth`;
      return;
    }

    if (returnUrl) {
      try {
        const returnUrlObject = new URL(returnUrl);
        // only redirect to same hostname
        if (returnUrlObject.hostname === window.location.hostname) {
          // Checking the authorized accounts id in the returnUrl. If any account id exist, then redirecting to returnURL, else clearing the AppStorage and redirecting to signin without returnURL.
          // TODO: If accountId is not valid, then need to redirect with default account to dashboard and show a proper message.
          const splitReturnUrl = returnUrl.split("/");
          if (
            resource.accounts?.find((account) =>
              splitReturnUrl.includes(account.uuid)
            )
          ) {
            window.location.href = returnUrl;
            return;
          }
          AppStorage.clear();
          history.push(RouteDefinitions.toSignIn());
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
        window.location.href = `${baseUrl}ng/#/account/${resource.defaultAccountId}`;
        return;
      case "CG":
      default:
        window.location.href = `${baseUrl}#/account/${resource.defaultAccountId}/dashboard`;
        return;
    }
  } else {
    // TODO: handle empty login response
  }
}
