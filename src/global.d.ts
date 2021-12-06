/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
  bugsnagClient: any;
  bugsnagToken: string;
  captchaToken: string;
  invisibleCaptchaToken: string;
  segmentToken: string;
  signupExposed: string;
  deploymentType: DEPLOYMENT_TYPE;
}

declare enum DEPLOYMENT_TYPE {
  SAAS = "SAAS",
  ON_PREM = "ON_PREM",
  COMMUNITY = "COMMUNITY"
}

declare const Bugsnag: any;
declare const __DEV__: boolean;
declare const __BUGSNAG_RELEASE_VERSION__: string;
