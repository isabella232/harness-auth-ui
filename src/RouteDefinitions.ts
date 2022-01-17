/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

export default {
  toSignIn: () => `/signin`,
  toLocalLogin: () => `/local-login`,
  toSSOSignIn: () => `/sso`,
  toForgotPassword: () => `/forgot-password`,
  toResetPassword: () => `/reset-password/:token`,
  toTwoFactorAuth: () => `/two-factor-auth`,
  toSignUp: () => `/signup`,
  toAcceptInvite: () => `/accept-invite`,
  toEmailVerification: () => `/email-verification`,
  toCompleteInvite: () => `/register/verify/:token`
};
