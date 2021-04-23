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
