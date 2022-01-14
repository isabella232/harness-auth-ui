import { SignInQueryParams } from "pages/SignIn/SignIn";
import { useEffect, useState } from "react";
import { GetDataError } from "restful-react";
import { AuthenticationInfo, useGetAuthenticationInfo } from "services/gateway";
import { getAccountIdFromUrl } from "utils/LoginUtils";
import { useQueryParams } from "./useQueryParams";

interface UseVanityExperienceReturn {
  accountId?: string;
  isVanity: boolean;
  hideUsernamePasswordForm: boolean;
  hideOauth: boolean;
  hideSSO: boolean;
  authenticationInfo?: AuthenticationInfo;
  loading: boolean;
  error: GetDataError<unknown> | null;
}

export function useVanityExperience(): UseVanityExperienceReturn {
  const { returnUrl, action } = useQueryParams<SignInQueryParams>();
  const [accountId, setAccountId] = useState<string | undefined>();
  const [hideUsernamePasswordForm, setHideUsernamePasswordForm] = useState(
    false
  );
  const [hideOauth, setHideOauth] = useState(false);
  const [hideSSO, setHideSSO] = useState(false);

  const {
    data,
    loading,
    refetch: getAuthenticationInfo,
    error
  } = useGetAuthenticationInfo({ lazy: true }); // this gets called only for vanity URLs or if accountId is known

  const authenticationInfo = data?.resource;

  // if expectedHostname is defined, and not equal to current hostname, we are on vanity URL
  const isVanity = !!(
    window.expectedHostname &&
    window.expectedHostname !== "" &&
    window.location.hostname !== window.expectedHostname
  );

  useEffect(() => {
    // get from returnUrl if present
    const _accountId = getAccountIdFromUrl(returnUrl);
    setAccountId(_accountId);

    if (_accountId || isVanity) {
      // call gateway to find with auth mechanisms are enabled for this vanity url or accountId
      getAuthenticationInfo({ queryParams: { accountId: _accountId } });
    }
  }, [returnUrl]);

  useEffect(() => {
    if (authenticationInfo) {
      setAccountId(
        authenticationInfo?.accountId // get from authInfo for vanity url if present
      );
    }
  }, [authenticationInfo]);

  useEffect(() => {
    // redirect to SAML IDP if authMechanism is SAML (based on returnUrl or vanity url)
    if (
      (isVanity || accountId) &&
      action !== "signout" &&
      authenticationInfo &&
      authenticationInfo.authenticationMechanism === "SAML" &&
      authenticationInfo.samlRedirectUrl
    ) {
      window.location.href = authenticationInfo.samlRedirectUrl;
    }

    setHideUsernamePasswordForm(
      !!(
        (isVanity || accountId) &&
        authenticationInfo &&
        authenticationInfo.authenticationMechanism !== "USER_PASSWORD" &&
        authenticationInfo.authenticationMechanism !== "LDAP"
      )
    );

    setHideOauth(
      !!(
        (isVanity || accountId) &&
        authenticationInfo &&
        !authenticationInfo.oauthEnabled
      )
    );

    setHideSSO(
      !!(
        (isVanity || accountId) &&
        authenticationInfo &&
        authenticationInfo.authenticationMechanism !== "SAML"
      )
    );
  }, [accountId, authenticationInfo]);

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.debug({
      returnUrl,
      accountId,
      isVanity,
      hideUsernamePasswordForm,
      hideOauth,
      hideSSO
    });
  }

  return {
    accountId,
    isVanity,
    hideUsernamePasswordForm,
    hideOauth,
    hideSSO,
    authenticationInfo,
    loading,
    error
  };
}
