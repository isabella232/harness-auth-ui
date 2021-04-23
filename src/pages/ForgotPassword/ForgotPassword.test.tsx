import React from "react";
import { render } from "@testing-library/react";

import ForgotPassword from "./ForgotPassword";
import { TestWrapper } from "utils/TestUtils";

describe("ForgotPassword", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/forgot-password"}>
        <ForgotPassword />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
