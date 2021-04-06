export default {
  toSignIn: () => `/signin`,
  toSSOSignIn: () => `/sso`,
  toForgotPassword: () => `/forgot-password`,
  toResetPassword: () => `/reset-password/:token`,
  toSignUp: () => `/signup`
};
