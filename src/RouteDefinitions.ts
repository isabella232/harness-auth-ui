export default {
  toSignIn: () => `/signin`,
  toLocalLogin: () => `/local-login`,
  toSSOSignIn: () => `/sso`,
  toForgotPassword: () => `/forgot-password`,
  toResetPassword: () => `/reset-password/:token`,
  toSignUp: () => `/signup`
};
