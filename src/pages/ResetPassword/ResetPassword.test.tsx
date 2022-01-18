/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from "react";
import {
  fireEvent,
  render,
  queryByAttribute,
  act
} from "@testing-library/react";

import ResetPassword from "./ResetPassword";
import { TestWrapper } from "utils/TestUtils";
import { useUpdatePassword } from "services/portal";

jest.mock("services/portal", () => ({
  useUpdatePassword: jest.fn().mockImplementation(() => ({
    mutate: jest.fn().mockImplementation(() => ({
      resource: true
    })),
    loading: false
  }))
}));

describe("ResetPassword", () => {
  test("render", () => {
    const { container } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );
    expect(container).toMatchSnapshot();
  });

  test("render with required error messages", async () => {
    const { container, getAllByText } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );
    const submit = queryByAttribute("type", container, "submit");
    await act(async () => {
      fireEvent.click(submit!);
    });
    expect(getAllByText("A password is required").length).toEqual(2);
  });

  test("render with length error messages", async () => {
    const { container, getAllByText } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );
    const password = queryByAttribute("id", container, "password");
    fireEvent.change(password!, { target: { value: "test" } });
    const confirmPassword = queryByAttribute(
      "id",
      container,
      "confirmPassword"
    );
    fireEvent.change(confirmPassword!, { target: { value: "test" } });
    const submit = queryByAttribute("type", container, "submit");
    await act(async () => {
      fireEvent.click(submit!);
    });
    expect(
      getAllByText("The password must be between 8 and 64 characters long")
        .length
    ).toEqual(2);
  });

  test("render with mismatch error message", async () => {
    const { container, getByText } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );
    const password = queryByAttribute("id", container, "password");
    fireEvent.change(password!, { target: { value: "test_password_match" } });
    const confirmPassword = queryByAttribute(
      "id",
      container,
      "confirmPassword"
    );
    fireEvent.change(confirmPassword!, { target: { value: "test_password" } });
    const submit = queryByAttribute("type", container, "submit");
    await act(async () => {
      fireEvent.click(submit!);
    });
    expect(
      getByText("Your password and confirmation password do not match")
    ).toBeTruthy();
  });

  test("enter correct values and submit", async () => {
    const { container } = render(
      <TestWrapper path={"/reset-password"}>
        <ResetPassword />
      </TestWrapper>
    );

    const password = queryByAttribute("id", container, "password");
    fireEvent.change(password!, { target: { value: "test_password" } });
    const confirmPassword = queryByAttribute(
      "id",
      container,
      "confirmPassword"
    );
    fireEvent.change(confirmPassword!, { target: { value: "test_password" } });
    const submit = queryByAttribute("type", container, "submit");
    await act(async () => {
      fireEvent.click(submit!);
    });
    await act(async () => {
      expect(useUpdatePassword).toHaveBeenCalled();
    });
  });
});
