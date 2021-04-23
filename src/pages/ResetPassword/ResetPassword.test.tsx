import React from "react";
import { render } from "@testing-library/react";

import ResetPassword from "./ResetPassword";
import { TestWrapper } from "utils/TestUtils";

describe("ResetPassword", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
