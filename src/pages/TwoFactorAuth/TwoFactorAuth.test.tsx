/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Free Trial 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/05/PolyForm-Free-Trial-1.0.0.txt.
 */

import React from "react";
import { render } from "@testing-library/react";

import TwoFactorAuth from "./TwoFactorAuth";
import { TestWrapper } from "utils/TestUtils";

describe("TwoFactorAuth", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/two-factor-auth"}>
        <TwoFactorAuth />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
