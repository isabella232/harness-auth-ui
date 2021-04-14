export default {
  toSignIn: () => `/signin`,
  toLocalLogin: () => `/local-login`,
  toSSOSignIn: () => `/sso`,
  toForgotPassword: () => `/forgot-password`,
  toResetPassword: () => `/reset-password/:token`,
  toTwoFactorAuth: () => `/two-factor-auth`,
  toSignUp: () => `/signup`
};
