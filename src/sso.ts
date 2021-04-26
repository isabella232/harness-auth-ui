import { secureStorage } from "utils/AppStorage";

function sso() {
  const loginPageUrl = "/auth/#/login";
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);

  const accessToken = secureStorage.getItem("token");
  const accountId = secureStorage.getItem("acctId");

  if (accessToken && accountId) {
    const provider = queryParams.get("src");
    const returnUrl = queryParams.get("return_to");
    if (provider === "zendesk") {
      const apiUrl = `/gateway/api/users/sso/zendesk?routingId=${accountId}&returnTo=${returnUrl}`;
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      };

      fetch(apiUrl, fetchOptions)
        .then((response) => response.json())
        .then((response) => {
          window.location.href = response.resource.redirectUrl;
          return;
        })
        .catch(() => {
          window.location.href = loginPageUrl;
        });
    } else {
      window.location.href = loginPageUrl;
    }
  } else {
    window.location.href = loginPageUrl;
  }
}

sso();
