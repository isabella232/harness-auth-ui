import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { TestWrapper, queryByNameAttribute } from "utils/TestUtils";
import { Form } from "react-final-form";
import PasswordField from "../PasswordField";

describe("PasswordField", () => {
  const props = {
    name: "pwd",
    label: "Password:"
  };
  test("render", () => {
    const { container, getByRole } = render(
      <TestWrapper>
        <Form
          onSubmit={jest.fn()}
          render={() => {
            return <PasswordField {...props} />;
          }}
        />
      </TestWrapper>
    );
    const input = queryByNameAttribute("pwd", container);
    expect(input?.getAttribute("type")).toBe("password");
    const img = getByRole("img");
    fireEvent.click(img);
    expect(input?.getAttribute("type")).toBe("text");
  });
});
