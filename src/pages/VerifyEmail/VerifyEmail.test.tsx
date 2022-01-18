/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import { render, act } from "@testing-library/react";

import { TestWrapper } from "utils/TestUtils";
import VerifyEmailStatus, { VERIFY_EMAIL_STATUS } from "./VerifyEmailStatus";
import { EMAIL_VERIFY_STATUS } from "utils/StringUtils";

describe("Verify Email", () => {
  test("should display an email sent message", async () => {
    await act(async () => {
      const { getByText } = render(
        <TestWrapper path={"/register/verify/token123"}>
          <VerifyEmailStatus status={VERIFY_EMAIL_STATUS.EMAIL_SENT} />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.EMAIL_SENT)).toBeDefined();
    });
  });

  test("should display an already signed up message", async () => {
    await act(async () => {
      const { getByText } = render(
        <TestWrapper path={"/register/verify/token123"}>
          <VerifyEmailStatus status={VERIFY_EMAIL_STATUS.SIGNED_UP} />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.ALREADY_SIGNED_UP)).toBeDefined();
    });
  });

  test("should display an email sent message when the component doesn't have a status", async () => {
    await act(async () => {
      const { getByText } = render(
        <TestWrapper path={"/register/verify/token123"}>
          <VerifyEmailStatus />
        </TestWrapper>
      );

      expect(getByText(EMAIL_VERIFY_STATUS.EMAIL_SENT)).toBeDefined();
    });
  });
});
