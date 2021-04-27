import React from "react";
import { render } from "@testing-library/react";

import SignUp from "./Signup";
import { TestWrapper } from "utils/TestUtils";

describe("SignUp", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/signup"}>
        <SignUp />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
