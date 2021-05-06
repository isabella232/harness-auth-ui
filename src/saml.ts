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
    window.location.href = "/auth/#/two-factor-login";
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

      const isNG = queryParams.get("isNG");

      if (isNG) {
        const module = queryParams.get("module");

        const base = `${baseUrl}ng/#/account/${accountId}`;

        const completeLink = module
          ? `${base}/${module}/home/trial`
          : `${base}/purpose`;

        window.location.href = completeLink;

        return;
      } else {
        const defaultExperience = queryParams.get("defaultExperience");
        switch (defaultExperience) {
          case "NG":
            window.location.href = `${baseUrl}ng/#/account/${accountId}/projects`;
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
