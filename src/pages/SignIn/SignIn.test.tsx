import React from "react";
import { render } from "@testing-library/react";

import SignIn from "./SignIn";
import { TestWrapper } from "utils/TestUtils";

describe("SignIn", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/signin"}>
        <SignIn />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
