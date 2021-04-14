import { secureStorage } from "utils/AppStorage";

function saml(): void {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);

  if (queryParams.get("isTwoFactorEnabled") === "true") {
    secureStorage.setItem(
      "twoFactorJwtToken",
      queryParams.get("twoFactorJWTToken")
    );
    window.location.href = "/auth/#/two-factor-login";
    return;
  } else {
    const accountId = queryParams.get("accountId");
    const token = queryParams.get("token");
    const userId = queryParams.get("userId");

    if (accountId && token && userId) {
      secureStorage.setItem("token", token);
      secureStorage.setItem("uuid", userId);
      secureStorage.setItem("acctId", accountId);
      secureStorage.setItem("lastTokenSetTime", +new Date());

      const defaultExperience = queryParams.get("defaultExperience");
      switch (defaultExperience) {
        case "NG":
          window.location.href = `/ng/#/account/${accountId}/projects`;
          return;
        case "CG":
        default:
          window.location.href = `/#/account/${accountId}/dashboard`;
          return;
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
