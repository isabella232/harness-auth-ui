import React from "react";
import { render } from "@testing-library/react";

import LocalLogin from "./LocalLogin";
import { TestWrapper } from "utils/TestUtils";

describe("LocalLogin", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/local-login"}>
        <LocalLogin />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
