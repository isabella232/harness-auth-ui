import { secureStorage } from "utils/AppStorage";

function saml(): void {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);

  const baseUrl = window.location.pathname
    .replace("auth/", "")
    .replace("saml.html", "");

  if (queryParams.get("isTwoFactorEnabled") === "true") {
    secureStorage.setItem(
      "twoFactorJwtToken",
      queryParams.get("twoFactorJWTToken")
    );
    window.location.href = "/auth/#/two-factor-auth";
    return;
  } else {
    const accountId = queryParams.get("accountId");
    const userToken = queryParams.get("userToken");
    const userId = queryParams.get("userId");

    if (accountId && userToken && userId) {
      secureStorage.setItem("token", userToken);
      secureStorage.setItem("uuid", userId);
      secureStorage.setItem("acctId", accountId);
      secureStorage.setItem("lastTokenSetTime", +new Date());

      // user might be coming from oauth redirect
      const returnUrl = sessionStorage.getItem("returnUrl");
      if (returnUrl) {
        sessionStorage.removeItem("returnUrl");
        const returnUrlObject = new URL(returnUrl);
        // only redirect to same hostname
        if (returnUrlObject.hostname === window.location.hostname) {
          // only redirect if returnUrl is a deep link
          const matches = returnUrl.match(/\/account\/(.+?)\//);
          const accountId =
            matches && matches.length > 1 ? matches[1] : undefined;
          if (accountId) {
            window.location.href = returnUrl;
            return;
          }
        }
      }

      const isNG = queryParams.get("isNG");
      if (isNG) {
        const module = queryParams.get("module");

        if (module) {
          switch (module.toUpperCase()) {
            case "CE":
              window.location.href = `${baseUrl}#/account/${accountId}/continuous-efficiency/settings?source=signup`;
              return;
            case "CD":
              window.location.href = `${baseUrl}#/account/${accountId}/onboarding`;
              return;
            default:
              break;
          }
        }

        const base = `${baseUrl}ng/#/account/${accountId}`;

        window.location.href = module
          ? `${base}/${module}/home?source=signup`
          : `${base}/purpose?source=signup`;

        return;
      } else {
        const defaultExperience = queryParams.get("defaultExperience");
        switch (defaultExperience) {
          case "NG":
            window.location.href = `${baseUrl}ng/#/account/${accountId}`;
            return;
          case "CG":
          default:
            window.location.href = `${baseUrl}#/account/${accountId}/dashboard`;
            return;
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("Some required params are missing");
      window.location.href = "/auth/#/signin";
      return;
    }
  }
}

saml();
