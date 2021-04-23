import React from "react";
import { render } from "@testing-library/react";

import SSOSignIn from "./SSOSignIn";
import { TestWrapper } from "utils/TestUtils";

describe("SSOSignIn", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/sso-signin"}>
        <SSOSignIn />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
