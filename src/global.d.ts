/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
  bugsnagClient: any;
  bugsnagToken: string;
  captchaToken: string;
  invisibleCaptchaToken: string;
  segmentToken: string;
  bugSnagReleaseVersion: string;
  __DEV__: boolean;
}

declare const Bugsnag: any;
