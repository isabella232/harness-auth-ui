declare interface Window {
  captchaToken: string;
  invisibleCaptchaToken: string;
  segmentToken: string;
  grecaptcha: {
    execute: () => void;
  };
}
